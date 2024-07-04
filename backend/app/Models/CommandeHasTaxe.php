<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Commande;
use App\Models\Taxe;
use Illuminate\Database\Eloquent\Relations\Pivot;

class CommandeHasTaxe extends Pivot
{
    use HasFactory;

    protected $table = 'commandes_has_taxes';
    public $timestamps = false;

    protected $fillable = ['commandes_id_commande', 'taxes_id', 'total_taxes'];

    public function commande()
    {
        return $this->belongsTo(Commande::class, 'commandes_id_commande', 'id_commande');
    }

    public function taxe()
    {
        return $this->belongsTo(Taxe::class, 'taxes_id', 'id');
    }
}
