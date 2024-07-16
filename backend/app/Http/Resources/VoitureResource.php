<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;


class VoitureResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id_voiture' => $this->id_voiture,
            'modele' => $this->modele->nom_modele,
            'constructeur' => $this->modele->constructeur->nom_constructeur,
            'annee' => $this->annee,
            'couleur' => is_string($this->couleur) ? json_decode($this->couleur) : $this->couleur,
            'prix' => $this->prix,
            'kilometrage' => $this->kilometrage,
            'description' => is_string($this->description) ? json_decode($this->description) : $this->description,
            'photos' => $this->photos->map(function ($photo) {
                return [
                    'id_photo' => $photo->id_photo,
                    'photo_url' => asset(Storage::url($photo->photos)),
                ];
            }),
        ];
    }
}

