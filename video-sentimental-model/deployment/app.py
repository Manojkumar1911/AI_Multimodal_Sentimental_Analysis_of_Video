from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from inference import process_local_video, model_fn, predict_fn
import tempfile
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
# Configure CORS to allow requests from your Next.js frontend
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:3000"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Initialize model once at startup
logger.info("Initializing model...")
model_dict = model_fn("model_normalized")
logger.info("Model initialized successfully!")

@app.route('/process-video', methods=['POST'])
def process_video():
    try:
        if 'video' not in request.files:
            logger.error("No video file provided in request")
            return jsonify({'error': 'No video file provided'}), 400
        
        video_file = request.files['video']
        logger.info(f"Received video file: {video_file.filename}")
        
        # Save the uploaded video to a temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix='.mp4') as temp_file:
            video_file.save(temp_file.name)
            temp_path = temp_file.name
            logger.info(f"Video saved to temporary file: {temp_path}")
        
        try:
            # Process the video
            logger.info("Starting video processing...")
            input_data = {'video_path': temp_path}
            predictions = predict_fn(input_data, model_dict)
            logger.info("Video processing completed successfully")
            
            # Log the predictions before sending
            logger.info(f"Sending predictions: {predictions}")

            return jsonify(predictions)
        
        except Exception as e:
            logger.error(f"Error processing video: {str(e)}")
            return jsonify({'error': str(e)}), 500
        
        finally:
            # Clean up the temporary file
            if os.path.exists(temp_path):
                os.remove(temp_path)
                logger.info("Temporary file cleaned up")
    
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    logger.info("Starting server on http://localhost:5000")
    app.run(host='0.0.0.0', port=5000) 