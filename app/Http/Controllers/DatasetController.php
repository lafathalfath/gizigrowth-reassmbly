<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Daerah;
use App\Models\DataStunting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DatasetController extends Controller
{
    public function index(Request $request){
        $user = Auth::user();
        $stunting = DB::table('data_kasus_stunting')
            ->join('daerah', 'data_kasus_stunting.id_daerah', '=', 'daerah.id')
            ->select('data_kasus_stunting.*', 'daerah.nama_daerah as nama_daerah');

        // $daerah = new Daerah();
        $list_daerah = Daerah::all();
        $list_tahun = DataStunting::distinct()->pluck('tahun');
        if ($request->has('daerah') || $request->has('tahun')) {
            $stunting = $stunting->where('tahun', 'LIKE', '%'.$request->tahun.'%')->where('nama_daerah', 'LIKE', '%'.$request->daerah.'%');
        }
        if($request->has('search')){
            $stunting = $stunting->where('tahun', 'LIKE', '%'.$request->search.'%')->orWhere('nama_daerah', 'LIKE', '%'.$request->search.'%');
        }
        
        return Inertia::render('Dataset/Index', [
            'user' => $user,
            'data_kasus_stunting' => $stunting->get(),
            'list_daerah' => $list_daerah,
            'list_tahun' => $list_tahun,
            'total' => count($stunting->get()),
            'jml_daerah' => $stunting->select('nama_daerah')->distinct()->get(),
            'jml_tahun' => $stunting->select('tahun')->distinct()->get(),
        ]);
    }

    public function tahun($tahun){
        $stunting = DB::table('data_kasus_stunting')
            ->join('daerah', 'data_kasus_stunting.id_daerah', '=', 'daerah.id')
            ->select('data_kasus_stunting.*', 'daerah.nama_daerah as nama_daerah')
            ->where('tahun', $tahun)->orWhere('nama_daerah', $tahun);
        $stunting = $stunting->get();
        // dd(gettype($tahun));
        return Inertia::render('Dataset/Download', [
            'data_kasus_stunting' => $stunting,
            'kunci' => $tahun,
            'user' => Auth::user()
        ]);
    }
}
