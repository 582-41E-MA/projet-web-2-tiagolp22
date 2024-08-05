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
        return Inertia::render('TypeCarburant/TypeCarburantIndex/TypeCarburantIndex', ['typesCarburant' => $typeCarburants]);
    }
    public function show($id)
    {
        $typeCarburant = TypeCarburant::findOrFail($id);
        return response()->json($typeCarburant);
    }

    public function create()
    {
        return Inertia::render('TypeCarburant/TypeCarburantCreate/TypeCarburantCreate');
    }

    public function store(Request $request)
    {
        $request->validate([
            'type_carburant' => 'required|json',
            'description' => 'nullable|json',
        ]);

        $typeCarburant = new TypeCarburant();
        $typeCarburant->type_carburant = json_decode($request->input('type_carburant'), true);
        $typeCarburant->description = json_decode($request->input('description'), true);
        $typeCarburant->save();

        return redirect()->route('type-carburants.index');
    }

    public function edit($id)
    {
        $typeCarburant = TypeCarburant::findOrFail($id);
        
        return Inertia::render('TypeCarburant/TypeCarburantEdit/TypeCarburantEdit', [
            'typeCarburant' => $typeCarburant
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'type_carburant' => 'required|array',
            'type_carburant.en' => 'required|string',
            'type_carburant.fr' => 'required|string',
            'description' => 'required|array',
            'description.en' => 'required|string',
            'description.fr' => 'required|string',
        ]);
    
        $typeCarburant = TypeCarburant::findOrFail($id);
        $typeCarburant->type_carburant = $validated['type_carburant'];
        $typeCarburant->description = $validated['description'];
        $typeCarburant->save();
    
        return redirect()->route('type-carburants.index')->with('success', 'Type de carburant mis à jour avec succès.');
    }
    

    public function destroy($id)
    {
        $typeCarburant = TypeCarburant::findOrFail($id);
        $typeCarburant->delete();
    
        return redirect()->route('type-carburants.index')->with('success', 'Type de carburant supprimé avec succès.');
    }
}
