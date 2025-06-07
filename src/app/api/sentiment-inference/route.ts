import { InvokeEndpointCommand, SageMakerRuntimeClient } from "@aws-sdk/client-sagemaker-runtime";
import { NextResponse } from "next/server";
import { env } from "~/env";
import { checkAndUpdateQuota } from "~/lib/quota";
import { db } from "~/server/db";
import { auth } from "~/server/auth"; // Import auth function

interface InferenceResult {
  sentiment: string;
  confidence: number;
}

export async function POST(req: Request) {
  let result: InferenceResult | null = null; // Declare result outside try block

  try {
    const session = await auth(); // Get the actual auth session

    if (!session?.user?.id) { // Check if session and user id exist
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { videoUrl } = await req.json() as { videoUrl: string }; // Add type assertion

    if (!videoUrl) {
      return NextResponse.json({ error: "Video URL is required" }, { status: 400 });
    }

    // Check and update quota
    const quotaCheckSuccess = await checkAndUpdateQuota(session.user.id); // Pass userId and expect boolean

    if (!quotaCheckSuccess) { // Handle boolean return value
      // We need a way to get the specific quota error message if checkAndUpdateQuota returns false.
      // For now, we'll use a generic message or you might need to modify checkAndUpdateQuota
      // to return a specific error message when it returns false.
      return NextResponse.json(
        { error: "Quota exceeded or could not be updated." }, // Generic error for now
        { status: 403 }, // Forbidden if quota exceeded
      );
    }

    // Commenting out AWS/SageMaker related code
    /*
    const sagemakerClient = new SageMakerRuntimeClient({
      region: env.AWS_REGION,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY!,
      },\n    });

    const params = {
      EndpointName: env.AWS_ENDPOINT_NAME!, // Corrected endpoint name
      ContentType: "application/json",
      Body: JSON.stringify({ video_url: videoUrl }),
    };

    const command = new InvokeEndpointCommand(params);
    const response = await sagemakerClient.send(command);

    const resultString = new TextDecoder().decode(response.Body);
    const result: InferenceResult = JSON.parse(resultString) as InferenceResult;
    */

    // Mock result for now
    result = {
      sentiment: "Positive",
      confidence: 0.95
    };

    // Store inference result in the database
    await db.inferenceResult.create({
      data: {
        userId: session.user.id, // Use actual user ID from session
        videoUrl: videoUrl,
        sentiment: result.sentiment,
        confidence: result.confidence,
        timestamp: new Date(),
      },
    });

  } catch (error: unknown) { // Change type to unknown
    console.error("Inference error:", error);
    // Safely access error.message
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }

  if (!result) {
    return NextResponse.json({ error: "Failed to process inference" }, { status: 500 });
  }

  return NextResponse.json(result);
}