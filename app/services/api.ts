const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const analyzeCode = async (code: string) => {
  const res = await fetch(`${BASE_URL}/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });

  return res.json();
};