<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vehiculo extends Model
{
    protected $fillable = [
        'placa',
        'tipo',
        'tarifa',
        'hora_ingreso',
        'hora_salida',
        'total_pago,'
    ];
}
