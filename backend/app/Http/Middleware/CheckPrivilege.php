<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CheckPrivilege
{
    public function handle($request, Closure $next, ...$privileges)
    {
        $user = Auth::user();

        if ($user && in_array($user->privileges_id, $privileges)) {
            return $next($request);
        }

        return redirect('/')->with('error', 'Access denied.');
    }
}