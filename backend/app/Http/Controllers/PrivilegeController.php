<?php

namespace App\Http\Controllers;

use App\Models\Privilege;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PrivilegeController extends Controller
{
    public function index()
    {
        $privileges = Privilege::all();

        return Inertia::render('Privilege/Privilege', [
            'privileges' => $privileges,
        ]);
    }

    public function create()
    {
        return Inertia::render('Privilege/PrivilegeCreate/PrivilegeCreate');
    }

    public function store(Request $request)
    {
        $validated = $request->validated();

        $privilege = Privilege::create($validated);
        return redirect()->route('privileges.index')->with('success', 'Privilege created successfully.');
    }

    public function show($id)
    {
        $privilege = Privilege::findOrFail($id);
        return Inertia::render('Privilege/PrivilegeShow/PrivilegeShow', ['privilege' => $privilege]);
    }

    public function edit($id)
    {
        $privilege = Privilege::findOrFail($id);
        return Inertia::render('Privilege/PrivilegeEdit/PrivilegeEdit', ['privilege' => $privilege]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validated();

        $privilege = Privilege::findOrFail($id);
        $privilege->update($validated);
        return redirect()->route('privileges.index');
    }

    public function destroy($id)
    {
        $privilege = Privilege::findOrFail($id);
        $privilege->delete();
        return redirect()->route('privileges.index');
    }
}