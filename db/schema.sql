CREATE TABLE IF NOT EXISTS settings (key text PRIMARY KEY, value text NOT NULL);
CREATE TABLE IF NOT EXISTS content (
 id bigserial PRIMARY KEY, kind text NOT NULL CHECK (kind IN ('service','software','material','insight')),
 slug text NOT NULL, title_ar text NOT NULL, title_en text NOT NULL,
 summary_ar text NOT NULL DEFAULT '', summary_en text NOT NULL DEFAULT '',
 body_ar text NOT NULL DEFAULT '', body_en text NOT NULL DEFAULT '',
 category_ar text NOT NULL DEFAULT '', category_en text NOT NULL DEFAULT '',
 status text NOT NULL DEFAULT 'published' CHECK (status IN ('published','draft','available','coming-soon','on-request')),
 image_url text NOT NULL DEFAULT '', updated_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE (kind, slug)
);
CREATE TABLE IF NOT EXISTS requests (
 id bigserial PRIMARY KEY, type text NOT NULL CHECK (type IN ('consulting','quote','demo','material','factory-talent','candidate','contact')),
 locale text NOT NULL CHECK (locale IN ('ar','en')), name text NOT NULL, email text NOT NULL,
 phone text NOT NULL DEFAULT '', company text NOT NULL DEFAULT '', line_type text NOT NULL DEFAULT '',
 subject text NOT NULL DEFAULT '', challenge text NOT NULL DEFAULT '', deliverables text NOT NULL DEFAULT '',
 location text NOT NULL DEFAULT '', experience text NOT NULL DEFAULT '',
 resume_url text NOT NULL DEFAULT '', consent boolean NOT NULL DEFAULT false,
 status text NOT NULL DEFAULT 'new' CHECK (status IN ('new','reviewing','closed')),
 created_at timestamptz NOT NULL DEFAULT now()
);
INSERT INTO settings (key,value) VALUES ('brand_name','PolymerOps Hub') ON CONFLICT (key) DO NOTHING;
CREATE TABLE IF NOT EXISTS request_files (
 id bigserial PRIMARY KEY, request_id bigint NOT NULL REFERENCES requests(id) ON DELETE CASCADE,
 filename text NOT NULL, mime_type text NOT NULL, file_data bytea NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now()
);
