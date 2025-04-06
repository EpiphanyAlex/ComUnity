import os
import sys

# Make sure 'backend' can find 'app'
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

from app import create_app

app = create_app()

if __name__ == '__main__':
    print("✅ Flask app is starting...")
    app.run(debug=True)
