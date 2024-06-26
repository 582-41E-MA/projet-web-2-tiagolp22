<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUtilisateurRequest;
use App\Http\Requests\UpdateUtilisateurRequest;
use App\Models\Utilisateur;
use Illuminate\Support\Facades\Hash;

class UtilisateurController extends Controller
{
    public function index()
    {
        return inertia('Utilisateurs/Index', [
            'utilisateurs' => Utilisateur::all()
        ]);
    }

    public function create()
    {
        return inertia('Utilisateurs/Create');
    }

    public function store(CreateUtilisateurRequest $request)
    {
        $validated = $request->validated();
    
        $utilisateur = new Utilisateur($validated);
        $utilisateur->mot_de_passe = Hash::make($validated['mot_de_passe']);
        $utilisateur->save();
    
        return redirect()->route('utilisateurs.index')->with('success', 'Utilisateur créé avec succès.');
    }

    public function show($id)
    {
        $utilisateur = Utilisateur::findOrFail($id);
        return inertia('Utilisateurs/Show', [
            'utilisateur' => $utilisateur
        ]);
    }

    public function edit($id)
    {
        $utilisateur = Utilisateur::findOrFail($id);
        return inertia('Utilisateurs/Edit', [
            'utilisateur' => $utilisateur
        ]);
    }

    public function update(UpdateUtilisateurRequest $request, $id)
    {
        $validated = $request->validated();

        $utilisateur = Utilisateur::findOrFail($id);
        $utilisateur->fill($validated);
        if ($request->filled('mot_de_passe')) {
            $utilisateur->mot_de_passe = Hash::make($validated['mot_de_passe']);
        }
        $utilisateur->save();

        return redirect()->route('utilisateurs.index')->with('success', 'Utilisateur mis à jour avec succès.');
    }

    public function destroy($id)
    {
        $utilisateur = Utilisateur::findOrFail($id);
        $utilisateur->delete();

        return redirect()->route('utilisateurs.index')->with('success', 'Utilisateur supprimé avec succès.');
    }
}
