<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataStunting extends Model
{
    use HasFactory;

    protected $table = 'data_kasus_stunting';
    protected $guarded = [];

    public function daerah(){
        return $this->belongsTo(Daerah::class, 'id_daerah');
    }
}
