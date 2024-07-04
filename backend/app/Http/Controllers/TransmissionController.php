<?php

namespace App\Http\Controllers;

use App\Models\Transmission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransmissionController extends Controller
{
    public function index()
    {
        $transmissions = Transmission::all();
        return response()->json($transmissions);
    }

    public function create()
    {
        return Inertia::render('Transmissions/TransmissionsCreate/TransmissionsCreate');
    }

    public function store(Request $request)
    {
        $validated = $request->validated();

        Transmission::create($validated);

        return redirect()->route('transmissions.index');
    }

    public function show($id)
    {
        $transmission = Transmission::findOrFail($id);
        return Inertia::render('Transmissions/TransmissionShow/TransmissionShow', ['transmission' => $transmission]);
    }

    public function edit($id)
    {
        $transmission = Transmission::findOrFail($id);
        return Inertia::render('Transmissions/TransmissionEdit/TransmissionEdit', ['transmission' => $transmission]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validated();

        $transmission = Transmission::findOrFail($id);
        $transmission->update($validated);

        return redirect()->route('transmissions.index');
    }

    public function destroy($id)
    {
        $transmission = Transmission::findOrFail($id);
        $transmission->delete();

        return redirect()->route('transmissions.index');
    }
}