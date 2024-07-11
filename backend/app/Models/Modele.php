<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Modele extends Model
{
    use HasFactory;

    protected $table = 'modeles';
    protected $primaryKey = 'id_modele';
    protected $fillable = ['nom_modele', 'constructeur_id'];
    public $timestamps = false; 

    public function constructeur()
    {
        return $this->belongsTo(Constructeur::class, 'constructeur_id', 'id_constructeur');
    }

    public function voitures()
    {
        return $this->hasMany(Voiture::class, 'modele_id', 'id_modele');
    }
}
