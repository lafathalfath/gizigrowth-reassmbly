<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// use Kyslik\ColumnSortable\Sortable;

class lokasi extends Model
{
    use HasFactory;
    // use Sortable;

    protected $table = 'lokasi';
    protected $guarded = [];

    // public $sortable = ['nama_lokasi'];
}
