"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Upload } from "lucide-react";

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
const ALLOWED_TYPES = ["video/mp4", "video/quicktime", "video/x-msvideo"];

export default function UploadVideo() {
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Please upload an MP4, MOV, or AVI file");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size must be less than 100MB");
      return;
    }

    try {
      setIsUploading(true);

      // Get signed URL
      const response = await fetch("/api/upload-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get upload URL");
      }

      const { url, key } = await response.json();

      // Upload to S3
      const uploadResponse = await fetch(url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file");
      }

      // Start inference
      const inferenceResponse = await fetch("/api/sentiment-inference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoUrl: key }),
      });

      if (!inferenceResponse.ok) {
        throw new Error("Failed to start inference");
      }

      const result = await inferenceResponse.json();
      router.push(`/dashboard?result=${encodeURIComponent(JSON.stringify(result))}`);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload video. Please try again.");
    } finally {
      setIsUploading(false);
    }
  }, [router]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/mp4": [".mp4"],
      "video/quicktime": [".mov"],
      "video/x-msvideo": [".avi"],
    },
    maxFiles: 1,
    disabled: isUploading,
  });

  return (
    <div
      {...getRootProps()}
      className={`flex h-64 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 transition-colors hover:bg-gray-100 ${
        isDragActive ? "border-blue-500 bg-blue-50" : ""
      }`}
    >
      <input {...getInputProps()} />
      {isUploading ? (
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <p className="text-sm text-gray-500">Uploading...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <Upload className="h-8 w-8 text-gray-400" />
          <p className="text-sm text-gray-500">
            {isDragActive
              ? "Drop the video here"
              : "Drag & drop a video file here, or click to select"}
          </p>
          <p className="text-xs text-gray-400">
            Supported formats: MP4, MOV, AVI (max 100MB)
          </p>
        </div>
      )}
    </div>
  );
} 