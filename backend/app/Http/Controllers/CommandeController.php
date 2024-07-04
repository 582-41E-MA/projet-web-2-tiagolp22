<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommandeController extends Controller
{
    public function index()
    {
        $commandes = Commande::all();

        return Inertia::render('Commande/Commande', [
            'commandes' => $commandes,
        ]);
    }

    public function create()
    {
        return Inertia::render('Commande/CommandeCreate/CommandeCreate');
    }

    public function store(Request $request)
    {
        $validated = $request->validated();

        $commande = Commande::create($validated);
        return redirect()->route('commandes.index')->with('success', 'Commande created successfully.');
    }

    public function show($id)
    {
        $commande = Commande::findOrFail($id);
        return Inertia::render('Commande/CommandeShow/CommandeShow', ['commande' => $commande]);
    }

    public function edit($id)
    {
        $commande = Commande::findOrFail($id);
        return Inertia::render('Commande/CommandeEdit/CommandeEdit', ['commande' => $commande]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validated();

        $commande = Commande::findOrFail($id);
        $commande->update($validated);
        return redirect()->route('commandes.index');
    }

    public function destroy($id)
    {
        $commande = Commande::findOrFail($id);
        $commande->delete();
        return redirect()->route('commandes.index');
    }
}

