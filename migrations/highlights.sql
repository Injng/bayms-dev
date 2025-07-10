CREATE TABLE highlights (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    recording_url TEXT NOT NULL
);

-- RLS POLICY 1
CREATE POLICY "Enable read access for all users"
ON "public"."highlights"
FOR SELECT TO public USING (
  true
);

-- RLS POLICY 2
CREATE POLICY "Allow authorized update access"
ON "public"."highlights"
FOR UPDATE TO authenticated USING (
  (SELECT authorize('highlights.update'))
);

-- RLS POLICY 3
CREATE POLICY "Allow authorized insert access"
ON "public"."highlights"
FOR INSERT TO authenticated WITH CHECK (
  (SELECT authorize('highlights.insert'))
);

-- RLS POLICY 4
CREATE POLICY "Allow authorized delete access"
ON "public"."highlights"
FOR DELETE TO authenticated USING (
  (SELECT authorize('highlights.delete'))
);
