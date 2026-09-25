import { Pool } from 'pg';
let pool: Pool | undefined;
export function database() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required');
  if (!pool) pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 5 });
  return pool;
}
export type ContentKind = 'service' | 'software' | 'material' | 'insight';
export type Content = { id: number; kind: ContentKind; slug: string; title_ar: string; title_en: string; summary_ar: string; summary_en: string; body_ar: string; body_en: string; category_ar: string; category_en: string; status: string; image_url: string; updated_at: string };
export async function getContent(kind: ContentKind, includeDraft = false): Promise<Content[]> {
  if (!process.env.DATABASE_URL) return [];
  const result = await database().query<Content>(`SELECT * FROM content WHERE kind = $1 ${includeDraft ? '' : "AND status <> 'draft'"} ORDER BY updated_at DESC`, [kind]);
  return result.rows;
}
export async function getItem(kind: ContentKind, slug: string): Promise<Content | null> {
  if (!process.env.DATABASE_URL) return null;
  const result = await database().query<Content>("SELECT * FROM content WHERE kind=$1 AND slug=$2 AND status <> 'draft' LIMIT 1", [kind, slug]);
  return result.rows[0] ?? null;
}
export async function getBrand(): Promise<string> {
  if (!process.env.DATABASE_URL) return 'PolymerOps Hub';
  const result = await database().query<{value:string}>("SELECT value FROM settings WHERE key='brand_name'");
  return result.rows[0]?.value || 'PolymerOps Hub';
}
