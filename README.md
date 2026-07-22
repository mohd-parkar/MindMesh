# MindMesh

An AI-powered chat application that leverages advanced machine learning to provide intelligent, context-aware conversations.

## About MindMesh

MindMesh is a modern chat application designed to deliver seamless, intelligent communication through AI technology. Whether you're looking for a virtual assistant, creative writing partner, or collab[...]

## Features

✨ **AI-Powered Conversations**
- Advanced natural language processing for intelligent responses
- Context-aware chat understanding
- Real-time conversation capabilities

🎨 **User-Friendly Interface**
- Modern, intuitive UI for seamless interaction
- Responsive design across all devices
- Clean and organized chat experience

🚀 **Performance Optimized**
- Fast response times
- Efficient message handling
- Scalable architecture

🔒 **Security & Privacy**
- Secure communication channels
- Data privacy considerations
- User-friendly security practices

## Project Structure

```
MindMesh/
├── frontend/                    # React-based frontend application
│   ├── public/                  # Static files
│   │   ├── index.html           # Main HTML file
│   │   └── favicon.ico          # Application icon
│   ├── src/                     # Source code
│   │   ├── components/          # Reusable React components
│   │   │   ├── ChatWindow.jsx   # Main chat interface component
│   │   │   ├── MessageList.jsx  # Message display component
│   │   │   ├── InputBox.jsx     # User input component
│   │   │   └── Sidebar.jsx      # Navigation and thread list
│   │   ├── pages/               # Page components
│   │   │   ├── Home.jsx         # Home page
│   │   │   └── Chat.jsx         # Chat page
│   │   ├── context/             # Context API for state management
│   │   │   ├── ChatContext.js   # Global chat state
│   │   │   └── ThreadContext.js # Thread management context
│   │   ├── hooks/               # Custom React hooks
│   │   │   ├── useFetch.js      # API call hook
│   │   │   └── useThreads.js    # Thread management hook
│   │   ├── services/            # API service functions
│   │   │   └── api.js           # API endpoints and calls
│   │   ├── styles/              # CSS files
│   │   │   ├── App.css          # Global styles
│   │   │   └── Chat.css         # Chat-specific styles
│   │   ├── App.jsx              # Root component
│   │   └── index.js             # React DOM render entry point
│   ├── package.json             # Frontend dependencies
│   └── .env                     # Frontend environment variables
│
├── backend/                     # Backend API and AI integration
│   ├── models/                  # Database models
│   │   ├── Thread.js            # Thread schema and model
│   │   └── Message.js           # Message schema and model
│   ├── controllers/             # Route handlers and business logic
│   │   ├── threadController.js  # Thread operations (CRUD)
│   │   ├── chatController.js    # Chat operations and AI integration
│   │   └── messageController.js # Message operations
│   ├── routes/                  # API route definitions
│   │   ├── threadRoutes.js      # Thread-related routes
│   │   ├── chatRoutes.js        # Chat and message routes
│   │   └── index.js             # Route aggregation
│   ├── middleware/              # Express middleware
│   │   ├── errorHandler.js      # Error handling middleware
│   │   ├── validator.js         # Input validation middleware
│   │   └── auth.js              # Authentication middleware
│   ├── services/                # Business logic services
│   │   ├── openaiService.js     # OpenAI API integration
│   │   ├── threadService.js     # Thread business logic
│   │   └── chatService.js       # Chat business logic
│   ├── utils/                   # Utility functions
│   │   ├── logger.js            # Logging utility
│   │   ├── errorMessages.js     # Error message constants
│   │   └── validators.js        # Validation utility functions
│   ├── config/                  # Configuration files
│   │   ├── database.js          # MongoDB connection
│   │   ├── env.js               # Environment variables loader
│   │   └── constants.js         # Application constants
│   ├── server.js                # Express server setup
│   ├── app.js                   # Express app configuration
│   ├── package.json             # Backend dependencies
│   ├── .env                     # Backend environment variables
│   └── .env.example             # Example environment variables
│
├── README.md                    # Project documentation
└── .gitignore                   # Git ignore rules
```

### Frontend Structure Details

**components/** - Reusable UI components that compose the application interface
- `ChatWindow.jsx`: Container for the entire chat interface
- `MessageList.jsx`: Displays all messages in a thread
- `InputBox.jsx`: Input field for user messages
- `Sidebar.jsx`: Shows thread list and navigation controls

**context/** - Global state management using React Context API
- Manages chat state, threads, and user interactions globally
- Reduces prop drilling across components

**services/** - API communication layer
- Handles all HTTP requests to the backend
- Centralizes API endpoint definitions

### Backend Structure Details

**models/** - MongoDB schema definitions using Mongoose
- Defines data structure and validation rules
- Establishes database relationships

**controllers/** - Request handlers containing business logic
- Processes incoming requests
- Calls services to perform operations
- Returns responses to the client

**routes/** - API endpoint definitions
- Maps HTTP methods to controller functions
- Defines route parameters and paths

**middleware/** - Processing layer for requests
- Error handling and validation
- Authentication and authorization checks

**services/** - Core business logic separated from controllers
- OpenAI API integration
- Database operations
- Complex business logic processing

**config/** - Application configuration
- Database connection setup
- Environment variable management
- Application constants

## Tech Stack

### Frontend
- **Framework**: React.js
- **Styling**: Modern CSS/UI libraries
- **State Management**: React hooks/Context API

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **AI Integration**: OpenAI API
- **API**: RESTful architecture

## Database Schema

### Thread Model
The Thread model represents a chat conversation session containing multiple messages.

```javascript
{
  threadId: String (unique, required) - Unique identifier for the chat session
  title: String (default: "New Chat") - Title of the conversation
  messages: [Message] - Array of message objects in the conversation
  createdAt: Date (default: current date) - When the thread was created
  updatedAt: Date (default: current date) - When the thread was last updated
}
```

### Message Schema
The Message schema represents individual messages within a thread.

```javascript
{
  role: String (enum: ["user", "assistant"], required) - Role of the message sender
  content: String (required) - The actual message content
  timestamp: Date (default: current date) - When the message was sent
}
```

## API Routes

All API routes are prefixed with `/api/v1/`

### Chat Routes

#### 1. Create Test Thread
- **Endpoint**: `POST /api/v1/test`
- **Description**: Test route to create a new thread in the database
- **Request Body**:
  ```json
  {
    "threadId": "string (unique identifier)",
    "title": "string (optional conversation title)"
  }
  ```
- **Response**: Returns the created thread object
- **Status Codes**: 
  - `200`: Thread created successfully
  - `500`: Error while posting the thread

#### 2. Get All Threads
- **Endpoint**: `GET /api/v1/thread`
- **Description**: Fetch all chat threads sorted by most recently updated first
- **Response**: Returns an array of all thread objects sorted by `updatedAt` in descending order
- **Status Codes**:
  - `200`: Threads fetched successfully
  - `500`: Error occurred during fetching threads

#### 3. Get Specific Thread
- **Endpoint**: `GET /api/v1/thread/:threadId`
- **Description**: Retrieve a specific thread by its threadId
- **Parameters**:
  - `threadId` (path parameter): The unique thread identifier
- **Response**: Returns the thread object with all its messages
- **Status Codes**:
  - `200`: Thread fetched successfully
  - `404`: Thread not found
  - `500`: Error occurred during fetching the thread

#### 4. Delete Thread
- **Endpoint**: `DELETE /api/v1/thread/:threadId`
- **Description**: Delete a specific thread and all its messages
- **Parameters**:
  - `threadId` (path parameter): The unique thread identifier
- **Response**: Success message with status code
- **Status Codes**:
  - `200`: Thread deleted successfully
  - `404`: Thread not found
  - `500`: Error occurred during deletion of thread

#### 5. Send Chat Message (Main Route)
- **Endpoint**: `POST /api/v1/chat`
- **Description**: Main route for sending messages. Handles storing user messages and getting AI-powered responses from OpenAI
- **Request Body**:
  ```json
  {
    "threadId": "string (unique thread identifier)",
    "message": "string (user message content)"
  }
  ```
- **Process Flow**:
  1. Validates that both threadId and message are provided
  2. Checks if thread exists:
     - If new thread: Creates new thread with user message as title
     - If existing thread: Appends message to existing thread
  3. Sends message to OpenAI API for intelligent response generation
  4. Stores both user message and AI response in the thread
  5. Updates the `updatedAt` timestamp
  6. Saves the thread to database
- **Response**: Returns the AI assistant's reply
  ```json
  {
    "reply": "string (AI-generated response)"
  }
  ```
- **Status Codes**:
  - `200`: Message processed successfully and response generated
  - `400`: Missing threadId or message in request body
  - `500`: Error occurred during storing the data in the thread

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Git
- MongoDB URI (for database connection)
- OpenAI API Key (for AI responses)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mohd-parkar/MindMesh.git
   cd MindMesh
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Setup Environment Variables**
   Create a `.env` file in the backend directory:
   ```
   MONGODB_URI=your_mongodb_connection_string
   OPENAI_API_KEY=your_openai_api_key
   ```

### Running the Application

**Start the Backend Server**
```bash
cd backend
npm start
```

**Start the Frontend Application**
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## Usage

1. Open the application in your browser
2. Start a new chat session (or use an existing thread ID)
3. Type your message to interact with the AI
4. View conversation history within each thread
5. Delete conversations as needed

## Development

### Running Tests
```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
npm test
```

### Building for Production
```bash
# Frontend build
cd frontend
npm run build

# Backend build
cd backend
npm run build
```

## Contributing

We welcome contributions to MindMesh! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Roadmap

- [ ] Enhanced AI model capabilities
- [ ] User authentication and profiles
- [ ] Chat history and persistence
- [ ] Multi-language support
- [ ] Mobile app development
- [ ] Advanced analytics and insights
- [ ] Voice message support
- [ ] File sharing capabilities

## License

This project is open source and available under the MIT License.

## Support

For support, questions, or feedback:
- Open an issue on GitHub
- Check existing issues for solutions
- Review documentation in the wiki

## Repository Links

- **Main Repository**: [MindMesh](https://github.com/mohd-parkar/MindMesh)
- **Issues**: [Report a bug or request a feature](https://github.com/mohd-parkar/MindMesh/issues)
- **Discussions**: [Join the conversation](https://github.com/mohd-parkar/MindMesh/discussions)

---

**Built with ❤️ by [mohd-parkar](https://github.com/mohd-parkar)**

Last Updated: July 22, 2026
