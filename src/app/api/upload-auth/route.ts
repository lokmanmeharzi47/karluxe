import { getUploadAuthParams } from "@imagekit/next/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
    const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

    if (!privateKey || !publicKey || !urlEndpoint) {
      return NextResponse.json(
        { error: "ImageKit credentials are not properly configured on the server." },
        { status: 500 }
      );
    }

    const authParams = getUploadAuthParams({
      privateKey,
      publicKey,
    });

    return NextResponse.json(authParams);
  } catch (error: any) {
    console.error("ImageKit Auth Error:", error);
    return NextResponse.json(
      { error: "Failed to generate ImageKit authentication parameters." },
      { status: 500 }
    );
  }
}
