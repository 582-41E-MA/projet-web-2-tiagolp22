<?php

namespace App\Http\Controllers;

use App\Models\MethodePaiement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MethodePaiementController extends Controller
{
    public function index()
    {
        $methodePaiements = MethodePaiement::all();

        return Inertia::render('MethodePaiement/MethodePaiement', [
            'methodePaiements' => $methodePaiements,
        ]);
    }

    public function create()
    {
        return Inertia::render('MethodePaiement/MethodePaiementCreate/MethodePaiementCreate');
    }

    public function store(Request $request)
    {
        $validated = $request->validated();

        $methodePaiement = MethodePaiement::create($validated);
        return redirect()->route('methodePaiements.index')->with('success', 'MethodePaiement created successfully.');
    }

    public function show($id)
    {
        $methodePaiement = MethodePaiement::findOrFail($id);
        return Inertia::render('MethodePaiement/MethodePaiementShow/MethodePaiementShow', ['methodePaiement' => $methodePaiement]);
    }

    public function edit($id)
    {
        $methodePaiement = MethodePaiement::findOrFail($id);
        return Inertia::render('MethodePaiement/MethodePaiementEdit/MethodePaiementEdit', ['methodePaiement' => $methodePaiement]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validated();

        $methodePaiement = MethodePaiement::findOrFail($id);
        $methodePaiement->update($validated);
        return redirect()->route('methodePaiements.index');
    }

    public function destroy($id)
    {
        $methodePaiement = MethodePaiement::findOrFail($id);
        $methodePaiement->delete();
        return redirect()->route('methodePaiements.index');
    }
}
