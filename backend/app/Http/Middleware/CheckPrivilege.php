<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class CheckPrivilege
{
    public function handle(Request $request, Closure $next, ...$privileges): Response
    {
        if (!Auth::check()) {
            return redirect()->route('login.index');
        }

        $utilisateurPrivilege = Auth::user()->privilege->id_privilege;

        if (in_array($utilisateurPrivilege, $privileges)) {
            return $next($request);
        }

        return redirect()->route('Accueil')->with('error', 'Vous n\'avez pas les privilèges nécessaires pour accéder à cette page.');
    }
}
