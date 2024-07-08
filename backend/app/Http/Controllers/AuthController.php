<?php

namespace App\Http\Controllers;

use App\Models\Utilisateur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Requests\CreateUtilisateurRequest;

class AuthController extends Controller
{
    public function index()
    {
        return Inertia::render('Login');
    }

    public function showRegistrationForm()
    {
        return inertia('Register');
    }

    public function register(CreateUtilisateurRequest $request)
    {
        $validated = $request->validated();

        $validated['mot_de_passe'] = Hash::make($validated['mot_de_passe']);
        $validated['privileges_id'] = 2;

        $utilisateur = Utilisateur::create($validated);

        Auth::login($utilisateur);

        return Inertia::location(route('Accueil'));
    }

    public function userLogin(Request $request)
    {
        $request->validate([
            'courriel' => 'required|email',
            'mot_de_passe' => 'required',
        ]);

        $loginUtilisateur = Utilisateur::where('courriel', $request->courriel)->first();

        if (!$loginUtilisateur) {
            return Inertia::location(route('login.index'));
        }

        if (Hash::check($request->mot_de_passe, $loginUtilisateur->mot_de_passe)) {
            $token = $loginUtilisateur->createToken('mytoken')->plainTextToken;

            Auth::login($loginUtilisateur);


            return response()->json([
                'props' => [
                    'token' => $token,
                ],
                'location' => route('Accueil')
            ]);

        } else {
            return Inertia::location(route('login.index'));
        }
    }

    public function logout(Request $request)
    {
        $user = Auth::user();

        if ($user) {
            $user->tokens()->delete();
        }

        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Inertia::location(route('Accueil'));
    }
}
