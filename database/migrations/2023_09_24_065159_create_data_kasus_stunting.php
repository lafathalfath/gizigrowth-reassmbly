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
        Schema::create('data_kasus_stunting', function (Blueprint $table) {
            $table->id(); //primary key for this table (auto increment)
            $table->bigInteger('id_daerah')->unsigned(); //foreign key
            $table->integer('tahun');
            $table->integer('jumlah_anak');
            $table->integer('jumlah_kasus_stunting');
            $table->timestamps();

            // foreign key constraint
            $table->foreign('id_daerah')->references('id')->on('daerah')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_kasus_stunting');
    }
};
