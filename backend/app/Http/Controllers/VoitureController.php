<?php

namespace App\Http\Controllers;

use App\Models\Voiture;
use App\Models\TypeCarburant;
use App\Models\Modele;
use App\Models\Transmission;
use App\Models\GroupeMotopropulseur;
use App\Models\Carrosserie;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\VoitureRequest;

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
        // Buscar dados relacionados para os selects
        $typesCarburant = TypeCarburant::all();
       $modeles = Modele::all();
        $transmissions = Transmission::all();
        $groupesMotopropulseur = GroupeMotopropulseur::all();
        $carrosseries = Carrosserie::all();

        return Inertia::render('Voiture/VoitureCreate/VoitureCreate', [
            'typesCarburant' => $typesCarburant,
            'modeles' => $modeles,
            'transmissions' => $transmissions,
            'groupesMotopropulseur' => $groupesMotopropulseur,
            'carrosseries' => $carrosseries,
        ]);
    }

    public function store(VoitureRequest $request)
    {
        $validated = $request->validated();

        $voiture = Voiture::create($validated);
        return Inertia::location(route('voitures.index'));
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