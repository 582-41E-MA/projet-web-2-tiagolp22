<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
        //
    }

    public function boot()
    {
        Inertia::share('auth', function () {
            return [
                'user' => Auth::user() ? [
                    'id' => Auth::user()->id_utilisateur,
                    'name' => Auth::user()->nom,
                    'email' => Auth::user()->courriel,
                    'privilege' => Auth::user()->privilege ? Auth::user()->privilege->id_privilege : null,
                ] : null,
                'csrf_token' => csrf_token(),
                // 'token' => Auth::user() ? Auth::user()->createToken('mytoken')->plainTextToken : null,
            ];
        });
    }
}
