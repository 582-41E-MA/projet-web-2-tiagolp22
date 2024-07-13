<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use App\Models\Voiture;
use App\Models\TypeCarburant;
use App\Models\Modele;
use App\Models\Transmission;
use App\Models\GroupeMotopropulseur;
use App\Models\Carrosserie;
use App\Models\Constructeur;
use App\Models\Photo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\VoitureRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Spatie\LaravelImageOptimizer\Facades\ImageOptimizer;

class VoitureController extends Controller
{
    public function index()
    {
        $voitures = Voiture::with('modele')->get();
        $privilege_id = Auth::check() ? Auth::user()->privileges_id : null;

        foreach ($voitures as $voiture) {
            $photo = Photo::where('voitures_id_voiture', $voiture->id_voiture)->first();
            $voiture->photo_url = $photo ? asset(Storage::url($photo->photos)) : null;
        }

        return Inertia::render('Voiture/Voiture', [
            'voitures' => $voitures,
            'privilege_id' => $privilege_id,
        ]);
    }


    public function create(Request $request)
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

        $prixAchat = $validated['prix_achat'];
        $prixVenteMinimum = $prixAchat * 1.25;

        // 25% + if > prix_vente
        if (!isset($validated['prix_vente']) || $validated['prix_vente'] < $prixVenteMinimum) {
            $validated['prix_vente'] = $prixVenteMinimum;
        }

        $validated['couleur'] = json_encode($validated['couleur']);
        $validated['description'] = json_encode($validated['description']);
        $validated['etat_vehicule'] = json_encode($validated['etat_vehicule']);

        $voiture = Voiture::create($validated);

        if ($request->hasFile('photos') && count($request->file('photos')) >= 3) {
            foreach ($request->file('photos') as $index => $file) {
                $path = $file->store('public/photos');

                $originalSize = filesize($file->getPath());
                ImageOptimizer::optimize(storage_path('app/' . $path));
                $optimizedSize = filesize(storage_path('app/' . $path));
                $compressionRatio = 100 - (($optimizedSize / $originalSize) * 100);
                Log::info("Original: " . $originalSize . " bytes");
                Log::info("Apres Optimizer " . $optimizedSize . " bytes");
                Log::info("compressionRatio " . $compressionRatio . "%");
                $photo = Photo::create([
                    'voitures_id_voiture' => $voiture->id_voiture,
                    'photos' => $path,
                    'ordre' => $index,
                ]);
            }
        }
        return Inertia::location(route('voitures.index'));
    }


    public function show($id)
    {
        $voiture = Voiture::with(['modele', 'typeCarburant', 'transmission', 'groupeMotopropulseur', 'carrosserie', 'photos'])->findOrFail($id);
        $privilege_id = Auth::check() ? Auth::user()->privileges_id : null;

        $photos = $voiture->photos->map(function ($photo) {
            $photo->photo_url = asset(Storage::url($photo->photos));
            return $photo;
        });

        return Inertia::render('Voiture/VoitureShow/VoitureShow', [
            'voiture' => $voiture,
            'photos' => $photos,
            'privilege_id' => $privilege_id,
        ]);
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