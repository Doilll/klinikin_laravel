import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Show({ clinic, auth }: any) {
    const [selectedDate, setSelectedDate] = useState('');
    const [note, setNote] = useState('');

    const handleBookAppointment = () => {
        if(!auth.user) {
            alert('You must be logged in to book an appointment.');
            return;
        }
        router.post(
            route('appointments.store'),
            {
                appointment_time: selectedDate,
                clinic_id: clinic.id,
                notes: note,
            },
            {
                onSuccess: () => {
                    alert('Appointment booked successfully!');
                    setSelectedDate('');
                    setNote('');
                },
                onError: (errors) => {
                    console.log(errors); // Tambahin biar keliatan isi error-nya
                    if (errors && typeof errors === 'object') {
                        const firstError = Object.values(errors)[0];
                        alert(`Failed to book appointment: ${firstError}`);
                    } else {
                        alert('Failed to book appointment.');
                    }
                },
            },
        );
    };

    return (
        <>
            <Head title={clinic.name_klinik} />
            <div className='bg-slate-100'>
            <div className="mx-auto max-w-3xl px-4 py-10 bg-white shadow-lg">
                <img src={clinic.image} alt={clinic.name_klinik} className="mb-6 h-64 w-full rounded-lg object-cover" />
                <h1 className="mb-2 text-2xl font-bold">{clinic.name_klinik}</h1>
                <p className="mb-2 text-gray-700">{clinic.address}</p>
                <p className="mb-4 text-sm text-gray-500">BPJS: {clinic.accepted_bpjs ? '✅ Diterima' : '❌ Tidak diterima'}</p>
                <input
                    type="date"
                    className="mb-4 w-full rounded border border-gray-300 px-4 py-2"
                    placeholder="Select Date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    value={selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                />
                <textarea
                    className="mb-4 w-full rounded border border-gray-300 px-4 py-2"
                    placeholder="Additional Notes (optional)"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={4}
                ></textarea>
                <button onClick={handleBookAppointment} className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700">
                    Book Appointment
                </button>
            </div>
            </div>
        </>
    );
}
