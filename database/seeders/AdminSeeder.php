<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Enums\UserRole; // Assuming UserRole is an enum defined in App\Enums\UserRole
use Illuminate\Support\Facades\Hash; // Import Hash facade for password hashing

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        User::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make("123456789"), // Use bcrypt for hashing the password
            'role' => UserRole::Admin, // Assuming UserRole is an enum
        ]);
    }
}
