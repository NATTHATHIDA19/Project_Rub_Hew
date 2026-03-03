import { Hono } from "hono";

// CORS แบบง่าย (พอสำหรับ dev)
// ถ้าอยาก strict ค่อยปรับ origin ให้ชี้ไปที่ http://localhost:3000 เท่านั้น
const app = new Hono();

app.use("*", async (c, next) => {
  c.header("Access-Control-Allow-Origin", "http://localhost:3000");
  c.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  // ถ้าใช้ cookie ค่อยเปิด: c.header("Access-Control-Allow-Credentials", "true");

  if (c.req.method === "OPTIONS") return c.text("", 200);
  await next();
});

app.get("/health", (c) => c.json({ ok: true, service: "api" }));

app.get("/api/hello", (c) => c.json({ message: "Hello from Hono (Bun)!" }));

export default app;

Bun.serve({
  port: 4000,
  fetch: app.fetch
});

console.log("✅ Hono API running on http://localhost:4000");