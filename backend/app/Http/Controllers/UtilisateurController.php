<?php
namespace App\Http\Controllers;

use App\Http\Requests\CreateUtilisateurRequest;
use App\Http\Requests\UpdateUtilisateurRequest;
use App\Models\Utilisateur;
use App\Models\Ville;
use App\Models\Privilege;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Reservation;

class UtilisateurController extends Controller
{
    public function index()
    {

        // $utilisateurs = Utilisateur::all();
        // return response()->json($utilisateurs);

        return inertia('Utilisateurs/Index', [
            'utilisateurs' => Utilisateur::all()
        ]);
    }

    public function create()
    {
        return inertia('User/Profile');
    }

    public function store(CreateUtilisateurRequest $request)
    {
        $validated = $request->validated();

        $utilisateur = new Utilisateur($validated);
        $utilisateur->mot_de_passe = Hash::make($validated['mot_de_passe']);
        $utilisateur->save();

        return redirect()->route('utilisateurs.index')->with('success', 'Utilisateur créé avec succès.');
    }

    public function show($id)
    {
        $utilisateur = Utilisateur::findOrFail($id);
        return inertia('User/Profile', [
            'utilisateur' => $utilisateur
        ]);
    }

    public function edit($id)
    {
        $utilisateur = Utilisateur::findOrFail($id);
        $villes = Ville::orderBy('nom_ville')->get();
        $privileges = Privilege::orderBy('nom_privilege')->get();
        $reservations = Reservation::with(['voiture.modele', 'voiture.transmission', 'voiture.groupeMotopropulseur', 'voiture.typeCarburant', 'voiture.carrosserie', 'voiture.commande', 'voiture.photos'])->where('id_utilisateur', $id)->get();
        return inertia('User/Profile', [
            'utilisateur' => $utilisateur,
            'villes' => $villes,
            'privileges' => $privileges,
            'reservations' => $reservations,
        ]);
    }

    public function update(UpdateUtilisateurRequest $request, $id_utilisateur)
    {
        $validated = $request->validated();
        $utilisateur = Utilisateur::findOrFail($id_utilisateur);
        $utilisateur->fill($validated);
        if ($request->filled('mot_de_passe')) {
            $utilisateur->mot_de_passe = Hash::make($validated['mot_de_passe']);
        }
        $utilisateur->save();
        return redirect()->route('utilisateurs.index')->with('success', 'Utilisateur mis à jour avec succès.');
    }



    public function destroy($id)
    {
        $utilisateur = Utilisateur::findOrFail($id);
        $utilisateur->delete();

        return response()->json(['message' => 'Utilisateur supprimer avec succes']);
    }

    public function getUtilisateurWithPrivilegeOne()
    {
        if (Auth::check()) {
            $utilisateur = Utilisateur::where('privileges_id', 1)->first();

            if ($utilisateur) {
                return response()->json($utilisateur);
            } else {
                return response()->json(['message' => 'No user with privilege 1 found.'], 404);
            }
        } else {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    }
}