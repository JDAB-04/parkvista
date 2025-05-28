<?php

namespace App\Http\Controllers;
use App\Models\Vehiculo;
use Illuminate\Http\Request;
use Carbon\Carbon;


class VehiculoController extends Controller
{
    public function index(){
        return Vehiculo::orderByDesc('created_at')->get();
    }

    public function store(Request $request){
        $request->validate([
            'placa' => 'required|unique:vehiculos',
            'tipo' => 'required|in:carro,moto',
        ]);

        $tarifa = $request->tipo === 'carro' ? 2000 : 1000;

        $vehiculo = Vehiculo::create([
            'placa' => strtoupper($request->placa),
            'tipo' => $request->tipo,
            'tarifa' => $tarifa,
            'hora_ingreso' => now(),
        ]);

        return response()->json($vehiculo, 201);
    }

    public function registrarSalidaPorPlaca(Request $request)
    {
        $placa = strtoupper($request->input('placa'));
        $vehiculo = Vehiculo::where('placa', $placa)->first();

        if (!$vehiculo) {
            return response()->json(['error' => 'Vehículo no encontrado'], 404);
        }

        if ($vehiculo->hora_salida){
            return response()->json(['error' => 'El vehículo ya ha salido'], 400);
        }

        $salida = now();
        $minutos = $salida->diffInMinutes(new Carbon($vehiculo->hora_ingreso));
        $tarifaPorMinuto = $vehiculo->tarifa / 60;
        $total = round($tarifaPorMinuto * $minutos, 2);

        $vehiculo->hora_salida = $salida;
        $vehiculo->total_pago = $total;
        $vehiculo->save();

        return response()->json($vehiculo);
    }
}
