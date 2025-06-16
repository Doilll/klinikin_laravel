import SidebarKlinik from '@/components/sidebar-klinik';
import { Head, router, usePage } from '@inertiajs/react';

export default function PasienPage() {
    const { appointments } = usePage().props as any;

    const mapStatus = (status: string) => {
        switch (status) {
            case 'pending':
            case 'accepted':
            case 'rejected':
            case 'completed':
                return status;
            case 'selesai':
                return 'completed';
            case 'batal':
                return 'rejected';
            default:
                return status;
        }
    };

    const updateAppointmentStatus = (id: number, status: string, currentStatus: string) => {
        if (currentStatus === 'rejected') {
            alert('Status appointment yang sudah dibatalkan tidak bisa diubah.');
            return;
        }
        if (currentStatus === 'completed') {
            alert('Status appointment yang sudah selesai tidak bisa diubah.');
            return;
        }
        if (!confirm(`Yakin mau mengubah status appointment ini menjadi ${status}?`)) return;

        router.patch(
            route('klinik.pasien.update', id),
            { status: mapStatus(status) },
            {
                onSuccess: () => {
                    router.reload();
                },
                onError: (err) => {
                    console.error(err);
                    alert('Gagal mengubah status appointment');
                },
            },
        );
    };

    // Map backend status to frontend label
    const statusLabel = (status: string) => {
        switch (status) {
            case 'pending':
                return 'pending';
            case 'accepted':
                return 'accepted';
            case 'rejected':
                return 'batal';
            case 'completed':
                return 'selesai';
            default:
                return status;
        }
    };

    return (
        <>
            <Head title="Daftar Pasien" />
            <div className="flex min-h-screen bg-gray-100">
                <SidebarKlinik />
                <main className="flex-1 p-8">
                    <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-md">
                        <h1 className="mb-6 text-3xl font-bold text-red-700">Manajemen Pasien</h1>
                        {appointments.length === 0 ? (
                            <div className="flex flex-col items-center py-12">
                                <svg className="mb-4 h-16 w-16 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-lg text-gray-500">Belum ada appointment.</p>
                            </div>
                        ) : (
                            <ul className="space-y-6">
                                {appointments.map((appt: any) => (
                                    <li key={appt.id} className="rounded-lg border border-red-100 bg-red-50 p-6 shadow-sm transition hover:shadow">
                                        <div className="mb-2 flex items-center justify-between">
                                            <span className="text-lg font-semibold text-slate-800">{appt.user.name}</span>
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                    statusLabel(appt.status) === 'selesai'
                                                        ? 'bg-green-100 text-green-700'
                                                        : statusLabel(appt.status) === 'batal'
                                                          ? 'bg-red-100 text-red-700'
                                                          : 'bg-yellow-100 text-yellow-700'
                                                }`}
                                            >
                                                {statusLabel(appt.status)}
                                            </span>
                                        </div>
                                        <div className="mb-2 text-gray-600">
                                            <p>
                                                <strong>Waktu:</strong> {appt.appointment_time}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700 disabled:opacity-50"
                                                disabled={appt.status === 'rejected' || appt.status === 'completed'}
                                                onClick={() => updateAppointmentStatus(appt.id, 'selesai', statusLabel(appt.status))}
                                            >
                                                Tandai Selesai
                                            </button>
                                            <button
                                                className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700 disabled:opacity-50"
                                                disabled={appt.status === 'rejected' || appt.status === 'completed'}
                                                onClick={() => updateAppointmentStatus(appt.id, 'batal', statusLabel(appt.status))}
                                            >
                                                Batalkan
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}
