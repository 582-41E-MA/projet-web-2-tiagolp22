<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $table = 'reservations';

    protected $primaryKey = 'id_reservation';

    public $timestamps = true;

    protected $fillable = [
        'id_voiture',
        'id_utilisateur',
        'date_reservation',
        'status',
    ];

    public function voiture()
    {
        return $this->belongsTo(Voiture::class, 'id_voiture', 'id_voiture');
    }

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class, 'id_utilisateur', 'id_utilisateur');
    }
}