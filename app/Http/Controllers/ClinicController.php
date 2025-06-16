<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Clinic;
use Inertia\Inertia;


class ClinicController extends Controller
{

   public function index(Request $request)
{
    $query = Clinic::query();

    if ($request->has('search')) {
        $query->where('name_klinik', 'like', '%' . $request->search . '%');
    }

    if ($request->has('kota') && $request->kota !== 'all') {
        $query->where('city', $request->kota);
    }

    $clinics = $query->get();
    $cities = Clinic::select('city')->distinct()->pluck('city');

    return Inertia::render('home', [
        'clinics' => $clinics,
        'cities' => $cities,
        'filters' => [
            'search' => $request->search,
            'kota' => $request->kota,
        ],
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $clinic = Clinic::findOrFail($id);

        return Inertia::render('klinik/show', [
            'clinic' => $clinic,
            'auth' => [
                'user' => auth()->user()
            ]
        ]);
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
    public function destroy(string $id)
    {
        //
    }

}
