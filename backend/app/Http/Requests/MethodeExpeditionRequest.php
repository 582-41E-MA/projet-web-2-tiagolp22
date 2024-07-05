<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MethodeExpeditionRequest extends FormRequest
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
            'nom_methode_expedition' => ['required', 'json', Rule::unique('methodesexpedition')->ignore($this->methodeexpedition)],
            'prix_fixe' => ['required', 'numeric', 'min:0'],
            'description' => ['nullable', 'json'],
        ];
    }
}
