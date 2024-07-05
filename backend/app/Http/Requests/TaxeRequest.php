<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TaxeRequest extends FormRequest
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
            'GST_HST' => ['required', 'numeric', 'min:0', 'max:100'],
            'PST' => ['required', 'numeric', 'min:0', 'max:100'],
            'provinces_id_province' => ['required', 'exists:provinces,id_province'],
        ];
    }
}
