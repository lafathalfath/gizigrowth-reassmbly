<?php

namespace App\Providers;

use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator as PaginationPaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
        // Paginator::useBootstrap();
        PaginationPaginator::useBootstrapFive();
        // Inertia::share('user', function () {
        //     return Auth::user() ? [
        //         'name' => Auth::user()->name,
        //         'email' => Auth::user()->email,
        //     ] : null;
        // });
    }
}
