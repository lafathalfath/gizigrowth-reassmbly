<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataPangan extends Model
{
    use HasFactory;

    protected $table = 'data_ketahanan_pangan';
    protected $guarded = [];
}
