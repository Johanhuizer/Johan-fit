import {
  NextRequest,
  NextResponse,
} from "next/server";


export async function GET(
  request: NextRequest
) {
  const apiKey =
    process.env.WORKOUTX_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "WORKOUTX_API_KEY ontbreekt",
      },
      {
        status: 500,
      }
    );
  }


  const searchParams =
    request.nextUrl.searchParams;

  const name =
    searchParams.get("name") ??
    "";


  const response =
    await fetch(
      `https://api.workoutxapp.com/v1/exercises?name=${encodeURIComponent(
        name
      )}&limit=50`,
      {
        headers: {
          "X-WorkoutX-Key":
            apiKey,
        },

        cache: "no-store",
      }
    );


  const data =
    await response.json();


  return NextResponse.json(
    data,
    {
      status:
        response.status,
    }
  );
}