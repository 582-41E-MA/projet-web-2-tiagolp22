<?php

namespace App\Http\Controllers;

use App\Models\Tax;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaxeController extends Controller
{
    public function index()
    {
        $taxe = Tax::all();
        return Inertia::render('Taxe/TaxeIndex', ['taxe' => $taxe]);
    }

    public function create()
    {
        return Inertia::render('Taxe/TaxeCreate');
    }

    public function store(Request $request)
    {
        $request->validate([
            'GST_HST' => 'required|numeric|between:0,99.99',
            'PST' => 'required|numeric|between:0,99.99',
            'provinces_id_province' => 'required|integer|exists:provinces,id_province',
        ]);

        Tax::create($request->all());

        return redirect()->route('taxe.index')->with('success', 'Tax created successfully.');
    }

    public function show($id)
    {
        $tax = Tax::findOrFail($id);
        return Inertia::render('Taxe/TaxeShow', ['tax' => $tax]);
    }

    public function edit($id)
    {
        $tax = Tax::findOrFail($id);
        return Inertia::render('Taxe/TaxeEdit', ['tax' => $tax]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'GST_HST' => 'required|numeric|between:0,99.99',
            'PST' => 'required|numeric|between:0,99.99',
            'provinces_id_province' => 'required|integer|exists:provinces,id_province',
        ]);

        $tax = Tax::findOrFail($id);
        $tax->update($request->all());

        return redirect()->route('taxe.index')->with('success', 'Tax updated successfully.');
    }

    public function destroy($id)
    {
        $tax = Tax::findOrFail($id);
        $tax->delete();

        return redirect()->route('taxe.index')->with('success', 'Tax deleted successfully.');
    }
}
