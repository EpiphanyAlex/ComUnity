import React, { useState, useEffect, useRef } from 'react';
import { Container, Form, Button, Card, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faRobot, faUser } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import './ChatPage.css';

const ChatPage = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Initialize session ID on component mount
  useEffect(() => {
    // Check if a session ID exists in localStorage
    const existingSessionId = localStorage.getItem('chatSessionId');
    if (existingSessionId) {
      setSessionId(existingSessionId);
    } else {
      // Create a new session ID
      const newSessionId = uuidv4();
      localStorage.setItem('chatSessionId', newSessionId);
      setSessionId(newSessionId);
    }

    // Add welcome message
    setMessages([
      {
        text: "Hi there! I'm your Melbourne Community Helper. I can help you find local events, activities, and resources for teens in Melbourne. How can I assist you today?",
        sender: 'bot',
        timestamp: new Date().toISOString(),
      },
    ]);
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      text: input,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    // Store input value before clearing
    const messageText = input;
    
    // Add user message to chat
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      // Send request to backend
<<<<<<< HEAD
      const response = await fetch('http://localhost:5000/api/chat', {
=======
      const response = await fetch('/api/chat', {
>>>>>>> yanzhuo
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          session_id: sessionId,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error (${response.status}): ${errorText}`);
      }

      const data = await response.json();

      // Add bot response to chat
      const botMessage = {
        text: data.response,
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      const errorMessage = {
        text: 'Sorry, I encountered an error. Please try again later.',
        sender: 'bot',
        timestamp: new Date().toISOString(),
        isError: true,
      };
      
      setError('Network error: Could not connect to the server. Please check your connection and try again.');
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Function to retry connection if there was an error
  const retryConnection = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        text: 'Attempting to reconnect to the server...',
        sender: 'bot',
        timestamp: new Date().toISOString(),
      },
    ]);
    
    // Simple ping to check if server is available
<<<<<<< HEAD
    fetch('http://localhost:5000/api/health', { 
=======
    fetch('/api/health', { 
>>>>>>> yanzhuo
      method: 'GET'
    })
    .then(response => {
      if (response.ok) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: 'Connection restored! You can continue chatting.',
            sender: 'bot',
            timestamp: new Date().toISOString(),
          },
        ]);
        setError(null);
      } else {
        throw new Error('Server is not responding properly');
      }
    })
    .catch(err => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: 'Still having trouble connecting. The server might be down or there might be a configuration issue.',
          sender: 'bot',
          timestamp: new Date().toISOString(),
          isError: true,
        },
      ]);
    });
  };

  return (
    <Container className="chatbot-container my-5">
      <Card className="chat-card">
        <Card.Header className="chat-header bg-primary text-white">
          <h4>
            <FontAwesomeIcon icon={faRobot} className="me-2" />
            Melbourne Community Helper
          </h4>
          <p className="mb-0 small">Ask me about events, activities and resources for teens in Melbourne!</p>
        </Card.Header>
        <Card.Body className="chat-body">
          {error && (
            <div className="error-banner">
              {error}
              <Button 
                variant="outline-light" 
                size="sm" 
                onClick={retryConnection}
                className="ms-2"
              >
                Retry Connection
              </Button>
            </div>
          )}
          <div className="message-container">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.sender === 'bot' ? 'bot-message' : 'user-message'} ${
                  message.isError ? 'error-message' : ''
                }`}
              >
                <div className="message-icon">
                  <FontAwesomeIcon
                    icon={message.sender === 'bot' ? faRobot : faUser}
                    className={message.sender === 'bot' ? 'bot-icon' : 'user-icon'}
                  />
                </div>
                <div className="message-content">
                  <div className="message-text">{message.text}</div>
                  <div className="message-timestamp">{formatTimestamp(message.timestamp)}</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message bot-message">
                <div className="message-icon">
                  <FontAwesomeIcon icon={faRobot} className="bot-icon" />
                </div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <Spinner animation="grow" variant="primary" size="sm" />
                    <Spinner animation="grow" variant="primary" size="sm" />
                    <Spinner animation="grow" variant="primary" size="sm" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </Card.Body>
        <Card.Footer className="chat-footer">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="message-input-container">
              <Form.Control
                type="text"
                placeholder="Type your message here..."
                value={input}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <Button 
                variant="primary" 
                type="submit" 
                disabled={isLoading || !input.trim()}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </Button>
            </Form.Group>
          </Form>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default ChatPage;