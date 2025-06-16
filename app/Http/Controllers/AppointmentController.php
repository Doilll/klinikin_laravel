<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Appointment;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $appointments = auth()->user()->appointments()->with('clinic')->get();

        return Inertia::render('dashboard', [
            'appointments' => $appointments,
            'auth' => [
            'user' => auth()->user()
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'clinic_id' => 'required|exists:clinics,id',
            'appointment_time' => 'required|date|after:now',
            'notes' => 'nullable|string',
        ]);

        $appointment = Appointment::create([
            'user_id' => auth()->id(),
            'clinic_id' => $validated['clinic_id'],
            'appointment_time' => $validated['appointment_time'],
            'notes' => $validated['notes'] ?? null,
        ]);

        return redirect()->back()->with('success', 'Appointment berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
    $appointment = Appointment::where('id', $id)
        ->where('user_id', auth()->id())
        ->firstOrFail();

    $appointment->delete();

    

    return redirect()->back()->with('success', 'Appointment berhasil dibatalkan');
    }


    public function showUserAppointments()
    {
        
    }
}
