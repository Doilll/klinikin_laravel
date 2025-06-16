<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('clinics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('admin_id')->nullable()->constrained('users')->onDelete('set null');
            $table->string('name_klinik');
            $table->boolean('accepted_bpjs')->default(false);
            $table->string('image')->default('https://placehold.co/600x400.png');
            $table->text('address')->nullable();
            $table->string('city')->nullable();
            $table->string('phone')->nullable();
            $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clinics');
    }
};
