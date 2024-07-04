<?php

namespace App\Http\Controllers;

use App\Models\MethodeExpedition;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MethodeExpeditionController extends Controller
{
    public function index()
    {
        $methodeExpeditions = MethodeExpedition::all();

        return Inertia::render('MethodeExpedition/MethodeExpedition', [
            'methodeExpeditions' => $methodeExpeditions,
        ]);
    }

    public function create()
    {
        return Inertia::render('MethodeExpedition/MethodeExpeditionCreate/MethodeExpeditionCreate');
    }

    public function store(Request $request)
    {
        $validated = $request->validated();

        $methodeExpedition = MethodeExpedition::create($validated);
        return redirect()->route('methodeExpeditions.index')->with('success', 'MethodeExpedition created successfully.');
    }

    public function show($id)
    {
        $methodeExpedition = MethodeExpedition::findOrFail($id);
        return Inertia::render('MethodeExpedition/MethodeExpeditionShow/MethodeExpeditionShow', ['methodeExpedition' => $methodeExpedition]);
    }

    public function edit($id)
    {
        $methodeExpedition = MethodeExpedition::findOrFail($id);
        return Inertia::render('MethodeExpedition/MethodeExpeditionEdit/MethodeExpeditionEdit', ['methodeExpedition' => $methodeExpedition]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validated();

        $methodeExpedition = MethodeExpedition::findOrFail($id);
        $methodeExpedition->update($validated);
        return redirect()->route('methodeExpeditions.index');
    }

    public function destroy($id)
    {
        $methodeExpedition = MethodeExpedition::findOrFail($id);
        $methodeExpedition->delete();
        return redirect()->route('methodeExpeditions.index');
    }
}
