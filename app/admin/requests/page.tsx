import { redirect } from 'next/navigation';import { isAdmin } from '@/lib/auth';import { AdminRequests } from '@/components/admin-requests';
export default async function Page(){if(!await isAdmin())redirect('/admin/login');return <AdminRequests/>}
