import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";
import { env } from "~/env";
import { auth } from "~/server/auth";

// Helper function to generate a unique key for the file
const generateUniqueKey = (fileName: string) => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(7);
  const fileExtension = fileName.split(".").pop();
  return `uploads/${timestamp}-${randomString}.${fileExtension}`;
};

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { fileName, contentType } = await req.json() as { fileName: string; contentType: string };

    if (!fileName || !contentType) {
      return NextResponse.json({ error: "File name and content type are required" }, { status: 400 });
    }

    // Define allowed content types
    const allowedTypes = ["video/mp4", "video/quicktime", "video/x-msvideo"]; // Added avi
    if (!allowedTypes.includes(contentType)) {
        return NextResponse.json({ error: `Invalid content type: ${contentType}. Allowed types are MP4, MOV, AVI.` }, { status: 400 });
    }

    // Commenting out AWS S3 related code
    /*
    const s3Client = new S3Client({
      region: env.AWS_REGION,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    const key = generateUniqueKey(fileName);

    const putObjectCommand = new PutObjectCommand({
      Bucket: env.AWS_INFERENCE_BUCKET!,
      Key: key,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(s3Client, putObjectCommand, {
      expiresIn: 3600, // URL expires in 1 hour
    });

    return NextResponse.json({ url: uploadUrl, key });
    */

    // Mock response for now
    const key = generateUniqueKey(fileName);
    const uploadUrl = `mock-upload-url/${key}`;

    return NextResponse.json({ url: uploadUrl, key });

  } catch (error: unknown) {
    console.error("Upload URL error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}