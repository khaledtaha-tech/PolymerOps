import { redirect } from 'next/navigation';import { isAdmin } from '@/lib/auth';import { AdminContent } from '@/components/admin-content';
export default async function Page(){if(!await isAdmin())redirect('/admin/login');return <AdminContent/>}
