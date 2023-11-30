<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\Daerah;
use App\Models\DataStunting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Mockery\Undefined;
use PhpOffice\PhpSpreadsheet\IOFactory;

use function App\Http\Middleware\isAdmin;
use function Laravel\Prompts\error;
use function Termwind\render;

class DataStuntingController extends Controller
{
    public function index(Request $request){
        $user = Auth::user();
        $table = DB::table('data_kasus_stunting')
            ->join('daerah', 'data_kasus_stunting.id_daerah', '=', 'daerah.id')
            ->select('data_kasus_stunting.*', 'daerah.nama_daerah as nama_daerah');
        $search = $request->search;
        if($request->has('search') && $search != null && $search != ''){
            $table->where('tahun', 'LIKE', '%'.$search.'%')->orWhere('nama_daerah', 'LIKE', '%'.$search.'%');
        }
        $table = $table->paginate(20);
        if(isAdmin()){
            return Inertia::render('Stunting/Index', [
                'user' => $user,
                'data_kasus_stunting' => $table,
            ]);
        }else{
            return 'Access Restricted';
        }
    }

    public function store(Request $request){
        if(isAdmin()){
            $table = new DataStunting();
            $namaDaerah = $request->nama_daerah;
            $idDaerah = Daerah::where('nama_daerah', $namaDaerah)->value('id');
            $table->id_daerah = $idDaerah;
            $table->tahun = $request->tahun;
            $table->jumlah_kasus_stunting = $request->jumlah_kasus_stunting;
            $table->jumlah_anak = $request->jumlah_anak;
            $table->save();
            Activity::create([
                'id_user' => Auth::user()->id,
                'activity_name' => 'Tambah '.$request->namaDaerah.' ke dalam kasus stunting',
            ]);
            return redirect('/kasus_stunting');
        }else{
            return 'Access Restricted';
        }
    }

    public function storeFile(Request $request){
        if(isAdmin()){
            if($request->has('file')){
                $file = $request->file('file');
                $spreadsheet = IOFactory::load($file);
                $workspace = $spreadsheet->getActiveSheet();
                foreach($workspace->getRowIterator() as $row){
                    $rowData = [];
                    foreach($row->getCellIterator() as $cell){
                        $rowData[] = $cell->getValue();
                    }
                    $idDaerah = Daerah::where('nama_daerah', $rowData[1])->value('id');
                    // dd($rowData);
                    if($row->getRowIndex() != 1){
                        if($idDaerah !== null && $rowData[2] !== null && $rowData[3] !== null){
                            DataStunting::create([
                                'id_daerah' => $idDaerah,
                                'tahun' => $rowData[2],
                                'jumlah_kasus_stunting' => $rowData[3],
                                'jumlah_anak' => $rowData[4]
                            ]);
                        }
                    }
                }
                Activity::create([
                    'id_user' => Auth::user()->id,
                    'activity_name' => 'Import data kasus stunting dengan File'
                ]);
                return redirect('/kasus_stunting')->with(['message' => 'data berhasil diinput']);
            }
        }else{
            return 'Access Restricted';
        }
    }

    public function update($id, Request $request){
        if(isAdmin()){
            $table = DataStunting::find($id);
            $namaDaerah = $request->nama_daerah;
            $idDaerah = Daerah::where('nama_daerah', $namaDaerah)->value('id');
            // dd($table);
            $table->update([
                'id_daerah' => $idDaerah,
                'tahun' => $request->tahun,
                'jumlah_kasus_stunting' => $request->jumlah_kasus_stunting
            ]);
            Activity::create([
                'id_user' => Auth::user()->id,
                'activity_name' => 'Update kasus stunting daerah '.$namaDaerah
            ]);
            return redirect('/kasus_stunting');
        }else{
            return 'Access Restricted';
        }
    }

    public function destroy(Request $request){
        if(isAdmin()){
            $reqId = $request->id;
            $table = DB::table('data_kasus_stunting')->where('id', $reqId);
            $namaDaerah = DB::table('data_kasus_stunting')
                ->join('daerah', 'data_kasus_stunting.id_daerah', '=', 'daerah.id')
                ->where('data_kasus_stunting.id', $reqId)
                ->value('daerah.nama_daerah');
            $table->delete();
            Activity::create([
                'id_user' => Auth::user()->id,
                'activity_name' => 'Hapus data '.$namaDaerah.' dari tabel kasus stunting'
            ]);
            return redirect('/kasus_stunting');
        }else{
            return 'Access Restricted';
        }
    }

    public function destroyAll(){
        if (isAdmin()) {
            foreach(DataStunting::all() as $e){
                $e->delete();
            }
            Activity::create([
                'id_user' => Auth::user()->id,
                'activity_name' => 'Hapus semua data kasus stunting'
            ]);
            return redirect('/kasus_stunting');
        }else{
            return 'Access Restricted';
        }
    }
}
