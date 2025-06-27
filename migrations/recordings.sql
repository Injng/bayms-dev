CREATE TABLE recordings (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    recording_url TEXT NOT NULL,
    event_id INT NOT NULL,
    FOREIGN KEY (event_id) REFERENCES events (id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- RLS POLICY 1
CREATE POLICY "Enable read access for all users"
ON "public"."recordings"
FOR SELECT TO public USING (
  true
);

-- RLS POLICY 2
CREATE POLICY "Allow authorized update access"
ON "public"."recordings"
FOR UPDATE TO authenticated USING (
  (SELECT authorize('recordings.update'))
);

-- RLS POLICY 3
CREATE POLICY "Allow authorized insert access"
ON "public"."recordings"
FOR INSERT TO authenticated WITH CHECK (
  (SELECT authorize('recordings.insert'))
);

-- RLS POLICY 4
CREATE POLICY "Allow authorized delete access"
ON "public"."recordings"
FOR DELETE TO authenticated USING (
  (SELECT authorize('recordings.delete'))
);
