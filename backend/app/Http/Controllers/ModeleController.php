<?php

namespace App\Http\Controllers;

use App\Models\Modele;
use App\Models\Constructeur;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ModeleController extends Controller
{
    public function index()
    {
        $modeles = Modele::with('constructeur')->get(); 
        return Inertia::render('Modele/Modele', [
            'modeles' => $modeles,
        ]);
    }
    

    public function create()
    {
        
        $constructeurs = Constructeur::all(); 
        return Inertia::render('Modele/ModeleCreate/ModeleCreate', [
            'constructeurs' => $constructeurs
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nom_modele' => 'required|string',
            'constructeur_id' => 'required|integer',
        ]);

        $modele = Modele::create($validatedData);

        return redirect()->route('modeles.index')->with('success', 'Modèle créé avec succès.');
    }

    public function show($id)
    {
        $modele = Modele::findOrFail($id);
        return Inertia::render('Modele/ModeleShow/ModeleShow', ['modele' => $modele]);
    }

    public function edit($id)
    {
        $modele = Modele::findOrFail($id);
        return Inertia::render('Modele/ModeleEdit/ModeleEdit', ['modele' => $modele]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nom_modele' => 'required|string|max:255',
            'constructeur_id' => 'required|integer',
        ]);
    
        $modele = Modele::findOrFail($id);
        $modele->update($validated);
    
        return redirect()->route('modeles.index')->with('success', 'Modèle mis à jour avec succès.');
    }

    public function destroy($id)
    {
        $modele = Modele::findOrFail($id);
        $modele->delete();

        return response()->json(['message' => 'Modèle supprimé avec succès']);
    }
}