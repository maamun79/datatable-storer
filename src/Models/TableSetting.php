<?php

namespace SmartDev\DatatableStorer\Models;

use Illuminate\Database\Eloquent\Model;

class TableSetting extends Model
{
    protected $fillable = ['user_id', 'table_identifier', 'settings'];

    protected $casts = [
        'settings' => 'array',
    ];
}