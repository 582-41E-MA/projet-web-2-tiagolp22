<?php

namespace App\Http\Controllers;

use App\Models\Utilisateur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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
    
        $utilisateur = Utilisateur::create($validated);
    
        return Inertia::location(route('Accueil'));
      
    }
    
    
   
    public function userLogin(Request $request)
    {

        $request->validate([
            'courriel' => 'required|email',
            'mot_de_passe' => 'required',
        ]);

        // Verifica se o usuário existe
        $loginUser = Utilisateur::where('courriel', $request->courriel)->first();

        if (!$loginUser) {
            return Inertia::location(route('login.index'));
        }
           if (Hash::check($request->mot_de_passe, $loginUser->mot_de_passe)) {
            $token = $loginUser->createToken('mytoken')->plainTextToken;

            return Inertia::location(route('Accueil'));
        } else {
            return Inertia::location(route('login.index'));
        }
    }

}