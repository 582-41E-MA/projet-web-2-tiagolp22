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
        $validated = $request->validate([
            'GST_HST' => ['required', 'numeric', 'min:0', 'max:100'],
            'PST' => ['required', 'numeric', 'min:0', 'max:100'],
            'provinces_id_province' => ['required', 'exists:provinces,id_province'],
        ]);
    
        $taxe = Taxe::create($validated);
        
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
        $validated = $request->validate([
            'GST_HST' => 'required|numeric|min:0',
            'PST' => 'required|numeric|min:0',
            'provinces_id_province' => 'required|exists:provinces,id_province',
        ]);
    
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
