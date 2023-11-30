<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\DataStunting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class GpointController extends Controller
{
    public function index(Request $request){
        $defaultYear = 2023;
        $stunting = DB::table('data_kasus_stunting')
            ->join('daerah', 'data_kasus_stunting.id_daerah', '=', 'daerah.id')
            ->select('data_kasus_stunting.*', 'daerah.nama_daerah as nama_daerah');
        if($request->has('year')){
            $stunting->where('tahun', $request->year);
        }else{
            $stunting->where('tahun', $defaultYear);
        }
        $stunting = $stunting->get();
        $tahun = DB::table('data_kasus_stunting')->select('tahun')->distinct()->pluck('tahun');
        // dd($tahun);
        return Inertia::render('Gpoint/Index', [
            'user' => Auth::user(),
            'data_kasus_stunting' => $stunting,
            'tahun' => $tahun,
        ]);
    }
}
