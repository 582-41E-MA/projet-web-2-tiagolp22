<?php

namespace App\Http\Controllers;

use App\Models\GroupeMotopropulseur;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GroupeMotopropulseurController extends Controller
{
    public function index()
    {
        $groupeMotopropulseurs = GroupeMotopropulseur::all();

        return Inertia::render('GroupeMotopropulseur/GroupeMotopropulseur', [
            'groupeMotopropulseurs' => $groupeMotopropulseurs,
        ]);
    }

    public function create()
    {
        return Inertia::render('GroupeMotopropulseur/GroupeMotopropulseurCreate/GroupeMotopropulseurCreate');
    }

    public function store(Request $request)
    {
        $validated = $request->validated();

        $groupeMotopropulseur = GroupeMotopropulseur::create($validated);
        return redirect()->route('groupeMotopropulseurs.index')->with('success', 'GroupeMotopropulseur created successfully.');
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

    public function update(Request $request, $id)
    {
        $validated = $request->validated();

        $groupeMotopropulseur = GroupeMotopropulseur::findOrFail($id);
        $groupeMotopropulseur->update($validated);
        return redirect()->route('groupeMotopropulseurs.index');
    }

    public function destroy($id)
    {
        $groupeMotopropulseur = GroupeMotopropulseur::findOrFail($id);
        $groupeMotopropulseur->delete();
        return redirect()->route('groupeMotopropulseurs.index');
    }
}
