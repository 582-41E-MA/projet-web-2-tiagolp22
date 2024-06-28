<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Taxe;
use Illuminate\Database\Eloquent\Relations\Pivot;

class CommandeHasTaxe extends Pivot
{
    protected $table = 'commandes_has_taxes';
    public $timestamps = false;

    protected $fillable = ['commandes_id_commande', 'taxes_id'];

    public function commande()
    {
        return $this->belongsTo(Commande::class, 'commandes_id_commande');
    }

    public function taxe()
    {
        return $this->belongsTo(Taxes::class, 'taxes_id');
    }
}
