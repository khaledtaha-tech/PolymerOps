import { redirect } from 'next/navigation';import { isAdmin } from '@/lib/auth';import { AdminDashboard } from '@/components/admin-dashboard';
export default async function Page(){if(!await isAdmin())redirect('/admin/login');return <AdminDashboard/>}
