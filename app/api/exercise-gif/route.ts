export async function GET(
  request: Request
) {
  const apiKey =
    process.env.WORKOUTX_API_KEY;

  if (!apiKey) {
    return new Response(
      "API key ontbreekt",
      {
        status: 500,
      }
    );
  }

  const { searchParams } =
    new URL(request.url);

  const id =
    searchParams.get("id");

  if (!id) {
    return new Response(
      "GIF id ontbreekt",
      {
        status: 400,
      }
    );
  }

  const response = await fetch(
    `https://api.workoutxapp.com/v1/gifs/${id}.gif`,
    {
      headers: {
        "X-WorkoutX-Key":
          apiKey,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return new Response(
      "GIF kon niet geladen worden",
      {
        status: response.status,
      }
    );
  }

  const gif =
    await response.arrayBuffer();

  return new Response(gif, {
    headers: {
      "Content-Type": "image/gif",
      "Cache-Control":
        "public, max-age=86400",
    },
  });
}