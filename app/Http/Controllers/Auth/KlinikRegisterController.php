<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Enums\UserRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class KlinikRegisterController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('auth/register-klinik');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users'],
            'password' => ['required', 'confirmed', 'min:8'],
            'name_klinik' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:15'],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => UserRole::Klinik, 
        ]);

        $user->klinik()->create([
            'name_klinik' => $request->name_klinik,
            'address' => $request->address,
            'city' => $request->city,
            'phone' => $request->phone,
        ]);

        Auth::login($user);

        return redirect()->route('klinik.dashboard');
    }
}
