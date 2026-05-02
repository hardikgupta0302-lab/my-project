from flask import Flask, request, jsonify
import openai
import os

app = Flask(__name__)

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

# Configure OpenAI
openai.api_key = os.getenv('OPENAI_API_KEY')

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    response = openai.ChatCompletion.create(
        model='gpt-3.5-turbo',
        messages=[{'role': 'user', 'content': user_message}]
    )
    return jsonify({'response': response.choices[0].message['content']})

@app.route('/health-tips', methods=['GET'])
def health_tips():
    tips = [
        "Stay hydrated by drinking plenty of water.",
        "Eat a balanced diet rich in fruits and vegetables.",
        "Get regular exercise to maintain physical fitness.",
        "Ensure adequate sleep for recovery and mental health."
    ]
    return jsonify({'tips': tips})

if __name__ == '__main__':
    app.run(debug=True)