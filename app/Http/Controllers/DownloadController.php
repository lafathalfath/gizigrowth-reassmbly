<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\DataStunting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\IOFactory;
// use PhpOffice\PhpSpreadsheet\Writer\Pdf;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Pdf\Dompdf;
use PhpOffice\PhpSpreadsheet\Writer\Pdf\Mpdf;
use \Mpdf\Mpdf as PDF;

class DownloadController extends Controller
{
    public function stunting(Request $request){
        $user = Auth::user();
        // dd($request->name);
        if($user){
            $stunting = DB::table('data_kasus_stunting')
                ->join('daerah', 'data_kasus_stunting.id_daerah', '=', 'daerah.id')
                ->select('data_kasus_stunting.*', 'daerah.nama_daerah as nama_daerah');
                
            if($request->name!=null && $request->tahun!=null){
                $stunting = $stunting->where('nama_daerah', $request->name)
                ->where('tahun', $request->tahun);
            }elseif($request->name==null){
                $stunting = $stunting->where('tahun', $request->tahun);
            }elseif($request->tahun==null){
               $stunting = $stunting->where('nama_daerah', $request->name);
            }
            $stunting = $stunting->get();
            
            $html = ' <h1 style="text-align: center; margin-bottom: 50px;">Data Kasus Stunting Kota Bogor</h1>
            <div>Collected by: GiziGrowth</div>
            <table style="border-collapse: collapse;width: 100%;" border="1">
                <thead>
                    <tr style="background-color: #94c73f;">
                        <th>No</th>
                        <th>Nama Daerah</th>
                        <th>Tahun</th>
                        <th>Jumlah Kasus</th>
                    </tr>
                </thead>
            ';
            $nomorTable = 1;
            foreach($stunting as $row){
                $html .= '<tbody>
                    <tr>
                        <td>'.$nomorTable++.'</td>
                        <td>'.$row->nama_daerah.'</td>
                        <td>'.$row->tahun.'</td>
                        <td>'.$row->jumlah_kasus_stunting.'</td>
                    </tr>
                </tbody>';
            }
            $html .= '</table>';
    
            $mpdf = new \Mpdf\Mpdf();
            $mpdf->WriteHTML($html);
    
            $path = 'uploads/'.$user->id.'/downloaded';
            // dd($path);
            if($request->name!=null && $request->tahun!=null){
                $filename = 'data_kasus_stunting '.$request->name.' '.$request->tahun.'.pdf';
            }elseif($request->name==null){
                $filename = 'data_kasus_stunting '.$request->tahun.'.pdf';
            }elseif($request->tahun==null){
                $filename = 'data_kasus_stunting '.$request->name.'.pdf';
            }
            if (!file_exists($path)) {
                mkdir($path, 0777, true);
            }
            $filePath = $path.'/'.$filename;
            $mpdf->Output($filePath, 'F');
            
            
            // dd($filePath);
            return response()->download($filePath)->deleteFileAfterSend();
            // return response()->download($filePath);
        }else{
            return redirect('/login');
        }
    }
    
}
