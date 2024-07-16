<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommandeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'utilisateur' => new UtilisateurResource($this->utilisateur),
            'voiture' => new VoitureResource($this->voiture),
            'date_commande' => $this->date_commande,
            'status' => new StatusResource($this->status),
        ];
    }
}
