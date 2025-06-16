import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { ArcElement, Chart, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend);

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: 'admin/dashboard',
    },
];

type UserStats = {
    role: string;
    count: number;
};

type Props = {
    userStats: UserStats[];
};

export default function AdminDashboard() {
    const { userStats = [] } = usePage<Props>().props; // ← kasih default array kosong

    const roles = userStats.map((item) => item.role);
    const counts = userStats.map((item) => item.count);

    const data = {
        labels: roles,
        datasets: [
            {
                label: 'Jumlah',
                data: counts,
                backgroundColor: ['#36A2EB', '#FF6384'],
                borderWidth: 1,
            },
        ],
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard admin" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <Pie data={data} />
                    </div>
                </div>
                <div className="mt-4">
                    <h2 className="text-xl font-semibold">Statistik Pengguna</h2>
                    <ul className="mt-2 space-y-2">
                        {userStats.map((stat) => (
                            <li key={stat.role} className="flex items-center justify-between rounded-lg bg-gray-100 p-2">
                                <span>{stat.role}</span>
                                <span>{stat.count}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                
            </div>
        </AppLayout>
    );
}
