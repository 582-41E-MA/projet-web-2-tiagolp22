<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CommandeRequest extends FormRequest
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
            'id_utilisateur' => ['required', 'exists:utilisateurs,id_utilisateur'],
            'date_commande' => ['required', 'date'],
            'prix_total' => ['required', 'numeric', 'min:0'],
            'status_commande_id' => ['required', 'exists:status,id_status'],
            'mode_paiement_id' => ['required', 'exists:methodespaiement,id_methode_paiement'],
            'mode_expedition_id' => ['required', 'exists:methodesexpedition,id_methode_expedition'],
            'date_paiement' => ['nullable', 'date'],
            'date_expedition' => ['nullable', 'date'],
            'commentaires' => ['nullable', 'string'],
        ];
    }
}
