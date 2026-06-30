import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import { destinations } from "../lib/data/destinations";
import { packages } from "../lib/data/packages";
import { testimonials } from "../lib/data/testimonials";

function loadEnvLocal() {
  const envPath = join(__dirname, "../.env.local");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvLocal();

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
if (!convexUrl) {
  throw new Error("NEXT_PUBLIC_CONVEX_URL is not set");
}

const client = new ConvexHttpClient(convexUrl);

async function seed() {
  const result = await client.mutation(api.seed.replaceAll, {
    adminKey: process.env.SEED_ADMIN_KEY ?? "spiritual-yatra-seed",
    destinations: destinations.map(({ id, ...rest }) => ({
      slug: id,
      ...rest,
    })),
    packages: packages.map(({ id, ...rest }) => ({
      slug: id,
      ...rest,
    })),
    testimonials: testimonials.map(({ id, ...rest }) => ({
      slug: id,
      ...rest,
    })),
  });

  console.log("Seed complete:", result);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
