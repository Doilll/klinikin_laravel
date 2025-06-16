<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Appointment;
use Inertia\Inertia;

class KlinikDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard-klinik', [
            'klinik' => auth()->user()->klinik,
            'auth' => [
                'user' => auth()->user(),
            ]
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'name_klinik' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'phone' => 'nullable|string|max:15',
            'city' => 'nullable|string|max:100',
            'accepted_bpjs' => 'boolean',
        ]);

        $klinik = auth()->user()->klinik;
        $klinik->name_klinik = $request->name_klinik;
        $klinik->address = $request->address;
        $klinik->phone = $request->phone;
        $klinik->city = $request->city;
        $klinik->accepted_bpjs = $request->accepted_bpjs ? true : false;
        $klinik->save();

        return back()->with('success', 'Profil klinik diperbarui');
    }

    public function listAppointments()
    {
        $clinic = auth()->user()->klinik;

        $appointments = Appointment::with(['user'])
            ->where('clinic_id', $clinic->id)
            ->orderBy('appointment_time', 'asc')
            ->get();

        return Inertia::render('klinik/pasien', [
            'appointments' => $appointments,
            'auth' => [
                'user' => auth()->user(),
            ]
        ]);
    }

    public function updateAppointmentStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,accepted,rejected,completed',
        ]);

        $appointment = Appointment::where('id', $id)
            ->where('clinic_id', auth()->user()->klinik->id)
            ->firstOrFail();

        $appointment->status = $request->status;
        $appointment->save();

        return back()->with('success', 'Status berhasil diperbarui.');
    }


}
