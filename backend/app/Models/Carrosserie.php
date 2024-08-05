<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Carrosserie extends Model
{
    use HasFactory;

    protected $table = 'carrosseries';
    protected $primaryKey = 'id_carrosserie';
    protected $fillable = ['type_carrosserie', 'description'];
    public $timestamps = false; 

}
