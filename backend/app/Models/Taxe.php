<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Taxes extends Model
{
    use HasFactory;

    protected $table = 'taxes';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = ['GST_HST', 'PST', 'provinces_id_province'];

    public function province()
    {
        return $this->belongsTo(Province::class, 'provinces_id_province', 'id_province');
    }

    public function commandes()
    {
        return $this->belongsToMany(Commande::class, 'commandes_has_taxes', 'taxes_id', 'commandes_id_commande');
    }
}
