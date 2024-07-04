<?php

namespace App\Http\Controllers;

use App\Models\TypeCarburant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TypeCarburantController extends Controller
{
    public function index()
    {
        $typeCarburants = TypeCarburant::all();

        return Inertia::render('TypeCarburant/TypeCarburant', [
            'typeCarburants' => $typeCarburants,
        ]);
    }

    public function create()
    {
        return Inertia::render('TypeCarburant/TypeCarburantCreate/TypeCarburantCreate');
    }

    public function store(Request $request)
    {
        $validated = $request->validated();

        $typeCarburant = TypeCarburant::create($validated);
        return redirect()->route('typeCarburants.index')->with('success', 'TypeCarburant created successfully.');
    }

    public function show($id)
    {
        $typeCarburant = TypeCarburant::findOrFail($id);
        return Inertia::render('TypeCarburant/TypeCarburantShow/TypeCarburantShow', ['typeCarburant' => $typeCarburant]);
    }

    public function edit($id)
    {
        $typeCarburant = TypeCarburant::findOrFail($id);
        return Inertia::render('TypeCarburant/TypeCarburantEdit/TypeCarburantEdit', ['typeCarburant' => $typeCarburant]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validated();

        $typeCarburant = TypeCarburant::findOrFail($id);
        $typeCarburant->update($validated);
        return redirect()->route('typeCarburants.index');
    }

    public function destroy($id)
    {
        $typeCarburant = TypeCarburant::findOrFail($id);
        $typeCarburant->delete();
        return redirect()->route('typeCarburants.index');
    }
}
