<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ActivityController extends Controller
{
    public function index(){
        $user = Auth::user();
        $table = new Activity();
        $table = $table->where('id_user', $user->id)->get();
        // dd($table);
        return Inertia::render('Activity', [
            'user' => $user,
            'activity' => $table,
        ]);
    }
}
