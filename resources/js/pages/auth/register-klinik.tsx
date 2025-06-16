import { Head, useForm, Link } from '@inertiajs/react';

export default function RegisterKlinik() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        name_klinik: '',
        phone: '',
        city: '',
        address: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/register-klinik');
    };

    return (
        <>
            <Head title="Register Klinik" />
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                    <h1 className="mb-6 text-center text-2xl font-bold text-red-700">Register Klinik</h1>
                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full rounded border px-3 py-2 focus:ring-2 focus:ring-red-400 focus:outline-none"
                                autoComplete="name"
                            />
                            {errors.name && <div className="mt-1 text-xs text-red-500">{errors.name}</div>}
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full rounded border px-3 py-2 focus:ring-2 focus:ring-red-400 focus:outline-none"
                                autoComplete="email"
                            />
                            {errors.email && <div className="mt-1 text-xs text-red-500">{errors.email}</div>}
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="w-full rounded border px-3 py-2 focus:ring-2 focus:ring-red-400 focus:outline-none"
                                autoComplete="new-password"
                            />
                            {errors.password && <div className="mt-1 text-xs text-red-500">{errors.password}</div>}
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className="w-full rounded border px-3 py-2 focus:ring-2 focus:ring-red-400 focus:outline-none"
                                autoComplete="new-password"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Nama Klinik</label>
                            <input
                                type="text"
                                value={data.name_klinik}
                                onChange={(e) => setData('name_klinik', e.target.value)}
                                className="w-full rounded border px-3 py-2 focus:ring-2 focus:ring-red-400 focus:outline-none"
                            />
                            {errors.name_klinik && <div className="mt-1 text-xs text-red-500">{errors.name_klinik}</div>}
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Phone</label>
                            <input
                                type="text"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                className="w-full rounded border px-3 py-2 focus:ring-2 focus:ring-red-400 focus:outline-none"
                            />
                            {errors.phone && <div className="mt-1 text-xs text-red-500">{errors.phone}</div>}
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">City</label>
                            <input
                                type="text"
                                value={data.city}
                                onChange={(e) => setData('city', e.target.value)}
                                className="w-full rounded border px-3 py-2 focus:ring-2 focus:ring-red-400 focus:outline-none"
                            />
                            {errors.city && <div className="mt-1 text-xs text-red-500">{errors.city}</div>}
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Address</label>
                            <input
                                type="text"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                className="w-full rounded border px-3 py-2 focus:ring-2 focus:ring-red-400 focus:outline-none"
                            />
                            {errors.address && <div className="mt-1 text-xs text-red-500">{errors.address}</div>}
                        </div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
                        >
                            Register
                        </button>
                        <div className="text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link href={route('login.klinik')} className="text-red-600 hover:underline">
                                Login here
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
