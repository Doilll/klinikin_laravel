import { Link, router } from '@inertiajs/react';

export default function SidebarKlinik() {
    const handleLogout = () => {
        if (confirm('Yakin mau keluar?')) {
            router.post(
                route('logout'),
                {},
                {
                    onSuccess: () => {
                        // Redirect to login page or show success message
                    },
                    onError: (error) => {
                        console.error('Logout failed:', error);
                    },
                },
            );
        }
    };

    return (
        <aside className="flex w-64 flex-col gap-6 bg-white p-6 shadow-lg">
            <div className="mb-8 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-2xl font-bold text-red-600">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                </span>
                <span className="text-xl font-bold text-gray-800">Klinik</span>
            </div>
            <nav className="flex flex-col gap-3">
                
                <Link
                    href={route('dashboard-klinik')}
                    className="rounded bg-red-50 px-3 py-2 font-semibold text-slate-700 transition hover:bg-red-100"
                >
                    Dashboard
                </Link>
                <Link href={route('klinik.pasien')} 
                className="rounded bg-red-50 px-3 py-2 font-semibold text-slate-700 transition hover:bg-red-100">
                    Pasien
                </Link>
            
                
                <button onClick={handleLogout} className="rounded px-3 py-2 text-red-600 transition hover:bg-red-200 hover:text-red-800">
                    Keluar
                </button>
                
            </nav>
        </aside>
    );
}
