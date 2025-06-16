<?php


namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Enums\UserRole;

class KlinikLoginController extends Controller
{
    public function showLoginForm()
    {
        return Inertia::render('auth/login-klinik', [
            'canResetPassword' => Route::has('password.request'),
        ]);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            if (Auth::user()->role === UserRole::Klinik) {
                return redirect()->intended('/dashboard-klinik');
            } else {
                Auth::logout();
                return back()->withErrors(['email' => 'Unauthorized role.']);
            }
        }

        return back()->withErrors([
            'email' => 'Invalid credentials.',
        ]);
    }
}

