<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreReservationRequest;
use App\Models\Reservation;

class ReservationController extends Controller
{
    public function store(StoreReservationRequest $request)
    {
        $validated = $request->validated();
        $reservation = Reservation::create($validated);
        return response()->json($reservation, 201);
    }
    
}