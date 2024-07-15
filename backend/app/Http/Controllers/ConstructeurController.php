<?php
namespace App\Http\Controllers;

use App\Models\Constructeur;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConstructeurController extends Controller
{
    public function index()
    {
        $constructeurs = Constructeur::all();
        return Inertia::render('Constructeur/Constructeur', ['constructeurs' => $constructeurs]);
    }

    public function create()
    {
        return Inertia::render('Constructeur/ConstructeurCreate/ConstructeurCreate',);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom_constructeur' => 'required|string|max:255',
            'pays_origine' => 'required|string|max:255',
        ]);
    
        Constructeur::create($validated);
    
        return redirect()->route('constructeur.index')->with('success', 'Constructeur created successfully.');
    }

    public function show($id)
    {
        $constructeur = Constructeur::findOrFail($id);
        return Inertia::render('Constructeurs/ConstructeurShow/ConstructeurShow', ['constructeur' => $constructeur]);
    }

    public function edit($id)
    {
        $constructeur = Constructeur::findOrFail($id);
        return Inertia::render('Constructeurs/ConstructeurEdit/ConstructeurEdit', ['constructeur' => $constructeur]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validated(); //tableau contenant les champs validés
        $constructeur = Constructeur::findOrFail($id);
        $constructeur->update($validated);

        return redirect()->route('constructeurs.index')->with('success', 'Constructeur updated successfully.');
    }

    public function destroy($id)
    {
        $constructeur = Constructeur::findOrFail($id);
        $constructeur->delete();

        return redirect()->route('constructeurs.index')->with('success', 'Constructeur deleted successfully.');
    }
}