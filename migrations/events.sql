CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT
);

-- RLS POLICY 1
CREATE POLICY "Enable read access for all users"
ON "public"."locations"
FOR SELECT TO public USING (
  true
);

-- RLS POLICY 2
CREATE POLICY "Allow authorized update access"
ON "public"."locations"
FOR UPDATE TO authenticated USING (
  (SELECT authorize('events.update'))
);

-- RLS POLICY 3
CREATE POLICY "Allow authorized insert access"
ON "public"."locations"
FOR INSERT TO authenticated WITH CHECK (
  (SELECT authorize('events.insert'))
);

-- RLS POLICY 4
CREATE POLICY "Allow authorized delete access"
ON "public"."locations"
FOR DELETE TO authenticated USING (
  (SELECT authorize('members.delete'))
);

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    location_id INT NOT NULL,
    date DATE NOT NULL,
    time TIME,
    FOREIGN KEY (location_id) REFERENCES locations (id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- RLS POLICY 1
CREATE POLICY "Enable read access for all users"
ON "public"."events"
FOR SELECT TO public USING (
  true
);

-- RLS POLICY 2
CREATE POLICY "Allow authorized update access"
ON "public"."events"
FOR UPDATE TO authenticated USING (
  (SELECT authorize('events.update'))
);

-- RLS POLICY 3
CREATE POLICY "Allow authorized insert access"
ON "public"."events"
FOR INSERT TO authenticated WITH CHECK (
  (SELECT authorize('events.insert'))
);

-- RLS POLICY 4
CREATE POLICY "Allow authorized delete access"
ON "public"."events"
FOR DELETE TO authenticated USING (
  (SELECT authorize('events.delete'))
);
