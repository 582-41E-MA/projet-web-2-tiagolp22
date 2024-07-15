<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pays extends Model
{
    use HasFactory;

    protected $table = 'pays';
    protected $primaryKey = 'id_pays';
    public $timestamps = false;

    protected $fillable = ['nom_pays'];
    protected $casts = [
        'nom_pays' => 'json',
    ];
    public function provinces()
    {
        return $this->hasMany(Province::class, 'pays_id', 'id_pays');
    }
}



