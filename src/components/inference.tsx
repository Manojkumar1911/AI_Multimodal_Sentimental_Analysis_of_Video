'use client';

import React, { useState } from 'react';

import CopyButton from './client/copy-button'; // Using default import
import { SignOutButton } from './client/signout'; // Keeping as named import
import CodeExamples from './client/code-examples'; // Using default import

interface InferenceProps {
  quota: { secretKey: string; requestsUsed?: number; maxRequests?: number };
}

export function Inference({ quota }: InferenceProps) {
  const [file, setFile] = useState<File | null>(null);
  const [overallSentiment, setOverallSentiment] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [utterances, setUtterances] = useState<
    { start: number; end: number; text: string; sentiment: string; confidence: number }[]
  >([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        setFile(selectedFile);
        // Reset analysis results when a new file is selected
        setOverallSentiment(null);
        setConfidence(null);
        setUtterances([]);
        // In a real application, you would trigger the upload and analysis here
        console.log('File selected:', selectedFile.name);
      }
    }
  };

  // Dummy data for preview, replace with actual API call results
  React.useEffect(() => {
    if (file) {
      // Simulate API call delay
      setTimeout(() => {
        setOverallSentiment('Positive');
        setConfidence(95);
        setUtterances([
          { start: 0.5, end: 3.1, text: 'This is a great product.', sentiment: 'Positive', confidence: 90 },
          { start: 4.2, end: 6.5, text: 'I am very happy with it.', sentiment: 'Positive', confidence: 98 },
          { start: 7.0, end: 9.8, text: 'The features are amazing.', sentiment: 'Positive', confidence: 92 },
        ]);
      }, 2000);
    }
  }, [file]);

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-4 w-full">
        <h2 className="text-xl font-medium bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">Upload video</h2>
        {/* Upload video container with stunning gradient and centered content */}
        <div className="group relative rounded-2xl bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600 p-8 shadow-lg ring-2 ring-teal-300 transition-all duration-300 hover:shadow-xl hover:ring-cyan-400 flex flex-col items-center text-center w-full">
          <div className="flex flex-col items-center justify-center gap-4 w-full text-white">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white bg-opacity-20">
              <svg
                className="h-12 w-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <div className="text-center w-full">
              <p className="text-base font-medium">
                {file ? file.name : "Upload a video"}
              </p>
              <p className="mt-1 text-sm text-white text-opacity-80">
                {file
                  ? "Click to change the video"
                  : "Click to upload a video to analyze"}
              </p>
            </div>
            <input
              type="file"
              className="absolute inset-0 cursor-pointer opacity-0 w-full h-full"
              onChange={handleFileChange}
              accept="video/*"
            />
          </div>
        </div>
      </div>

      {file && (
        <>
          <div className="flex flex-col gap-4 w-full">
            <h2 className="text-xl font-medium bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">Overall analysis</h2>
            {/* Overall analysis container with stunning gradient and centered content */}
            <div className="group rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 p-8 shadow-lg ring-2 ring-amber-300 transition-all duration-300 hover:shadow-xl hover:ring-orange-400 flex flex-col items-center text-center w-full">
              <div className="flex flex-col gap-6 w-full text-white">
                <div className="flex flex-col gap-2 items-center w-full">
                  <span className="text-base font-medium">Overall sentiment</span>
                  <div className="flex items-center gap-3 w-full justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white bg-opacity-20">
                      <svg
                        className="h-6 w-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <span className="text-lg font-medium">
                      {overallSentiment}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-center w-full">
                  <span className="text-base font-medium">Confidence</span>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-gradient-to-r from-slate-100 to-indigo-100">
                    <div
                      style={{
                        width: confidence + "%",
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 via-indigo-500 to-blue-500 shadow-sm transition-all duration-300"
                    ></div>
                  </div>
                  <span className="text-sm text-white text-opacity-80">{confidence}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <h2 className="text-xl font-medium bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">Analysis of utterances</h2>
            {/* Analysis of utterances container with stunning gradient and centered content */}
            <div className="group rounded-2xl bg-gradient-to-br from-indigo-400 via-blue-500 to-purple-600 p-8 shadow-lg ring-2 ring-indigo-300 transition-all duration-300 hover:shadow-xl hover:ring-blue-400 flex flex-col items-center text-center w-full">
              <div className="flex flex-col gap-6 w-full text-white">
                {utterances.map((utterance, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-4 rounded-xl bg-white bg-opacity-80 p-6 shadow-sm w-full items-center text-center text-slate-700"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-base font-medium">
                        Utterance {index + 1}
                      </span>
                      <span className="text-sm text-slate-600">
                        {utterance.start.toFixed(2)}s - {utterance.end.toFixed(2)}s
                      </span>
                    </div>
                    <p className="text-sm text-left w-full">{utterance.text}</p>
                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Sentiment</span>
                        <span className="text-sm text-slate-600">
                          {utterance.sentiment}
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-gradient-to-r from-slate-100 to-indigo-100">
                        <div
                          style={{
                            width: utterance.confidence + "%",
                          }}
                          className="h-full rounded-full bg-gradient-to-r from-violet-500 via-indigo-500 to-blue-500 shadow-sm transition-all duration-300"
                        ></div>
                      </div>
                      <span className="text-xs text-slate-600 text-right w-full">
                        Confidence: {utterance.confidence}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 