<?php

namespace App\Http\Controllers;

use App\Models\GroupeMotopropulseur;
use App\Http\Requests\GroupeMotopropulseurRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GroupeMotopropulseurController extends Controller
{
    public function index()
    {
        $groupeMotopropulseurs = GroupeMotopropulseur::all();
        return Inertia::render('GroupeMotopropulseur/GroupeMotopropulseurIndex', [
            'groupeMotopropulseurs' => $groupeMotopropulseurs
        ]);
    }

    public function create()
    {
        return Inertia::render('GroupeMotopropulseur/GroupeMotopropulseurCreate/GroupeMotopropulseurCreate');
    }

    public function store(GroupeMotopropulseurRequest $request)
    {
        $validated = $request->validated();
        GroupeMotopropulseur::create($validated);
        return redirect()->route('groupe-motopropulseurs.index')->with('success', 'Groupe motopropulseur créé avec succès.');
    }

    public function show($id)
    {
        $groupeMotopropulseur = GroupeMotopropulseur::findOrFail($id);
        return Inertia::render('GroupeMotopropulseur/GroupeMotopropulseurShow/GroupeMotopropulseurShow', ['groupeMotopropulseur' => $groupeMotopropulseur]);
    }

    public function edit($id)
    {
        $groupeMotopropulseur = GroupeMotopropulseur::findOrFail($id);
        return Inertia::render('GroupeMotopropulseur/GroupeMotopropulseurEdit/GroupeMotopropulseurEdit', ['groupeMotopropulseur' => $groupeMotopropulseur]);
    }

    public function update(GroupeMotopropulseurRequest $request, $id)
    {
        $validated = $request->validated();
        $groupeMotopropulseur = GroupeMotopropulseur::findOrFail($id);
        $groupeMotopropulseur->update($validated);
        return redirect()->route('groupe-motopropulseurs.index')->with('success', 'Groupe motopropulseur mis à jour avec succès.');
    }

    public function destroy($id)
    {
        $groupeMotopropulseur = GroupeMotopropulseur::findOrFail($id);
        $groupeMotopropulseur->delete();
        return redirect()->route('groupe-motopropulseurs.index')->with('success', 'Groupe motopropulseur supprimé avec succès.');
    }
}