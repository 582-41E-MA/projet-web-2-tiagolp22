<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUtilisateurRequest extends FormRequest
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
    public function rules(): array
    {
        $userId = $this->route('id_utilisateur');

        return [
            'prenom' => 'required|string|max:50',
            'nom' => 'required|string|max:50',
            'date_naissance' => 'required|date',
            'adresse' => 'required|string|max:255',
            'code_postal' => 'required|string|max:10',
            'numero_telephone' => 'required|string|max:20',
            'numero_portable' => 'nullable|string|max:20',
            'courriel' => [
                'sometimes',
                'required',
                'string',
                'email',
                'max:100',
                Rule::unique('utilisateurs', 'courriel')->where(function ($query) use ($userId) {
                    return $query->where('id_utilisateur', $userId);
                })
            ],
            'privileges_id' => 'required|integer|exists:privileges,id_privilege',
            'nom_utilisateur' => [
                'sometimes',
                'required',
                'string',
                'max:50',
                Rule::unique('utilisateurs', 'nom_utilisateur')->where(function ($query) use ($userId) {
                    return $query->where('id_utilisateur', $userId);
                })
            ],
            'mot_de_passe' => 'required|string|min:8',
            'villes_id_ville' => 'required|integer|exists:villes,id_ville',
        ];
    }
}