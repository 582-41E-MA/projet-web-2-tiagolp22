<?php

namespace App\Http\Controllers;

use App\Models\Voiture;
use App\Models\TypeCarburant;
use App\Models\Modele;
use App\Models\Transmission;
use App\Models\GroupeMotopropulseur;
use App\Models\Carrosserie;
use App\Models\Constructeur;

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
    public function filter(Request $request)
    {
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

    public function filter(Request $request)
    {
        $query = Voiture::query();    
        $colors = ['White', 'Black', 'Red', 'Blue', 'Green', 'Yellow', 'Silver', 'Grey'];
        $modeles = Modele::pluck('nom_modele')->toArray();
    
        $constructeurs = Constructeur::pluck('nom_constructeur')->toArray();
    
        if ($request->filled('etat')) {
            $query->where('etat_vehicule', $request->input('etat'));
        }
    
        if ($request->filled('constructeur')) {
            $query->whereHas('modele.constructeur', function ($q) use ($request) {
                $q->where('nom_constructeur', $request->input('constructeur'));
            });
        }
    
        if ($request->filled('modele')) {
            $query->whereHas('modele', function ($q) use ($request) {
                $q->where('nom_modele', $request->input('modele'));
            });
        }
    
        if ($request->filled('annee')) {
            $query->where('annee', $request->input('annee'));
        }
    
        if ($request->filled('prix_max')) {
            $query->where('prix_vente', '<=', $request->input('prix_max'));
        }
    
        if ($request->filled('couleur')) {
            $query->whereJsonContains('couleur', $request->input('couleur'));
        }
    
        if ($request->filled('nombre_places')) {
            $query->where('nombre_places', $request->input('nombre_places'));
        }
    
        if ($request->filled('nombre_portes')) {
            $query->where('nombre_portes', $request->input('nombre_portes'));
        }
    
        $voitures = $query->with('modele.constructeur')->get();
    
        return response()->json([
            'voitures' => $voitures,
            'filters' => [
                'colors' => $colors,
                'modeles' => $modeles,
                'constructeurs' => $constructeurs,
            ],
        ]);
    }
    

    public function store(VoitureRequest $request)
    {
        $validated = $request->validated();
        $validated['couleur'] = json_encode($validated['couleur']);
        $validated['description'] = json_encode($validated['description']);
        $validated['etat_vehicule'] = json_encode($validated['etat_vehicule']);
        $voiture = Voiture::create($validated);
        return Inertia::location(route('voitures.index'));
    }


    public function show($id)
    {
        $voiture = Voiture::with('modele', 'typeCarburant', 'transmission', 'groupeMotopropulseur', 'carrosserie')->findOrFail($id);

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
        $validated['couleur'] = json_encode($validated['couleur']);
        $validated['description'] = json_encode($validated['description']);
        $validated['etat_vehicule'] = json_encode($validated['etat_vehicule']);

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
