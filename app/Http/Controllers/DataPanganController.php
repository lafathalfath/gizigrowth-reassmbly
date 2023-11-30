<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\DataPangan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

use function App\Http\Middleware\isAdmin;

class DataPanganController extends Controller
{
    public function index(Request $request){
        $user = Auth::user();
        $table = DB::table('data_ketahanan_Pangan')
            ->join('lokasi', 'data_ketahanan_pangan.id_lokasi', '=', 'lokasi.id')
            ->select('data_ketahanan_pangn.*', 'lokasi.nama_lokasi as nama_lokasi');
        $search = $request->search;
        if($request->has('search') && $search != null && $search != ''){
            $table->where('nama_lokasi', 'LIKE', '%'.$search.'%')->orWhere('tahun', 'LIKE', '%'.$search.'%');
        }
        $table = $table->paginate(20);
        if(isAdmin()){
            return Inertia::render('Pangan/Index', [
                'user' => $user,
                'data_ketahanan_pangan' => $table,
            ]);
        }else{
            return 'Access restricted';
        }
    }
}
