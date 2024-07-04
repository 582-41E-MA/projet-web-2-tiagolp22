<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    use HasFactory;

    protected $table = 'provinces';
    protected $primaryKey = 'id_province';
    public $timestamps = false;

    protected $fillable = ['nom_province', 'pays_id'];

    public function pays()
    {
        return $this->belongsTo(Pays::class, 'pays_id', 'id_pays');
    }

    public function villes()
    {
        return $this->hasMany(Ville::class, 'province_id', 'id_province');
    }

    public function taxes()
    {
        return $this->hasMany(Taxe::class, 'provinces_id_province', 'id_province');
    }
}
