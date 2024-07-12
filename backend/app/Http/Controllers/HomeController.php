<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Voiture;
use App\Models\Photo;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
class HomeController extends Controller

{
    public function index()
    {


        $voitures = Voiture::with('modele')
            ->where('date_arrivee', '>=', Carbon::now()->subDays(30))
            ->get();

        foreach ($voitures as $voiture) {
            $photo = Photo::where('voitures_id_voiture', $voiture->id_voiture)->first();
            $voiture->photo_url = $photo ? asset(Storage::url($photo->photos)) : null;
        }

        return Inertia::render('Home', [
            'voitures' => $voitures
        ]);
    } 
}