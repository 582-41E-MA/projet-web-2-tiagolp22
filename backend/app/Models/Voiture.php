<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voiture extends Model
{
    use HasFactory;

    protected $table = 'voitures'; 

    protected $primaryKey = 'id_voiture'; 
    
    public $timestamps = false;

    public $incrementing = true; 

    protected $keyType = 'int'; 

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

    protected $casts = [
        'couleur' => 'json', 
        'etat_vehicule' => 'json',
    ];

    public function modele()
    {
        return $this->belongsTo(Modele::class, 'modele_id', 'id_modele');
    }

    public function transmission()
    {
        return $this->belongsTo(Transmission::class, 'type_transmission_id', 'id_transmission');
    }

    public function groupeMotopropulseur()
    {
        return $this->belongsTo(GroupeMotopropulseur::class, 'groupe_motopropulseur_id', 'id_groupe_motopropulseur');
    }

    public function typeCarburant()
    {
        return $this->belongsTo(TypeCarburant::class, 'type_carburant_id', 'id_type_carburant');
    }

    public function carrosserie()
    {
        return $this->belongsTo(Carrosserie::class, 'carrosserie_id', 'id_carrosserie');
    }

    public function commande()
    {
        return $this->belongsTo(Commande::class, 'commandes_id_commande', 'id_commande');
    }
}