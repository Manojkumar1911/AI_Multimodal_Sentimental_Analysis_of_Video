"use client";

import { useState, useEffect } from "react";
import UploadVideo from "./UploadVideo";

const EMOTION_EMOJI: Record<string, string> = {
  anger: "😡",
  disgust: "🤢",
  fear: "😨",
  joy: "😄",
  neutral: "😐",
  sadness: "😢",
  surprise: "😲",
};

const SENTIMENT_EMOJI: Record<string, string> = {
  negative: "😡",
  neutral: "😐",
  positive: "😄",
};

interface InferenceProps {
  quota: {
    secretKey: string;
  };
}

export type Analysis = {
  analysis: {
    utterances: Array<{
      start_time: number;
      end_time: number;
      text: string;
      emotions: Array<{ label: string; confidence: number }>;
      sentiments: Array<{ label: string; confidence: number }>;
    }>;
  };
};

// Simple loading bar component
const LoadingBar = ({ status }: { status: "idle" | "uploading" | "analyzing" | "analysis_received" | "success" | "error" }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    let targetWidth = 0;
    // Animate only during analysis states
    if (status === "analyzing") {
      targetWidth = 70; // Simulate 70% for analyzing
    } else if (status === "analysis_received") {
      targetWidth = 100; // Complete on analysis received
    } else if (status === "success") {
       targetWidth = 100; // Stay complete on success
    } else if (status === "error") {
       targetWidth = 0; // Reset on error
    } else {
       targetWidth = 0; // Reset for other states
    }

    // Animate width change
    const interval = setInterval(() => {
      setWidth(prevWidth => {
        const newWidth = prevWidth + (targetWidth - prevWidth) * 0.1; // Smooth transition
        if (Math.abs(newWidth - targetWidth) < 1) {
          clearInterval(interval);
          return targetWidth;
        }
        return newWidth;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [status]);

  const gradientColor = status === "error" ? "bg-red-500" : "bg-gradient-to-r from-blue-500 to-purple-600";

  // Only show the bar during analyzing and analysis_received states
  if (status !== "analyzing" && status !== "analysis_received") return null;

  return (
    <div className="w-full h-1 bg-gray-200 rounded-full mt-2">
      <div
        className={`h-1 rounded-full transition-all duration-500 ease-out ${gradientColor}`}
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
};

export function Inference({ quota }: InferenceProps) {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "analyzing" | "analysis_received" | "success" | "error">("idle");

  const handleAnalysis = (analysis: Analysis) => {
    setAnalysis(analysis);
  };

  const handleStatusChange = (status: "idle" | "uploading" | "analyzing" | "analysis_received" | "success" | "error") => {
    setUploadStatus(status);
  };

  const getAverageScores = () => {
    if (!analysis?.analysis?.utterances?.length) return null;

    // Aggregate all the scores
    const emotionScores: Record<string, number[]> = {};
    const sentimentScores: Record<string, number[]> = {};

    analysis.analysis.utterances.forEach((utterance) => {
      utterance.emotions?.forEach((emotion) => {
        if (!emotionScores[emotion.label]) emotionScores[emotion.label] = [];
        emotionScores[emotion.label]!.push(emotion.confidence);
      });
      utterance.sentiments?.forEach((sentiment) => {
        if (!sentimentScores[sentiment.label]) sentimentScores[sentiment.label] = [];
        sentimentScores[sentiment.label]!.push(sentiment.confidence);
      });
    });

    // Calculate the average
    const avgEmotions = Object.entries(emotionScores).map(
      ([label, scores]) => ({
        label,
        confidence: scores.reduce((a, b) => a + b, 0) / scores.length,
      }),
    );

    const avgSentiments = Object.entries(sentimentScores).map(
      ([label, scores]) => ({
        label,
        confidence: scores.reduce((a, b) => a + b, 0) / scores.length,
      }),
    );

    // Sort by confidence, get the top score
    const topEmotion = avgEmotions.sort(
      (a, b) => b.confidence - a.confidence,
    )[0];
    const topSentiment = avgSentiments.sort(
      (a, b) => b.confidence - a.confidence,
    )[0];

    return { topEmotion, topSentiment };
  };

  const averages = getAverageScores();

  return (
    <div className="flex h-fit w-full flex-col gap-6">
      <h2 className="text-xl font-medium bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">Inference</h2>
      <UploadVideo onAnalysis={handleAnalysis} apiKey={quota.secretKey} onStatusChange={handleStatusChange} />

      {/* Loading bar */}      
      <LoadingBar status={uploadStatus} />

      <h2 className="mt-2 text-xl font-medium bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">Overall analysis</h2>
      {averages ? (
        <div className="flex h-fit w-full flex-wrap items-center justify-center gap-4 rounded-2xl bg-gradient-to-br from-teal-50 via-white to-green-50 p-8 shadow-lg ring-1 ring-teal-100 transition-all duration-500 hover:shadow-xl hover:ring-green-200 text-slate-700 text-center">
          <div className="flex flex-col items-center">
            <span className="text-base font-medium">Primary emotion</span>
            <span className="text-[40px]">
              {EMOTION_EMOJI[averages.topEmotion?.label || 'neutral']}
            </span>
            <span className="text-sm text-gray-500">
              {averages.topEmotion?.confidence.toFixed(3)} (
              {(averages.topEmotion?.confidence! * 100).toFixed(0)}%)
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-base font-medium">Primary Sentiment</span>
            <span className="text-[40px]">
              {SENTIMENT_EMOJI[averages.topSentiment?.label || 'neutral']}
            </span>
            <span className="text-sm text-gray-500">
              {averages.topSentiment?.confidence.toFixed(3)} (
              {(averages.topSentiment?.confidence! * 100).toFixed(0)}%)
            </span>
          </div>
        </div>
      ) : (uploadStatus === "idle" || uploadStatus === "success" || uploadStatus === "error") ? (
        <div className="flex h-32 w-full items-center justify-center rounded-xl border border-dashed border-gray-200 p-4">
          <span className="text-sm text-gray-400">
            Upload a video to see overall analysis
          </span>
        </div>
      ) : null}

      <h2 className="mt-2 text-xl font-medium bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">Analysis of utterances</h2>
      {analysis?.analysis?.utterances?.length ? (
        <div className="flex flex-col gap-4 rounded-2xl bg-gradient-to-br from-yellow-50 via-white to-orange-50 p-8 shadow-lg ring-1 ring-yellow-100 transition-all duration-500 hover:shadow-xl hover:ring-orange-200 text-slate-700 w-full">
          {analysis.analysis.utterances.map((utterance, i) => (
            <div
              key={`${utterance.start_time}-${utterance.end_time}-${i}`}
              className="flex h-fit w-full flex-wrap justify-between gap-4 rounded-xl bg-white bg-opacity-80 px-6 py-4 shadow-sm items-center text-center text-slate-700"
            >
              {/* Time and text */}
              <div className="flex w-full max-w-24 flex-col justify-center text-left">
                <div className="text-sm font-semibold">
                  {Number(utterance.start_time).toFixed(1)} -{" "}
                  {Number(utterance.end_time).toFixed(1)}
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  {utterance.text}
                </div>
              </div>

              {/* Emotions */}
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium">Emotions</span>
                {utterance.emotions?.map((emo) => (
                  <div key={emo.label} className="flex items-center gap-2">
                    <span className="w-16 whitespace-nowrap text-xs text-gray-500">
                      {EMOTION_EMOJI[emo.label]} {emo.label}
                    </span>
                    <div className="flex-1">
                      <div className="h-1 w-full rounded-full bg-gray-100">
                        <div
                          style={{ width: `${emo.confidence * 100}%` }}
                          className="h-1 rounded-full bg-gray-800"
                        ></div>
                      </div>
                      <span className="w-8 text-right text-xs">
                        {(emo.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sentiments */}
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium">Sentiments</span>
                {utterance.sentiments?.map((sentiment) => (
                  <div
                    key={sentiment.label}
                    className="flex items-center gap-2"
                  >
                    <span className="w-16 whitespace-nowrap text-xs text-gray-500">
                      {SENTIMENT_EMOJI[sentiment.label]} {sentiment.label}
                    </span>
                    <div className="flex-1">
                      <div className="h-1 w-full rounded-full bg-gray-100">
                        <div
                          style={{
                            width: `${sentiment.confidence * 100}%`,
                          }}
                          className="h-1 rounded-full bg-gray-800"
                        ></div>
                      </div>
                      <span className="w-8 text-right text-xs">
                        {(sentiment.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (uploadStatus === "idle" || uploadStatus === "success" || uploadStatus === "error") ? (
        <div className="flex h-32 w-full items-center justify-center rounded-xl border border-dashed border-gray-200 p-4">
          <span className="text-sm text-gray-400">
            Upload a video to see analysis results
          </span>
        </div>
      ) : null}
    </div>
  );
}