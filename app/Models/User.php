<?php

namespace App\Models;

use App\Enums\UserRole;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Clinic;
use App\Models\Appointment;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'role' => UserRole::class,
        ];
    }

    // Relasi
    public function managedClinics()
    {
        return $this->hasOne(Clinic::class, 'admin_id');
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    // Helper role check
    public function isClinicAdmin(): bool
    {
        return $this->role === UserRole::ClinicAdmin;
    }

    public function isSuperAdmin(): bool
    {
        return $this->role === UserRole::SuperAdmin;
    }

    public function isPatient(): bool
    {
        return $this->role === UserRole::Patient;
    }

    public function klinik()
    {
        return $this->hasOne(Clinic::class, 'admin_id');
    }

}
