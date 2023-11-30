<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('data_ketahanan_pangan', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('id_lokasi')->unsigned(); // foreign key
            $table->bigInteger('id_daerah')->unsigned();
            $table->integer('tahun');
            $table->integer('ketersediaan_pangan');
            $table->string('jenis_pangan');
            $table->timestamps();

            // foreign key constraint
            $table->foreign('id_lokasi')->references('id')->on('lokasi')->onDelete('cascade');
            $table->foreign('id_daerah')->references('id')->on('daerah')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_ketahanan_pangan');
    }
};
