CREATE TABLE members (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    phone TEXT,
    name TEXT NOT NULL,
    street TEXT,
    city TEXT,
    state TEXT,
    zip TEXT,
    school TEXT,
    birthday DATE,
    picture TEXT,
    bio TEXT,
    parent1name TEXT,
    parent1phone TEXT,
    parent1email TEXT,
    parent2name TEXT,
    parent2phone TEXT,
    parent2email TEXT,
    grade INT8,
    instruments TEXT[],
    graduated TEXT
);

-- RLS POLICY 1
CREATE POLICY "Enable update for users based on email"
ON "public"."members"
FOR UPDATE USING (
  (SELECT auth.jwt()) ->> 'email' = email
) WITH CHECK (
  (SELECT auth.jwt()) ->> 'email' = email
);

-- RLS POLICY 2
CREATE POLICY "Allow authorized select access"
ON "public"."members"
FOR SELECT TO authenticated USING (
  (SELECT authorize('members.select'))
);

-- RLS POLICY 3
CREATE POLICY "Allow authorized update access"
ON "public"."members"
FOR UPDATE TO authenticated USING (
  (SELECT authorize('members.update'))
);

-- RLS POLICY 4
CREATE POLICY "Allow authorized insert access"
ON "public"."members"
FOR INSERT TO authenticated WITH CHECK (
  (SELECT authorize('members.insert'))
);

-- RLS POLICY 5
CREATE POLICY "Enable users to view their own data only"
ON "public"."members"
TO authenticated USING (
  (SELECT auth.jwt()) ->> 'email' = email
);
