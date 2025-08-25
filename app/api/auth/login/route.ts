import { NextResponse } from "next/server";
import { RandomUserResponse } from "../../../types";
import { setAuthCookie } from "../../../utils/authCookie";

export async function POST() {
  try {
    // Get API configuration from environment variables
    const apiUrl =
      process.env.RANDOM_USER_API_URL || "https://randomuser.me/api";
    const results = process.env.RANDOM_USER_RESULTS || "1";
    const nationality = process.env.RANDOM_USER_NATIONALITY || "us";

    // Construct the API URL with environment variables
    const url = `${apiUrl}/?results=${results}&nat=${nationality}`;

    // Fetch user data from the external API
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user data: ${response.status}`);
    }

    const userData: RandomUserResponse = await response.json();

    if (!userData.results || userData.results.length === 0) {
      throw new Error("No user data received from API");
    }

    // Set a signed auth cookie to enable SSR redirects (localStorage holds actual user data)
    const res = NextResponse.json({
      success: true,
      user: userData.results[0],
    });
    setAuthCookie(res);
    return res;
  } catch (error) {
    console.error("Login API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "An error occurred",
      },
      { status: 500 }
    );
  }
}
