<?php

namespace App\Http\Controllers;

use App\Models\Voiture;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VoitureController extends Controller
{
    public function index()
    {
        $voitures = Voiture::with('modele')->get();

        return Inertia::render('Voiture/Voiture', [
            'voitures' => $voitures,
        ]);
    }

    public function create()
    {
        return Inertia::render('Voiture/VoitureCreate/VoitureCreate');
    }

    public function store(Request $request)
    {
        $validated = $request->validated();

        $voiture = Voiture::create($validated);
        return redirect()->route('voitures.index')->with('success', 'Voiture created successfully.');
    }

    public function show($id)
    {
        $voiture = Voiture::findOrFail($id);
        return Inertia::render('Voiture/VoitureShow/VoitureShow', ['voiture' => $voiture]);
    }

    public function edit($id)
    {
        $voiture = Voiture::findOrFail($id);
        return Inertia::render('Voiture/VoitureEdit/VoitureEdit', ['voiture' => $voiture]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validated();

        $voiture = Voiture::findOrFail($id);
        $voiture->update($validated);
        return redirect()->route('voitures.index');
    }

    public function destroy($id)
    {
        $voiture = Voiture::findOrFail($id);
        $voiture->delete();
        return redirect()->route('voitures.index');
    }
}
