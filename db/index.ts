import { drizzle } from "drizzle-orm/neon-http";

const db = drizzle(process.env.DATABASE_URL!);

export default db;

// If you need a synchronous connection, you can use our additional connection API, where you specify a driver connection and pass it to the Drizzle instance.
// import { neon } from '@neondatabase/serverless';
// import { drizzle } from 'drizzle-orm/neon-http';
// const sql = neon(process.env.DATABASE_URL!);
// const db = drizzle({ client: sql });
