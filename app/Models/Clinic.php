<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Appointment;

class Clinic extends Model
{
    protected $fillable = ['name_klinik', 'address', 'phone', 'admin_id', 'accepted_bpjs', 'image', 'city'];

    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_id');
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }
}

