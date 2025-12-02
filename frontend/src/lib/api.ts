const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export async function predictStructure(sequence: string) {
  const res = await fetch(`${API_BASE_URL}/simulate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sequence }),
  });
  if (!res.ok) throw new Error("API error");
  return res.json();
}
