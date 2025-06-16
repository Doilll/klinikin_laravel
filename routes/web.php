<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\KlinikRegisterController;
use App\Http\Controllers\ClinicController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\KlinikDashboardController;
use App\Http\Controllers\Auth\KlinikLoginController;
use App\Http\Controllers\DashboardAdminController;



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/', [ClinicController::class, 'index'])->name('home');

Route::get('/klinik/{id}', [ClinicController::class, 'show'])->name('klinik.show');

Route::get('admin/dashboard', [DashboardAdminController::class, 'index'])->middleware(['auth', 'verified', 'role:admin'])->name('admin.dashboard');

Route::middleware(['auth', 'role:klinik'])->group(function () {
    Route::get('/dashboard-klinik', [KlinikDashboardController::class, 'index'])->name('dashboard-klinik');
    Route::patch('/dashboard-klinik', [KlinikDashboardController::class, 'update'])->name('dashboard-klinik.update');
    Route::get('/dashboard-klinik/pasien', [KlinikDashboardController::class, 'listAppointments'])->name('klinik.pasien');
    Route::patch('/dashboard-klinik/pasien/{id}', [KlinikDashboardController::class, 'updateAppointmentStatus'])->name('klinik.pasien.update');
});

Route::middleware(['auth'])->group(function () {
    Route::post('/appointments', [AppointmentController::class, 'store'])->name('appointments.store');
    Route::get('/dashboard', [AppointmentController::class, 'index'])->name('dashboard');
    Route::delete('/appointments/{id}', [AppointmentController::class, 'destroy'])->name('appointments.destroy');
});

Route::get('/register-klinik', [KlinikRegisterController::class, 'create'])->name('register-klinik');
Route::post('/register-klinik', [KlinikRegisterController::class, 'store']);

Route::get('/login-klinik', [KlinikLoginController::class, 'showLoginForm'])->name('login.klinik');
Route::post('/login-klinik', [KlinikLoginController::class, 'login']);



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
