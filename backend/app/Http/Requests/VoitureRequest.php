<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VoitureRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
            'modele_id' => ['required'],
            'annee' => ['required', 'integer', 'min:1900', 'max:' . (date('Y') + 1)],
            'date_arrivee' => ['required', 'date'],
            'prix_achat' => ['required', 'numeric', 'min:0'],
            'prix_vente' => ['required', 'numeric', 'min:0'],
            'couleur' => ['required'],
            'type_transmission_id' => ['required'],
            'groupe_motopropulseur_id' => ['required'],
            'type_carburant_id' => ['required'],
            'carrosserie_id' => ['required'],
            'nombre_portes' => ['required', 'integer', 'min:1'],
            'nombre_places' => ['required', 'integer', 'min:1'],
            'kilometrage' => ['required', 'integer', 'min:0'],
            'description' => ['nullable', 'string'],
            'etat_vehicule' => ['required'],
        ];
    }
}