<?php

namespace App\Http\Controllers;

use App\Models\Status;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StatusController extends Controller
{
    public function index()
    {
        $status = Status::all();
        return Inertia::render('Status/StatusIndex', ['status' => $status]);
    }

    public function create()
    {
        return Inertia::render('Status/StatusCreate/StatusCreate');
    }

    public function store(Request $request)
    {
        $validated = $request->validated();

        Status::create($validated);

        return redirect()->route('status.index');
    }

    public function show($id)
    {
        $status = Status::findOrFail($id);
        return Inertia::render('Status/StatusShow/StatusShow', ['status' => $status]);
    }

    public function edit($id)
    {
        $status = Status::findOrFail($id);
        return Inertia::render('Status/StatusEdit/StatusEdit', ['status' => $status]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validated();

        $status = Status::findOrFail($id);
        $status->update($validated);

        return redirect()->route('status.index');
    }

    public function destroy($id)
    {
        $status = Status::findOrFail($id);
        $status->delete();

        return redirect()->route('status.index');
    }
}