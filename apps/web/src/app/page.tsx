export default async function Home() {
  const base = process.env.NEXT_PUBLIC_API_URL!;
  const res = await fetch(`${base}/api/hello`, {
    // ถ้าเป็นข้อมูลที่เปลี่ยนบ่อย:
    cache: "no-store"
  });
  const data = await res.json();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Next → Hono direct</h1>
      <pre className="mt-4 rounded-lg bg-zinc-900 p-4 text-zinc-100">
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}