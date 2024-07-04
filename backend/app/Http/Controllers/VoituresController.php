<?php

namespace App\Http\Controllers;

use App\Models\Voiture;
use Illuminate\Http\Request;
use Inertia\Inertia;
class VoituresController extends Controller
{
    public function index()
    {
        $voitures = Voiture::all();
        return Inertia::render('Home', [
            'voitures' => $voitures,
        ]);
    } 
    public function store(Request $request)
    {
        //dd('dans function store');
        $validated = $request->validated(); 
        $voiture = Voiture::create($validated);
        return response()->json($voiture, 201);
    }

    public function show($id)
    {
        //dd('dans function show :) ' . $id);
        $voiture = Voiture::findOrFail($id);
        return response()->json($voiture);
    }

    public function update(Request $request, $id)
    {     
        //dd('dans function update');
        $validated = $request->validated(); 
        $voiture = Voiture::findOrFail($id);
        $voiture->update($validated);
        return response()->json($voiture, 200);
    }
    public function destroy($id)
    {
        $voiture = Voiture::findOrFail($id);
        $voiture->delete();
        return response()->json(null, 204);
    }
}