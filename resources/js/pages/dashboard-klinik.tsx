import { Head, useForm, usePage, router, Link } from '@inertiajs/react';
import SidebarKlinik from '@/components/sidebar-klinik';


export default function DashboardKlinik() {
    const { klinik } = usePage<any>().props;

    const { data, setData, patch, processing, errors } = useForm({
        name_klinik: klinik.name_klinik || '',
        address: klinik.address || '',
        phone: klinik.phone || '',
        city: klinik.city || '',
        accepted_bpjs: klinik.accepted_bpjs || false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('dashboard-klinik.update'));
    };

    const handleLogout = () => {
        if (confirm('Yakin mau keluar?')) {
            router.post(route('logout'), {}, {
                onSuccess: () => {
                    // Redirect to login page or show success message
                },
                onError: (error) => {
                    console.error('Logout failed:', error);
                },
            });
        }
    }
    return (
        <>
            <Head title="Dashboard Klinik" />

            <div className="flex min-h-screen bg-gray-100">
            <SidebarKlinik />
            <main className="flex-1 flex justify-center items-start py-12">
                <div className="mx-auto max-w-xl space-y-8 p-6 bg-white rounded-xl shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600 text-2xl font-bold">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    </span>
                    <h1 className="text-3xl font-extrabold text-gray-800">Profil Klinik</h1>
                </div>
                <form onSubmit={submit} className="space-y-5">
                    <div>
                    <label className="block font-semibold text-gray-700 mb-1">Nama Klinik</label>
                    <input
                        type="text"
                        className="w-full rounded-lg border border-gray-300 p-2 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition"
                        value={data.name_klinik}
                        onChange={(e) => setData('name_klinik', e.target.value)}
                    />
                    {errors.name_klinik && <div className="text-sm text-red-500 mt-1">{errors.name_klinik}</div>}
                    </div>

                    <div>
                    <label className="block font-semibold text-gray-700 mb-1">Alamat</label>
                    <input
                        type="text"
                        className="w-full rounded-lg border border-gray-300 p-2 focus:border-red-500 focus:ring-2 focus:ring-blue-100 transition"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                    />
                    {errors.address && <div className="text-sm text-red-500 mt-1">{errors.address}</div>}
                    </div>
                    <div>
                    <label className="block font-semibold text-gray-700 mb-1">Nomor Telepon</label>
                    <input
                        type="text"
                        className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                        value={data.phone || ''}
                        onChange={(e) => setData('phone', e.target.value)}
                    />
                    {errors.phone && <div className="text-sm text-red-500 mt-1">{errors.phone}</div>}
                    </div>
                    <div>
                    <label className="block font-semibold text-gray-700 mb-1">Kota</label>
                    <input
                        type="text"
                        className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                        value={data.city || ''}
                        onChange={(e) => setData('city', e.target.value)}
                    />
                    {errors.city && <div className="text-sm text-red-500 mt-1">{errors.city}</div>}
                    </div>
                    <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        className="h-5 w-5 accent-red-600"
                        checked={data.accepted_bpjs}
                        onChange={(e) => setData('accepted_bpjs', e.target.checked)}
                        id="accepted_bpjs"
                    />
                    <label htmlFor="accepted_bpjs" className="font-semibold text-gray-700 select-none">Menerima BPJS</label>
                    </div>
                    <div className="pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full rounded-lg bg-red-600 px-4 py-2 text-white font-semibold shadow hover:bg-red-700 transition disabled:opacity-60"
                    >
                        {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </button>
                    </div>
                </form>
                </div>
            </main>
            </div>
        </>
    );
}
