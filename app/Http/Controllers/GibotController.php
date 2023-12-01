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
    public function search(){
        $gptApiKey = env('CHATGPT_API_KEY');
        $response = Http::post('https://api.openai.com/v1/chat/completions',[
            'messages' => [['role' => 'system', 'content' => 'You are a helpful assistant.']],
            'max_tokens' => 150,
            'temperature' => 0.7,
        ], [
            'Authorization' => 'Bearer ' . $gptApiKey,
        ]);
        $result = $response->json();

        return response()->json(['response' => $result['choices'][0]['message']['content']]);
    }

}
