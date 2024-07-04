<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ville;

class VilleController extends Controller
{
    
    public function index()
    {
        $villes = Ville::all();
        return response()->json($villes);
    }


    public function show($id)
    {
        $ville = Ville::findOrFail($id);
        return response()->json($ville);
    }


    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
        ]);

        $ville = Ville::create($request->all());
        return response()->json($ville, 201);
    }


    public function update(Request $request, $id)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
        ]);

        $ville = Ville::findOrFail($id);
        $ville->update($request->all());

        return response()->json($ville);
    }


    public function destroy($id)
    {
        $ville = Ville::findOrFail($id);
        $ville->delete();

        return response()->json(null, 204);
    }
}
