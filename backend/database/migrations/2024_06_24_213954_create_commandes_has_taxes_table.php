<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommandesHasTaxesTable extends Migration
{
    public function up()
    {
        Schema::create('commandes_has_taxes', function (Blueprint $table) {
            $table->foreignId('commandes_id_commande')->constrained('commandes')->onDelete('cascade');
            $table->foreignId('taxes_id')->constrained('taxes')->onDelete('cascade');
            $table->primary(['commandes_id_commande', 'taxes_id']);
            $table->decimal('total_taxes', 10, 2)->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('commandes_has_taxes');
    }
}
