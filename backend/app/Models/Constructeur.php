<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Constructeur extends Model
{
    use HasFactory;

    protected $table = 'constructeurs';
    protected $primaryKey = 'id_constructeur';
    protected $fillable = ['nom_constructeur', 'pays_origine'];
    public $timestamps = false;

    public function modeles()
    {
        return $this->hasMany(Modele::class, 'constructeur_id', 'id_constructeur');
    }
}
