<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;


class CheckPrivilege
{
    public function handle($request, Closure $next, ...$privileges)
    {
        $user = Auth::user();

        if ($user) {
            Log::info('User ID: ' . $user->id . ' Privilege ID: ' . $user->privileges_id);
            if (in_array($user->privileges_id, $privileges)) {
                return $next($request);
            }
        } else {
            Log::info('No authenticated user found.');
        }

        return redirect()->route('Accueil');
    }
}
