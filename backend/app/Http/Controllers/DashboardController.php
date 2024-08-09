<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Constructeur;
use App\Models\Pays;
use App\Models\Province;
use App\Models\Modele;
use App\Models\Transmission;
use App\Models\GroupeMotopropulseur;
use App\Models\TypeCarburant;
use App\Models\Carrosserie;
use App\Models\Voiture;
use App\Models\Status; 
use Illuminate\Support\Facades\Auth;
use App\Models\Privilege;
use App\Models\Commande;
use App\Models\Taxe;
use App\Models\Ville;
use Inertia\Inertia;

use Illuminate\Support\Facades\Storage;
use App\Models\Photo;


class DashboardController extends Controller
{
    public function index()
    {
        // Fetching all data from constructeurs, pays, and provinces
        $constructeurs = Constructeur::all();
        $pays = Pays::all();
        // Fetching status data
        $statuses = Status::all(); // Adicione esta linha
        
        // Fetching all voitures with related data
        $voitures = Voiture::with([
            'modele.constructeur',
            'transmission',
            'groupeMotopropulseur',
            'typeCarburant',
            'carrosserie',
            'photos',
        ])->get();

        $provinces = Province::with('pays')->get();
        $taxes = Taxe::with('province')->get(); 
        $villes = Ville::with('province')->get();
        
        // Fetching related data for Voiture creation form
        $modeles = Modele::with('constructeur')->get();
        $transmissions = Transmission::all();
        $groupesMotopropulseur = GroupeMotopropulseur::all();
        $typesCarburant = TypeCarburant::all();
        $carrosseries = Carrosserie::all();
        $privilege_id = Auth::check() ? Auth::user()->privileges_id : null;
        
        $commandes = Commande::with([
            'utilisateur', 
            'status',
            'methodespaiement',
            'methodesexpedition'
        ])->get();

        return Inertia::render('Dashboard/Dashboard', [
            'constructeurs' => $constructeurs,
            'pays' => $pays,
            'voitures' => $voitures,
            'provinces' => $provinces,
            'modeles' => $modeles,
            'transmissions' => $transmissions,
            'groupesMotopropulseur' => $groupesMotopropulseur,
            'typesCarburant' => $typesCarburant,
            'carrosseries' => $carrosseries,
            'privilege_id' => $privilege_id,
            'taxes' => $taxes,
            'villes' => $villes,
            'photos' => $voitures->flatMap(function ($voiture) {
                return $voiture->photos;
            }),
            'commandes' => $commandes,
            'statuses' => $statuses,
        ]);
    }
}