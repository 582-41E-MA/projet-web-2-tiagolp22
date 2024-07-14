<?php

namespace App\Http\Controllers;

use App\Models\Ville;
use App\Models\Province;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VilleController extends Controller
{
    public function index()
    {
        $villes = Ville::with('province')->get(); 
        return Inertia::render('Ville/VilleIndex', [
            'villes' => $villes,
        ]);
    }

    public function create()
    {
        $provinces = Province::all(); 
        return Inertia::render('Ville/VilleCreate/VilleCreate', [
            'provinces' => $provinces
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nom_ville' => 'required|string',
            'province_id' => 'required|integer',
        ]);

        $ville = Ville::create($validatedData);

        return redirect()->route('villes.index')->with('success', 'Ville créée avec succès.');
    }

    public function edit($id)
    {
        $ville = Ville::findOrFail($id);
        $provinces = Province::all(); 
        return Inertia::render('Ville/VilleEdit/VilleEdit', [
            'ville' => $ville,
            'provinces' => $provinces,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nom_ville' => 'required|string|max:255',
            'province_id' => 'required|integer',
        ]);
    
        $ville = Ville::findOrFail($id);
        $ville->update($validated);
    
        return redirect()->route('villes.index')->with('success', 'Ville mise à jour avec succès.');
    }

    public function destroy($id)
    {
        $ville = Ville::findOrFail($id);
        $ville->delete();

        return redirect()->route('villes.index')->with('success', 'Ville supprimée avec succès.');
    }
}
