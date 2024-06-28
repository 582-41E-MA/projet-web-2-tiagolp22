<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    use HasFactory;

    protected $table = 'commandes';
    protected $primaryKey = 'id_commande';
    protected $fillable = [
        'id_utilisateur', 'date_commande', 'prix_total', 'status_commande_id',
        'mode_paiement_id', 'mode_expedition_id', 'date_paiement', 'date_expedition',
        'commentaires'
    ];

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class, 'id_utilisateur', 'id_utilisateur');
    }

    public function status()
    {
        return $this->belongsTo(Status::class, 'status_commande_id', 'id_status');
    }

    public function methodePaiement()
    {
        return $this->belongsTo(MethodePaiement::class, 'mode_paiement_id', 'id_methode_paiement');
    }

    public function methodeExpedition()
    {
        return $this->belongsTo(MethodeExpedition::class, 'mode_expedition_id', 'id_methode_expedition');
    }

    public function voitures()
    {
        return $this->hasMany(Voiture::class, 'commandes_id_commande', 'id_commande');
    }

    public function taxes()
    {
        return $this->belongsToMany(Taxes::class, 'commandes_has_taxes', 'commandes_id_commande', 'taxes_id');
    }
}
