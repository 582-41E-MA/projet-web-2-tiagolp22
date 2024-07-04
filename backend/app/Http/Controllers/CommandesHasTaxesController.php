<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Commande;
use App\Models\Taxe;
use App\Models\CommandeHasTaxe;
use Inertia\Inertia;

class CommandeHasTaxeController extends Controller
{
    public function index()
    {
        $commandes_has_taxes = CommandeHasTaxe::all();

        return Inertia::render('CommandeHasTaxe/Index', [
            'commandes_has_taxes' => $commandes_has_taxes,
        ]);
    }

    public function create()
    {
        return Inertia::render('CommandeHasTaxe/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validated();

        $commandes_has_taxes = CommandeHasTaxe::create([
            'commandes_id_commande' => $validated['commandes_id_commande'],
            'taxes_id' => $validated['taxes_id'],
            'total_taxes' => $validated['total_taxes'],
        ]);

        return redirect()->route('commandes-has-taxes.index')->with('success', 'Commandes Has Taxes created successfully.');
    }

    public function show($id)
    {
        $commandes_has_taxes = CommandeHasTaxe::findOrFail($id);

        return Inertia::render('CommandeHasTaxe/Show', [
            'commandes_has_taxes' => $commandes_has_taxes,
        ]);
    }

    public function edit($id)
    {
        $commandes_has_taxes = CommandeHasTaxe::findOrFail($id);

        return Inertia::render('CommandeHasTaxe/Edit', [
            'commandes_has_taxes' => $commandes_has_taxes,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validated();

        $commandes_has_taxes = CommandeHasTaxe::findOrFail($id);
        $commandes_has_taxes->update([
            'commandes_id_commande' => $validated['commandes_id_commande'],
            'taxes_id' => $validated['taxes_id'],
            'total_taxes' => $validated['total_taxes'],
        ]);

        return redirect()->route('commandes-has-taxes.index')->with('success', 'Commandes Has Taxes updated successfully.');
    }

    public function destroy($id)
    {
        $commandes_has_taxes = CommandeHasTaxe::findOrFail($id);
        $commandes_has_taxes->delete();

        return redirect()->route('commandes-has-taxes.index')->with('success', 'Commandes Has Taxes deleted successfully.');
    }

    protected function rules()
    {
        return [
            'commandes_id_commande' => 'required|exists:commandes,id_commande',
            'taxes_id' => 'required|exists:taxes,id',
            'total_taxes' => 'required|numeric|min:0',
        ];
    }
}
