"use client";

import { useState } from "react";
import { FiUpload, FiCheck, FiAlertCircle } from "react-icons/fi";
import { Analysis } from "./Inference";
import { toast } from "sonner";

interface UploadVideoProps {
  apiKey: string;
  onAnalysis: (analysis: Analysis) => void;
  onStatusChange: (status: "idle" | "uploading" | "analyzing" | "analysis_received" | "success" | "error") => void;
}

function UploadVideo({ apiKey, onAnalysis, onStatusChange }: UploadVideoProps) {
  const [status, setStatus] = useState<"idle" | "uploading" | "analyzing" | "analysis_received" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string>("");

  // Report status changes to the parent component (Inference)
  useState(() => {
    onStatusChange(status);
  }, [status, onStatusChange]);

  const handleUpload = async (file: File) => {
    try {
      setStatus("uploading");
      setError(null);
      setProgress("Preparing upload...");
      toast.info("Preparing video upload...");

      const fileType = `.${file.name.split(".").pop()}`;

      // 1. Get upload URL (This step is now just to get the backend URL)
      setProgress("Connecting to analysis server...");
      const res = await fetch("/api/upload-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileType: fileType }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.error || "Failed to get analysis server URL");
      }
      // setProgress("Connected to analysis server."); // Removed as it's very brief

      const { url } = await res.json();

      // 2. Upload file directly to local backend and get analysis
      setProgress("Uploading video for analysis...");
      toast.info("Uploading video...");
      const formData = new FormData();
      formData.append('video', file);

      const uploadRes = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error("Failed to upload file or get analysis");
      }

      // Status changes to analyzing after successful upload
      setStatus("analyzing");
      setProgress("Analyzing video...");

      // Analysis received status is set within the LoadingBar for visual effect

      // 3. Process and display analysis
      const analysisData = await uploadRes.json();
      console.log("Analysis data received:", analysisData);

      // Format the received data to match the frontend's expected Analysis type
      const formattedAnalysis: Analysis = { analysis: analysisData as Analysis['analysis'] };

      onAnalysis(formattedAnalysis);
      setStatus("success");
      setProgress("Analysis complete!");
      toast.success("Video uploaded and analyzed successfully!", { duration: 3000 });
      
    } catch (error) {
      setError(error instanceof Error ? error.message : "Upload failed");
      setStatus("error");
      setProgress("Upload failed");
      console.error("Upload failed", error);
      toast.error(`Upload failed: ${error instanceof Error ? error.message : "Unknown error"}`, { duration: 3000 });
    } finally {
       // Reset status and progress after a short delay to allow error/success messages to be seen
       setTimeout(() => {
         setStatus("idle");
         setProgress("");
       }, status === "success" || status === "error" ? 3000 : 500);
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return <FiCheck className="min-h-8 min-w-8 text-green-500" />;
      case "error":
        return <FiAlertCircle className="min-h-8 min-w-8 text-red-500" />;
      default:
        return <FiUpload className="min-h-8 min-w-8 text-gray-400" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "success":
        return "text-green-500";
      case "error":
        return "text-red-500";
      default:
        return "text-slate-800";
    }
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 p-10">
        <input
          type="file"
          accept="video/mp4,video/mov,video/avi"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file);
          }}
          id="video-upload"
        />
        <label
          htmlFor="video-upload"
          className="flex cursor-pointer flex-col items-center"
        >
          {getStatusIcon()}
          <h3 className={`text-md mt-2 ${getStatusColor()}`}>
            {status === "uploading"
              ? "Uploading..."
              : status === "analyzing"
                ? "Analyzing..."
                : status === "analysis_received"
                ? "Analysis Received!"
                : status === "success"
                ? "Upload Successful!"
                : status === "error"
                ? "Upload Failed"
                : "Upload a video"}
          </h3>
          {progress && status !== "success" && status !== "error" && (
            <p className="text-center text-xs text-gray-500 mt-1">
              {progress}
            </p>
          )}
           {status === "success" && progress && (
            <p className="text-center text-xs text-green-600 mt-1 font-semibold">
              {progress}
            </p>
           )}
           {status === "error" && progress && (
            <p className="text-center text-xs text-red-600 mt-1 font-semibold">
              {progress}
            </p>
           )}
          <p className="text-center text-xs text-gray-500 mt-2">
            Get started with sentiment detection by uploading a video.
          </p>
        </label>
      </div>
      {error && (
        <div className="flex items-center gap-2 text-sm text-red-500">
          <FiAlertCircle />
          {error}
        </div>
      )}
    </div>
  );
}

export default UploadVideo;