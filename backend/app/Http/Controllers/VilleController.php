<?php

namespace App\Http\Controllers;

use App\Models\Ville;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VilleController extends Controller
{
    public function index()
    {
        $villes = Ville::all();

        return Inertia::render('Ville/Ville', [
            'villes' => $villes,
        ]);
    }

    public function create()
    {
        return Inertia::render('Ville/VilleCreate/VilleCreate');
    }

    public function store(Request $request)
    {
        $validated = $request->validated();

        $ville = Ville::create($validated);
        return redirect()->route('villes.index')->with('success', 'Ville created successfully.');
    }

    public function show($id)
    {
        $ville = Ville::findOrFail($id);
        return Inertia::render('Ville/VilleShow/VilleShow', ['ville' => $ville]);
    }

    public function edit($id)
    {
        $ville = Ville::findOrFail($id);
        return Inertia::render('Ville/VilleEdit/VilleEdit', ['ville' => $ville]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validated();

        $ville = Ville::findOrFail($id);
        $ville->update($validated);
        return redirect()->route('villes.index');
    }

    public function destroy($id)
    {
        $ville = Ville::findOrFail($id);
        $ville->delete();
        return redirect()->route('villes.index');
    }
}
