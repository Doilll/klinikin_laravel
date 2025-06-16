import ClinicCard from '@/components/clinic-card';
import FaqCard from '@/components/faq-card';
import Footer from '@/components/footer';
import { type Clinic, type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface PublicHomePageProps {
    clinics: Clinic[];
    cities?: string[];
    filters?: {
        search?: string;
        kota?: string;
        [key: string]: unknown;
    };
    [key: string]: unknown; // biar dia lolos constraint PageProps
}

export default function Home() {
    const { auth } = usePage<SharedData>().props;
    const { clinics, cities, filters } = usePage<PublicHomePageProps>().props;
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('home'), {
            search: searchQuery, // Ubah key-nya jadi 'search'
            kota: selectedCity, // dan 'kota'
        });
    };

    useEffect(() => {
        setSearchQuery(filters?.search || '');
        setSelectedCity(filters?.kota || '');
    }, [filters]);

    return (
        <>
            <Head title="Home">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="">
                <header className="">
                    <nav className="flex items-center justify-between rounded-lg bg-white px-6 py-4 shadow-md">
                        <Link href={route('home')} className="font text-2xl font-extrabold tracking-tight text-red-600">
                            Klinikin
                        </Link>
                        <form onSubmit={handleSubmit} className="flex items-center gap-4">
                            <input
                                type="text"
                                placeholder="Cari klinik..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-64 rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                            />
                            <select
                                value={selectedCity}
                                onChange={(e) => setSelectedCity(e.target.value)}
                                className="rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                            >
                                <option value="">Pilih Kota</option>
                                {cities?.map((city) => (
                                    <option key={city} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                            <button type="submit" className="rounded bg-red-500 px-4 py-2 text-white transition hover:bg-red-700">
                                Cari
                            </button>
                        </form>
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                auth.user.role === 'admin' ? (
                                    <Link href={route('admin.dashboard')} className="rounded-md bg-red-500 px-4 py-2 text-white transition hover:bg-red-700">
                                        Admin Dashboard
                                    </Link>
                                ) : auth.user.role === 'klinik' ? (
                                    <Link href={route('dashboard-klinik')} className="rounded-md bg-red-500 px-4 py-2 text-white transition hover:bg-red-700">
                                        Klinik Dashboard
                                    </Link>
                                ) : (
                                    <Link href={route('dashboard')} className="rounded-md bg-red-500 px-4 py-2 text-white transition hover:bg-red-700">
                                        Dashboard
                                    </Link>
                                )
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="rounded-md border-2 border-red-500 px-4 py-2 text-red-600 transition hover:bg-blue-50"
                                    >
                                        Log in
                                    </Link>
                                    <Link href={route('register')} className="rounded-md bg-red-500 px-4 py-2 text-white transition hover:bg-red-700">
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                <div className="flex flex-col items-center"></div>
                <div className="flex h-40 items-center justify-center bg-gradient-to-tl from-red-500 to-red-900 text-white shadow-lg">
                    <h1 className="text-3xl font-bold">Selamat Datang di Klinikin</h1>
                </div>

                <div className="flex flex-col items-center">
                    <div className="mx-20 my-5 flex w-[80%] flex-col items-center rounded-xl border-2 border-slate-200 pt-5 pb-5">
                        <h1 className="text-lg font-bold">Rekomendasi Klinik</h1>
                        {/* <div className='flex flex-col items-center w-full'> */}
                        <div className="flex w-full flex-col items-center">
                            <main className="flex flex-row gap-6">
                                {clinics.map((clinic) => {
                                    return (
                                        <ClinicCard
                                            key={clinic.id}
                                            id={clinic.id}
                                            namaKlinik={clinic.name_klinik}
                                            address={clinic.address}
                                            image={clinic.image}
                                            acceptedBPJS={clinic.accepted_bpjs}
                                        />
                                    );
                                })}
                            </main>
                        </div>
                    </div>
                                            <div className="mx-auto max-w-3xl text-sm">
                            {/* FAQ Item 1 */}
                            <FaqCard
                                question={'Bagaimana Klinikin merekomendasikan klinik?'}
                                answer="Klinikin menggunakan data lokasi, preferensi, dan ulasan pengguna untuk memberikan rekomendasi klinik yang sesuai. Algoritma kami mempertimbangkan jarak, spesialisasi, ketersediaan, dan penilaian pengguna dalam memberikan rekomendasi terbaik."
                            />
                            {/* FAQ Item 2 */}
                            <FaqCard
                                question={'Apakah saya bisa membuat janji melalui Klinikin?'}
                                answer="Ya, Anda bisa membuat janji langsung melalui platform kami. Setelah menemukan klinik yang sesuai, Anda dapat melihat ketersediaan jadwal dan melakukan pemesanan dengan mudah. Konfirmasi akan dikirim melalui email dan SMS."
                            />
                            {/* FAQ Item 3 */}
                            <FaqCard
                                question={'Bagaimana cara mengakses rekam medis saya?'}
                                answer="Anda dapat mengakses rekam medis melalui profil pengguna setelah masuk ke akun Anda. Jika klinik telah terintegrasi dengan Klinikin, Anda bisa melihat riwayat kunjungan, resep, dan hasil tes medis."
                            />
                            {/* FAQ Item 4 */}
                            <FaqCard
                                question={'Apakah informasi kesehatan saya aman di Klinikin?'}
                                answer="Ya, kami sangat menjaga keamanan data Anda. Semua informasi kesehatan dienkripsi dan disimpan dengan standar keamanan yang tinggi sesuai dengan peraturan privasi kesehatan."
                            />
                            {/* FAQ Item 5 */}
                            <FaqCard
                                question={'Apa yang harus saya lakukan jika saya mengalami masalah?'}
                                answer="Jika Anda mengalami masalah, Anda dapat menghubungi tim dukungan pelanggan kami melalui fitur 'Bantuan' di aplikasi atau situs web. Kami siap membantu Anda 24/7."
                            />
                            <FaqCard
                                question={'Bisakah saya memberikan ulasan untuk klinik yang saya kunjungi?'}
                                answer="Kami sangat mendorong pengguna untuk berbagi pengalaman dengan memberikan ulasan mengenai klinik yang telah dikunjungi. Ulasan Anda membantu pengguna lain dalam membuat keputusan yang lebih baik."
                            />
                        </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
