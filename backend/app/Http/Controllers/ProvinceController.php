<?php

namespace App\Http\Controllers;

use App\Models\Province;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProvinceController extends Controller
{
    public function index()
    {
        $province = Province::all();
        return Inertia::render('Province/ProvinceIndex', ['province' => $province]);
    }

    public function create()
    {
        return Inertia::render('Province/ProvinceCreate');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom_province' => 'required|string|max:50',
            'pays_id' => 'required|integer|exists:pays,id_pays',
        ]);

        Province::create($request->all());

        return redirect()->route('province.index')->with('success', 'Province created successfully.');
    }

    public function show($id)
    {
        $province = Province::findOrFail($id);
        return Inertia::render('Province/ProvinceShow', ['province' => $province]);
    }

    public function edit($id)
    {
        $province = Province::findOrFail($id);
        return Inertia::render('Province/ProvinceEdit', ['province' => $province]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nom_province' => 'required|string|max:50',
            'pays_id' => 'required|integer|exists:pays,id_pays',
        ]);

        $province = Province::findOrFail($id);
        $province->update($request->all());

        return redirect()->route('province.index')->with('success', 'Province updated successfully.');
    }

    public function destroy($id)
    {
        $province = Province::findOrFail($id);
        $province->delete();

        return redirect()->route('province.index')->with('success', 'Province deleted successfully.');
    }
}
