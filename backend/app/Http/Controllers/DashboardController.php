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
use Illuminate\Support\Facades\Auth;
use App\Models\Privilege;
use App\Models\Taxe;
use App\Models\Ville;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Fetching all data from constructeurs, pays, and provinces
        $constructeurs = Constructeur::all();
        $pays = Pays::all();
        $provinces = Province::with('pays')->get();
        $taxes = Taxe::with('province')->get(); 
        $villes= Ville::with('province')->get();
        // Fetching related data for Voiture creation form
        $modeles = Modele::with('constructeur')->get();
        $transmissions = Transmission::all();
        $groupesMotopropulseurs = GroupeMotopropulseur::all();
        $typesCarburant = TypeCarburant::all();
        $carrosseries = Carrosserie::all();
        $privilege_id = Auth::check() ? Auth::user()->privileges_id : null;
        return Inertia::render('Dashboard/Dashboard', [
            'constructeurs' => $constructeurs,
            'pays' => $pays,
            'provinces' => $provinces,
            'modeles' => $modeles,
            'transmissions' => $transmissions,
            'groupesMotopropulseurs' => $groupesMotopropulseurs,
            'typesCarburant' => $typesCarburant,
            'carrosseries' => $carrosseries,
            'privilege_id' => $privilege_id,
            'taxes' => $taxes,
            'villes' => $villes,
        ]);
    }
}
