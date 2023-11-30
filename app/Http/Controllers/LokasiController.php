<?php

namespace App\Http\Controllers;

use App\Models\Daerah;
use App\Models\lokasi;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use function App\Http\Middleware\isAdmin;

// use Illuminate\Support\Facades\DB;

class LokasiController extends Controller
{

    public function index(Request $request){
        $lokasi = new lokasi();
        $search = $request->search;
        if($request->has('search')){
            $lokasi = $lokasi->where('nama_lokasi', 'LIKE', '%'.$search.'%')
                ->orWhere('kabupaten_kota', 'LIKE', '%'.$search.'%')
                ->orWhere('provinsi', 'LIKE', '%'.$search.'%');
        }
        $lokasi = $lokasi->paginate(10);
        $user = Auth::user();
        if(isAdmin()){
            return Inertia::render('Lokasi/Index', [
                'lokasi' => $lokasi, 
                'user' => $user,
            ]);
        }else{
            return 'Access Restricted';
        }
    }
    
    public function store(Request $request){
        if(isAdmin()){
            $lokasi = new lokasi();
            $lokasi->nama_lokasi = $request->namaLokasi;
            $lokasi->kabupaten_kota = $request->kabupatenKota;
            $lokasi->provinsi = $request->provinsi;
            $lokasi->koordinat_x = $request->koordinatX;
            $lokasi->koordinat_y = $request->koordinatY;
            $lokasi->save();
            return redirect()->back()->with('message', 'Data berhasil ditambahkan');
        }else{
            return 'Access Restricted';
        }
    }

    public function importFile(Request $request){
        if(isAdmin()){
            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $extension = $file->getClientOriginalExtension();

                if($extension === 'csv'){
                    $handle = fopen($file, 'r');
                    fgetcsv($handle);
                    while(($row = fgetcsv($handle)) !== false){
                        if($row !== null){
                            lokasi::create([
                                'nama_lokasi'=>$row[1],
                                'kabupaten_kota'=>$row[2],
                                'provinsi'=>$row[3],
                                'koordinat_x'=>$row[4],
                                'koordinat_y'=>$row[5],
                            ]);
                        }
                    }

                    fclose($handle);
                    return redirect('/lokasi')->with('success', 'Data berhasil diimport');
                }else{
                    return redirect('/lokasi')->with('error', 'File format invalid');
                }
            }else{
                return redirect('/lokasi')->with('error', 'File cannot found');
            }
        }else{
            return 'Access Restricted';
        }
    }

    public function update($id, Request $request){
        if(isAdmin()){
            $lokasi = lokasi::find($id);
            if(!$lokasi){
                return 'data not found';
            }else{
                $lokasi->update($request->except(['_token', 'submit']));
                return redirect('/lokasi');
            }
        }else{
            return 'Access Restricted';
        }
    }

    public function destroy($id){
        if(isAdmin()){
            $lokasi = lokasi::find($id);
            $lokasi->delete();
            return redirect('/lokasi');
        }else{
            return 'Access Restricted';
        }
    }

    public function destroyAll(){
        if (isAdmin()) {
            foreach(lokasi::all() as $e){
                $e->delete();
            }
            return redirect('/lokasi');
        }else{
            return 'Access Restricted';
        }
    }
}
