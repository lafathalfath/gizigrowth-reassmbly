<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

use function App\Http\Middleware\isAdmin;

class GibotController extends Controller
{
    public function index(){
        return Inertia::render('Gibot/Index', [
            'user' => Auth::user(),
        ]);
    }
    public function chat(){
        if(Auth::user()){
            return Inertia::render('Gibot/Chat',[
                'user' => Auth::user(),
            ]);
        }else{
            return redirect('/login');
        }
    }
    public function search(Request $request){
        $query = $request->input('query');
        // dd($query);
        if($query){
            $apiKey = env('GOOGLE_API_KEY');
            $cx = env('GOOGLE_CX');

            $response = Http::get('https://www.googleapis.com/customsearch/v1?'.[
                'key' => $apiKey,
                'cx' => $cx,
                'q' => $query
            ]);

            // $response = Http::get('https://www.googleapis.com/customsearch/v1?key='.$apiKey
            //     .'&cx='.$cx
            //     .'&q='.$query
            // );

            return $response->json();
        }
        return response()->json(['items' => []]);
    }
}
