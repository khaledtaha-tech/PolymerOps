import { Catalog } from '@/components/catalog';import { isLocale } from '@/lib/i18n';import { notFound } from 'next/navigation';
export default async function Page({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();return <Catalog locale={locale} kind="software"/>}
