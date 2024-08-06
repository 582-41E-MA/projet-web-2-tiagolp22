<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    use HasFactory;

    protected $table = 'photo';
    protected $primaryKey = 'id';
    protected $fillable = ['photos', 'voitures_id_voiture', 'ordre'];
    public $timestamps = false; 
    
    public function voiture()
    {
        return $this->belongsTo(Voiture::class, 'voitures_id_voiture', 'id_voiture');
    }
}