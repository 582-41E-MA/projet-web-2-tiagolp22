<?php

namespace App\Http\Controllers;

use App\Models\Province;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProvinceController extends Controller
{
    public function index()
    {
        $provinces = Province::all();

        return Inertia::render('Province/Province', [
            'provinces' => $provinces,
        ]);
    }

    public function create()
    {
        return Inertia::render('Province/ProvinceCreate/ProvinceCreate');
    }

    public function store(Request $request)
    {
        $validated = $request->validated();

        $province = Province::create($validated);
        return redirect()->route('provinces.index')->with('success', 'Province created successfully.');
    }

    public function show($id)
    {
        $province = Province::findOrFail($id);
        return Inertia::render('Province/ProvinceShow/ProvinceShow', ['province' => $province]);
    }

    public function edit($id)
    {
        $province = Province::findOrFail($id);
        return Inertia::render('Province/ProvinceEdit/ProvinceEdit', ['province' => $province]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validated();

        $province = Province::findOrFail($id);
        $province->update($validated);
        return redirect()->route('provinces.index');
    }

    public function destroy($id)
    {
        $province = Province::findOrFail($id);
        $province->delete();
        return redirect()->route('provinces.index');
    }
}
