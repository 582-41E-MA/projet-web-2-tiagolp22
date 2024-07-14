<?php

namespace App\Http\Controllers;

use App\Models\Pays;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaysController extends Controller
{
    public function index()
    {
        $pays = Pays::all();

        return Inertia::render('Pays/Pays', [
            'pays' => $pays,
        ]);
    }

    public function create()
    {
        return Inertia::render('Pays/PaysCreate/PaysCreate');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom_pays' => 'required|json',
        ]);
        $pays = Pays::create([
            'nom_pays' => $validated['nom_pays'], 
        ]);
    
        return redirect()->route('pays.index')->with('success', 'Pays créé avec succès');
    }

    public function show($id)
    {
        $pays = Pays::findOrFail($id);
        return Inertia::render('Pays/PaysShow/PaysShow', ['pays' => $pays]);
    }

    public function edit($id)
    {
        $pays = Pays::findOrFail($id);
    
        return inertia('Pays/PaysEdit/PaysEdit', [
            'pays' => $pays,
        ]);
    }
    
    public function update(Request $request, $id)
    {
        $validated = $request->validated();

        $pays = Pays::findOrFail($id);
        $pays->update($validated);
        return redirect()->route('pays.index');
    }

    public function destroy($id)
    {
        $pays = Pays::findOrFail($id);
        $pays->delete();
        return redirect()->route('pays.index');
    }
}
