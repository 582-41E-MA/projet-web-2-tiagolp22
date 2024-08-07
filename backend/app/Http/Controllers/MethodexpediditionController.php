<?php

namespace App\Http\Controllers;

use App\Models\MethodeExpedition;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class MethodexpediditionController extends Controller
{
    public function index()
    {
        try {
            $methodeExpeditions = MethodeExpedition::all();
            return response()->json($methodeExpeditions);
        } catch (\Exception $e) {
            Log::error('Error fetching shipping methods: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while fetching shipping methods'], 500);
        }
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
