<?php

namespace App\Http\Controllers;

use App\Models\Modele;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ModeleController extends Controller
{
    public function index()
    {
        $modeles = Modele::all();

        return Inertia::render('Modele/Modele', [
            'modeles' => $modeles,
        ]);
    }

    public function create()
    {
        return Inertia::render('Modele/ModeleCreate/ModeleCreate');
    }

    public function store(Request $request)
    {
        $validated = $request->validated();

        $modele = Modele::create($validated);
        return redirect()->route('modeles.index')->with('success', 'Modele created successfully.');
    }

    public function show($id)
    {
        $modele = Modele::findOrFail($id);
        return Inertia::render('Modele/ModeleShow/ModeleShow', ['modele' => $modele]);
    }

    public function edit($id)
    {
        $modele = Modele::findOrFail($id);
        return Inertia::render('Modele/ModeleEdit/ModeleEdit', ['modele' => $modele]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validated();

        $modele = Modele::findOrFail($id);
        $modele->update($validated);
        return redirect()->route('modeles.index');
    }

    public function destroy($id)
    {
        $modele = Modele::findOrFail($id);
        $modele->delete();
        return redirect()->route('modeles.index');
    }
}
