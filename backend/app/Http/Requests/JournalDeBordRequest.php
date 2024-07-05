<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class JournalDeBordRequest extends FormRequest
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
        return [
            'date_heure' => ['required', 'date'],
            'type_action' => ['required', 'string', 'max:50'],
            'description' => ['required', 'string'],
            'utilisateur_id' => ['required', 'exists:utilisateurs,id_utilisateur'],
        ];
    }
}
