<?php

namespace App\Http\Controllers;

use App\Models\Taxe;
use App\Models\Province;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaxeController extends Controller
{
    public function index()
    {
        $taxes = Taxe::with('province')->get(); 

        return Inertia::render('Taxe/TaxeIndex', [
            'taxes' => $taxes,
        ]);
    }


    public function create()
    {
        $provinces = Province::all(); 
    
        return Inertia::render('Taxe/TaxeCreate/TaxeCreate', [
            'provinces' => $provinces,
        ]);
    }
    

    public function store(Request $request)
    {
        dd($request);
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
