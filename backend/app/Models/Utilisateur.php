<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Utilisateur extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'utilisateurs';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id_utilisateur';

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = true;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'prenom', 'nom', 'date_naissance', 'adresse', 'code_postal',
        'numero_telephone', 'numero_portable', 'courriel',
        'privileges_id', 'nom_utilisateur', 'mot_de_passe',
        'derniere_connexion', 'villes_id_ville'
    ];
    public $timestamps = false;
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'mot_de_passe',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date_naissance' => 'date',
        'derniere_connexion' => 'datetime',
    ];

    public function ville()
    {
        return $this->belongsTo(Ville::class, 'villes_id_ville', 'id_ville');
    }

    public function privilege()
    {
        return $this->belongsTo(Privilege::class, 'privileges_id', 'id_privilege');
    }

    public function commandes()
    {
        return $this->hasMany(Commande::class, 'id_utilisateur', 'id_utilisateur');
    }

    public function journalDeBord()
    {
        return $this->hasMany(JournalDeBord::class, 'utilisateur_id', 'id_utilisateur');
    }
}
