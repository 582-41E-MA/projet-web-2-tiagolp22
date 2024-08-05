<?php

namespace App\Http\Controllers;

use App\Models\Carrosserie;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\CarrosserieRequest;


class CarrosserieController extends Controller
{
    public function index()
    {
        $carrosseries = Carrosserie::all();
        return Inertia::render('Carrosserie/CarrosserieIndex', [
            'carrosseries' => $carrosseries
        ]);
    }
    

    public function create()
    {
        return Inertia::render('Carrosserie/CarrosserieCreate/CarrosserieCreate');
    }

    public function store(CarrosserieRequest $request)
    {
        $validated = $request->validated();

        $carrosserie = Carrosserie::create($validated);
        return redirect()->route('carrosseries.index')->with('success', 'Carrosserie created successfully.');
    }

    public function show($id)
    {
        $carrosserie = Carrosserie::findOrFail($id);
        return Inertia::render('Carrosserie/CarrosserieShow/CarrosserieShow', ['carrosserie' => $carrosserie]);
    }

    public function edit($id)
    {
        $carrosserie = Carrosserie::findOrFail($id);
        return Inertia::render('Carrosserie/CarrosserieEdit/CarrosserieEdit', ['carrosserie' => $carrosserie]);
    }

    public function update(CarrosserieRequest $request, $id)
    {
        $validated = $request->validated();

        $carrosserie = Carrosserie::findOrFail($id);
        $carrosserie->update($validated);
        return redirect()->route('carrosseries.index');
    }

    public function destroy($id)
    {
        $carrosserie = Carrosserie::findOrFail($id);
        $carrosserie->delete();
        return redirect()->route('carrosseries.index');
    }
}