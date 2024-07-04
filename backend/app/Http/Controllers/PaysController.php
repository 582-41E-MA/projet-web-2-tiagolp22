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
        return Inertia::render('Pays/PaysIndex', ['pays' => $pays]);
    }

    public function create()
    {
        return Inertia::render('Pays/PaysCreate');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom_pays' => 'required|json',
        ]);

        Pays::create($request->all());

        return redirect()->route('pays.index')->with('success', 'Pays created successfully.');
    }

    public function show($id)
    {
        $pay = Pays::findOrFail($id);
        return Inertia::render('Pays/PaysShow', ['pay' => $pay]);
    }

    public function edit($id)
    {
        $pay = Pays::findOrFail($id);
        return Inertia::render('Pays/PaysEdit', ['pay' => $pay]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nom_pays' => 'required|json',
        ]);

        $pay = Pays::findOrFail($id);
        $pay->update($request->all());

        return redirect()->route('pays.index')->with('success', 'Pays updated successfully.');
    }

    public function destroy($id)
    {
        $pay = Pays::findOrFail($id);
        $pay->delete();

        return redirect()->route('pays.index')->with('success', 'Pays deleted successfully.');
    }
}
