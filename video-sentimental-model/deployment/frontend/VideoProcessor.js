import React, { useState } from 'react';
import { processVideo } from './api';

const VideoProcessor = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setResults(null);
            setError(null);
        }
    };

    const handleProcess = async () => {
        if (!selectedFile) {
            setError('Please select a video file first');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const data = await processVideo(selectedFile);
            setResults(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1>Video Sentiment Analysis</h1>
            
            <div className="upload-section">
                <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileSelect}
                />
                <button 
                    onClick={handleProcess}
                    disabled={!selectedFile || loading}
                >
                    {loading ? 'Processing...' : 'Analyze Video'}
                </button>
            </div>

            {error && (
                <div className="error">
                    {error}
                </div>
            )}

            {previewUrl && (
                <div className="video-container">
                    <video 
                        src={previewUrl} 
                        controls 
                        style={{ width: '100%', maxWidth: '640px' }}
                    />
                </div>
            )}

            {results && (
                <div className="results">
                    {results.utterances.map((utterance, index) => (
                        <div key={index} className="utterance">
                            <p>
                                <strong>Time:</strong> {utterance.start_time.toFixed(2)}s - {utterance.end_time.toFixed(2)}s
                            </p>
                            <p>
                                <strong>Text:</strong> {utterance.text}
                            </p>
                            
                            <p><strong>Top Emotions:</strong></p>
                            <ul>
                                {utterance.emotions.map((emotion, i) => (
                                    <li key={i}>
                                        {emotion.label}: {(emotion.confidence * 100).toFixed(1)}%
                                    </li>
                                ))}
                            </ul>
                            
                            <p><strong>Top Sentiments:</strong></p>
                            <ul>
                                {utterance.sentiments.map((sentiment, i) => (
                                    <li key={i}>
                                        {sentiment.label}: {(sentiment.confidence * 100).toFixed(1)}%
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}

            <style jsx>{`
                .container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .upload-section {
                    margin: 20px 0;
                }
                .video-container {
                    margin: 20px 0;
                }
                .utterance {
                    border: 1px solid #ccc;
                    padding: 15px;
                    margin: 10px 0;
                    border-radius: 5px;
                }
                .error {
                    color: red;
                    margin: 10px 0;
                }
                button {
                    margin-left: 10px;
                    padding: 8px 16px;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
                button:disabled {
                    background-color: #ccc;
                    cursor: not-allowed;
                }
            `}</style>
        </div>
    );
};

export default VideoProcessor; 