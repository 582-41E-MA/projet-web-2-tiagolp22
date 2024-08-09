<?php

namespace App\Http\Controllers;

use App\Models\Province;
use App\Models\Pays;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProvinceController extends Controller
{
    public function index()
    {
        $provinces = Province::with('pays')->get(); // Carregar os dados relacionados
        return $provinces;
    }

    public function create()
    {
        $pays = Pays::all(); // Carregar todos os pays para o formulário de criação
        return Inertia::render('Province/ProvinceCreate/ProvinceCreate', [
            'pays' => $pays
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nom_province' => 'required|string',
            'pays_id' => 'required|integer',
        ]);

        $province = Province::create($validatedData);

        
    }

    public function edit($id)
    {
        $province = Province::findOrFail($id);
        $pays = Pays::all(); // Carregar todos os pays para o formulário de edição
        return Inertia::render('Province/ProvinceEdit/ProvinceEdit', [
            'province' => $province,
            'pays' => $pays,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nom_province' => 'required|string|max:50',
            'pays_id' => 'required|integer',
        ]);
    
        $province = Province::findOrFail($id);
        $province->update($validated);
    
       
    }

    public function destroy($id)
    {
        $province = Province::findOrFail($id);
        $province->delete();

        return redirect()->route('provinces.index')->with('success', 'Province supprimée avec succès.');
    }
}
