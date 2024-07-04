<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voiture extends Model
{
    use HasFactory;

    protected $fillable = [
        'modele_id',
        'annee',
        'date_arrivee',
        'prix_achat',
        'prix_vente',
        'couleur',
        'type_transmission_id',
        'groupe_motopropulseur_id',
        'type_carburant_id',
        'carrosserie_id',
        'nombre_portes',
        'nombre_places',
        'kilometrage',
        'description',
        'etat_vehicule',
        'commandes_id_commande',
    ];

    protected $primaryKey = 'id_voiture';
    public $incrementing = false;
    protected $keyType = 'string';

    public function modele()
    {
        return $this->belongsTo(Modele::class, 'modele_id', 'id_modele');
    }

}
