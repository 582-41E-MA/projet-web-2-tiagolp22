<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupeMotopropulseur extends Model
{
    use HasFactory;

    protected $table = 'groupesmotopropulseurs';
    protected $primaryKey = 'id_groupe_motopropulseur';
    protected $fillable = ['type_groupe_motopropulseur', 'description'];
    public $timestamps = false; 
    
}