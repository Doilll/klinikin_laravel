import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface Appointment {
    id: number;
    status: string;
    appointment_time: string;
    notes: string;
    clinic: {
        name_klinik: string;
        address: string;
    };
}

interface DashboardProps {
    appointments: Appointment[];
}

export default function Dashboard() {

    const { auth, appointments } = usePage<SharedData & DashboardProps>().props;

    const handleCancel = (id: number) => {
        if (!confirm('Yakin mau batalkan appointment ini?')) return;

        router.delete(route('appointments.destroy', id), {
            onSuccess: () => {
                // reload halaman
                router.reload();
            },
            onError: (err) => {
                console.error(err);
                alert('Gagal membatalkan appointment');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="mb-4 text-2xl font-bold">Selamat datang, {auth.user.name}</h1>

                <h2 className="mb-2 text-xl font-semibold">Appointment Kamu</h2>
                {(appointments?.length ?? 0) === 0 ? (
                    <p className="text-gray-500">Belum ada appointment.</p>
                ) : (
                    <ul className="space-y-4">
                        {appointments.map((appt) => (
                            <li key={appt.id} className="rounded-lg border p-4 shadow-sm">
                                <p className="text-lg font-semibold">{appt.clinic.name_klinik}</p>
                                <p className="text-sm text-gray-600">{appt.clinic.address}</p>
                                <p className="mt-1 text-sm">Jadwal: {new Date(appt.appointment_time).toLocaleString()}</p>
                                <p className="mt-1 text-sm">Catatan: {appt.notes || 'Tidak ada catatan'}</p>
                                <p className="mt-1 text-sm">
                                    Status: <span className="font-medium">{appt.status}</span>
                                </p>
                                {appt.status === 'pending' && (
                                    <button
                                        onClick={() => handleCancel(appt.id)}
                                        className="mt-2 rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                                    >
                                        Batalkan
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </AppLayout>
    );
}
