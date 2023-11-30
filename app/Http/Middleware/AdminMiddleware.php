<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        function isAdmin(){
            $role = Auth::user()->role;
            if ($role === 'admin'){
                return true;
            }else{
                return false;
            }
        }
        
        if(Auth::check() && isAdmin()){
            if(isAdmin()){
                redirect('/admin/dashboard');
            }else{
                redirect('/dashboard');
            }
        }

        return $next($request);
    }
}
