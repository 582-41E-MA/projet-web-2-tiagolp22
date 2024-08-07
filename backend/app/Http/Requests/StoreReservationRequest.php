<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReservationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'id_voiture' => 'required|exists:voitures,id_voiture',
            'id_utilisateur' => 'required|exists:utilisateurs,id_utilisateur',
            'date_reservation' => 'required|date',
            'status' => 'required|string',
        ];
    }
}