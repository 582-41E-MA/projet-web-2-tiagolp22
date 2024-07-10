<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    use HasFactory;

    protected $table = 'photo';
    protected $primaryKey = 'id';
    public $timestamps = false; 

    protected $fillable = ['voitures_id_voiture', 'photos', 'ordre'];

    public function voiture()
    {
        return $this->belongsTo(Voiture::class, 'voitures_id_voiture', 'id_voiture');
    }
}