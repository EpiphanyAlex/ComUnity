# ComUnity

A web application designed to strengthen community connections for teenagers (12-18) in Melbourne, Australia. The goal is to address social isolation by providing resources, events, and a chat interface to help teenagers connect with their community.

## Features

- Interactive chat with a Melbourne Community Helper bot
- Information about local events and resources
- Recommendations for activities
- Support for dealing with social isolation

## Project Structure

```
ComUnity/
├── frontend/          # React.js web application
├── backend/           # Flask API server
└── docs/              # Documentation
```

## Prerequisites

- Node.js (v14+)
- Python (v3.8+)
- npm or yarn

## Running the Frontend

```bash
cd frontend
npm install
npm start
```

This will start the React development server at http://localhost:3000.

## Running the Backend

First, install the required Python packages:

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Then, start the Flask server:

```bash
python app.py
```

The API server will run at http://localhost:5000.

## API Endpoints

- `POST /api/chat`: Chat with the Melbourne Community Helper
  - Request body: `{ "message": "Your message here" }`
  - Response: `{ "response": "Bot's response here" }`

## Technologies Used

- Frontend: React.js, React Bootstrap
- Backend: Flask
- AI: OpenAI API

## Project Overview

ComUnity is a web application that helps teenagers in Melbourne build meaningful social connections within their community. The platform focuses on creating opportunities for teens to interact, participate in group activities, and develop strong community bonds.

### Tech Stack

- Frontend: React.js
- Backend: Python Flask
- Database: AWS RDS
- Version Control: Git/GitHub

## Project Structure

```
├── frontend/         # React Frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── styles/
├── backend/          # Python Flask Backend
│   ├── app/
│   ├── config/
│   ├── models/
│   └── routes/
└── docs/
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Python 3.8 or higher
- AWS account and credentials
- Git

### Installation

1. Clone the repository
2. Set up the frontend:
   ```bash
   cd frontend
   npm install
   ```
3. Set up the backend:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

## Development

- Frontend development server: `npm start`
- Backend development server: `flask run`

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Password Protected Access

This website is password protected. Use the following credentials to access it:

- **Username**: TA16
- **Password**: comunity16

## Deployment with Docker

The application is containerized with Docker and can be deployed to AWS EC2 using the provided setup:

1. Clone the repository to your EC2 instance
2. Navigate to the project directory
3. Run the deployment script: `./deploy.sh`

This will build and start both the frontend and backend services. 