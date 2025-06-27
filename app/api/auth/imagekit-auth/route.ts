import { getUploadAuthParams } from "@imagekit/next/server";

export async function GET() {
  try {
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY as string;
    const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY as string;

    if (!privateKey || !publicKey) {
      throw new Error("Missing ImageKit environment variables");
    }

    const authenticationParameters = getUploadAuthParams({
      privateKey,
      publicKey,
    });

    return Response.json({
      authenticationParameters,
      publicKey,
    });
  } catch (error) {
    console.error("ImageKit Auth Error:", error);
    return Response.json(
      {
        error: "Authentication for ImageKit failed",
      },
      { status: 500 }
    );
  }
}
