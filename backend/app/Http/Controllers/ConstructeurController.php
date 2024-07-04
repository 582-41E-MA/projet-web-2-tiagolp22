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
        return Inertia::render('Constructeurs/ConstructeursIndex', ['constructeurs' => $constructeurs]);
    }

    public function create()
    {
        return Inertia::render('Constructeurs/ConstructeursCreate/ConstructeursCreate');
    }

    public function store(Request $request)
    {
        
        $validated = $request->validated();
        Constructeur::create($validated);

        return redirect()->route('constructeurs.index')->with('success', 'Constructeur created successfully.');
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