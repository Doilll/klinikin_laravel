<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use App\Enums\UserRole; // Pastikan enum UserRole sudah didefinisikan

class DashboardAdminController extends Controller
{
    public function index()
{
    $userStats = User::selectRaw('role, COUNT(*) as count')
        ->whereIn('role', [UserRole::User, UserRole::Klinik]) // atau sesuaikan enum stringnya
        ->groupBy('role')
        ->get()
        ->map(function ($item) {
        return [
            'role' => $item->role->value, // enum to string
            'count' => $item->count,
        ];
    });

    return Inertia::render('admin/dashboard', [
        'userStats' => $userStats,
    ]);
}
}
