<?php

namespace App\Http\Controllers;

use App\Models\Taxe;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaxeController extends Controller
{
    public function index()
    {
        $taxes = Taxe::all();

        return Inertia::render('Taxe/Taxe', [
            'taxes' => $taxes,
        ]);
    }

    public function create()
    {
        return Inertia::render('Taxe/TaxeCreate/TaxeCreate');
    }

    public function store(Request $request)
    {
        $validated = $request->validated();

        $taxe = Taxe::create($validated);
        return redirect()->route('taxes.index')->with('success', 'Taxe created successfully.');
    }

    public function show($id)
    {
        $taxe = Taxe::findOrFail($id);
        return Inertia::render('Taxe/TaxeShow/TaxeShow', ['taxe' => $taxe]);
    }

    public function edit($id)
    {
        $taxe = Taxe::findOrFail($id);
        return Inertia::render('Taxe/TaxeEdit/TaxeEdit', ['taxe' => $taxe]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validated();

        $taxe = Taxe::findOrFail($id);
        $taxe->update($validated);
        return redirect()->route('taxes.index');
    }

    public function destroy($id)
    {
        $taxe = Taxe::findOrFail($id);
        $taxe->delete();
        return redirect()->route('taxes.index');
    }
}
