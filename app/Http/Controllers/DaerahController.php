<?php

namespace App\Http\Controllers;

use App\Http\Resources\DaerahCollection;
use App\Models\Activity;
use App\Models\Daerah;
// use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use PhpOffice\PhpSpreadsheet\IOFactory;

use function App\Http\Middleware\isAdmin;

class DaerahController extends Controller
{
    //
    public function index(Request $request){
        $daerah = new Daerah(); 
        // $daerah = Daerah::find(1);
        // $create = Carbon::parse($daerah->created_at->toTimeString());
        $search = $request->search;
        if($request->has('search')){
            $daerah = $daerah->where('nama_daerah', "LIKE", '%' .$search.'%')
                    ->orWhere('kabupaten_kota', "LIKE", '%' .$search.'%')
                    ->orWhere('provinsi', "LIKE", '%' .$search.'%');
        }
        $daerah = $daerah->paginate(10);
        // dd($daerah);
        $user = Auth::user();
        if(isAdmin()){
            return Inertia::render('Daerah/Index', [
                'daerah' => $daerah,
                'user' => $user,
                // 'create' => $create
            ]);
        }else{
            return 'Access Restricted';
        }
    }

    public function store(Request $request){
        if(isAdmin()){
            $daerah = new Daerah();
            $daerah->nama_daerah = $request->namaDaerah;
            $daerah->kabupaten_kota = $request->kabupatenKota;
            $daerah->provinsi = $request->provinsi;
            $daerah->shape_length = $request->shapeLength;
            $daerah->shape_area = $request->shapeArea;
            $daerah->save();
            Activity::create([
                'id_user' => Auth::user()->id,
                'activity_name' => 'Tambah '.$request->namaDaerah.' ke dalam tabel daerah'
            ]);
            return redirect()->back()->with('massage', 'Data Berhasi Ditambahkan !!!');
        }else{
            return 'Access Restricted';
        }
    }

    public function importFile(Request $request){
        if(isAdmin()){
            if($request->has('file')){
                $file = $request->file('file');
                $spreadsheet = IOFactory::load($file);
                $worksheet = $spreadsheet->getActiveSheet();
                foreach($worksheet->getRowIterator() as $row){
                    $rowData = [];
                    foreach($row->getCellIterator() as $cell){
                        $rowData[] = $cell->getValue();
                    }
                    // dd($row);
                    if($row->getRowIndex() != 1){
                        Daerah::create([
                            'nama_daerah' => $rowData[1],
                            'kabupaten_kota' => $rowData[2],
                            'provinsi' => $rowData[3],
                            'shape_length' => $rowData[4],
                            'shape_area' => $rowData[5]
                        ]);
                    }
                }
                Activity::create([
                    'id_user' => Auth::user()->id,
                    'activity_name' => 'Import data daerah dengan File'
                ]);
                return redirect('/daerah')->with(['success'=>'data berhasil diinput']);
            }
        }else{
            return 'Access Restricted';
        }
    }

    public function update($id, Request $request){
        dd($request);
        if(isAdmin()){
            $daerah = Daerah::find($id);
            $daerah->update($request->except(['_token', 'submit']));
            Activity::create([
                'id_user' => Auth::user()->id,
                'activity_name' => 'Update data daerah '.$daerah->nama_daerah
            ]);
            return redirect('/daerah');
        }else{
            return 'Access Restricted';
        }
    }

    public function destroy($id){
        if(isAdmin()){
            $daerah = Daerah::find($id);
            $daerah->delete();
            Activity::create([
                'id_user' => Auth::user()->id,
                'activity_name' => 'Hapus data '.$daerah->nama_daerah.' dari tabel'
            ]);
            return redirect('/daerah');
        }else{
            return 'Access Restricted';
        }
    }

    public function destroyAll(){
        if (isAdmin()) {
            foreach(Daerah::all() as $e){
                $e->delete();
            }
            Activity::create([
                'id_user' => Auth::user()->id,
                'activity_name' => 'Hapus semua data daerah'
            ]);
            return redirect('/daerah');
        }else{
            return 'Access Restricted';
        }
    }
}
