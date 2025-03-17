import { config } from "dotenv";

config({ path: ".env.development.local" });

export const { PORT, mongoos_URL, JWT_SECRET } = process.env;
