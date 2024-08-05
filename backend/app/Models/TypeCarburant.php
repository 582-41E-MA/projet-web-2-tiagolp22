<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeCarburant extends Model
{
    use HasFactory;

    protected $table = 'typescarburant';
    protected $primaryKey = 'id_type_carburant';
    protected $fillable = ['type_carburant', 'description'];
    public $timestamps = false;

    protected $casts = [
        'type_carburant' => 'array',
        'description' => 'array',
    ];
}
