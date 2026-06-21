import "dotenv/config";
import { connectDB } from "./lib/db.js";
import { bootstrapAppData } from "./lib/bootstrap.js";

await connectDB();
await bootstrapAppData();

console.log("Seed complete");
process.exit(0);
