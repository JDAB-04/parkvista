<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VehiculoController;

Route::get('/vehiculos', [VehiculoController::class, 'index']);
Route::post('/vehiculos', [VehiculoController::class, 'store']);
Route::post('/vehiculos/salida', [VehiculoController::class, 'registrarSalidaPorPlaca']);
