<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id('id_reservation');
            $table->integer('id_voiture');
            $table->integer('id_utilisateur'); 
            $table->date('date_reservation');
            $table->string('status');
            $table->timestamps();

            $table->foreign('id_voiture')->references('id_voiture')->on('voitures')->onDelete('cascade');
            $table->foreign('id_utilisateur')->references('id_utilisateur')->on('utilisateurs')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reservations');
    }
};