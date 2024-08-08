<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use App\Models\Voiture;
use App\Models\Photo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    public function index()
    {
        $today = now()->toDateString();
        $thirtyDaysAgo = now()->subDays(30)->toDateString();
        $reservedCarIds = DB::table('reservations')->pluck('id_voiture')->toArray();
        $voitures = Voiture::with('modele')
            ->where('date_arrivee', '<=', $today)
            ->where('date_arrivee', '>=', $thirtyDaysAgo) // les nouvelles voitures
            ->whereNotIn('id_voiture', $reservedCarIds)
            ->orderBy('date_arrivee', 'desc')
            ->get();

        $privilege_id = Auth::check() ? Auth::user()->privileges_id : null;
        foreach ($voitures as $voiture) {
            $photo = Photo::where('voitures_id_voiture', $voiture->id_voiture)->first();
            $voiture->photo_url = $photo ? asset(Storage::url($photo->photos)) : null;
        }

        return Inertia::render('Home/Home', [
            'voitures' => $voitures,
            'privilege_id' => $privilege_id,
        ]);
    }
}