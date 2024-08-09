<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MethodePaiement extends Model
{
    use HasFactory;

    protected $table = 'methodespaiement';
    protected $primaryKey = 'id_methode_paiement';
    protected $fillable = ['nom_methode_paiement', 'description'];
    
}
