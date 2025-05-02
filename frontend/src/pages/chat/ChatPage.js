import React, { useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faRobot, faUser, faComments } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import './ChatPage.css';

const ChatPage = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [error, setError] = useState(null);
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize session ID on component mount
  useEffect(() => {
    // Check if a session ID exists in localStorage
    const existingSessionId = localStorage.getItem('chatSessionId');
    if (existingSessionId) {
      setSessionId(existingSessionId);
      
      // Check if there are any stored messages
      const storedMessages = localStorage.getItem('chatMessages');
      if (storedMessages) {
        try {
          const parsedMessages = JSON.parse(storedMessages);
          if (parsedMessages && parsedMessages.length > 0) {
            setMessages(parsedMessages);
            setHasStartedChat(true);
          } else {
            addWelcomeMessage();
          }
        } catch (e) {
          console.error('Error parsing stored messages:', e);
          addWelcomeMessage();
        }
      } else {
        addWelcomeMessage();
      }
    } else {
      // Create a new session ID
      const newSessionId = uuidv4();
      localStorage.setItem('chatSessionId', newSessionId);
      setSessionId(newSessionId);
      addWelcomeMessage();
    }
  }, []);

  const addWelcomeMessage = () => {
    // Add welcome message
    const welcomeMessage = {
      text: "Hi there! I'm your Melbourne Community Helper. I can help you find local events, activities, and resources for teens in Melbourne. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date().toISOString(),
    };
    setMessages([welcomeMessage]);
  };

  // Save messages to localStorage when they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

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
    
    // Set hasStartedChat to true when user sends first message
    if (!hasStartedChat) {
      setHasStartedChat(true);
    }

    try {
      // Send request to backend
      const response = await fetch('/api/chat', {
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
    fetch('/api/health', { 
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

  // Render initial centered chat view
  if (!hasStartedChat) {
    return (
      <div className="chat-initial">
        <div className="chat-initial-header">
          <FontAwesomeIcon icon={faComments} className="chat-logo" />
          <h3>Melbourne Community Helper</h3>
          <p>Ask me about events, activities and resources for teens in Melbourne!</p>
        </div>
        <Form onSubmit={handleSubmit} className="w-100">
          <Form.Group className="message-input-container">
            <Form.Control
              type="text"
              placeholder="Type your message here..."
              value={input}
              onChange={handleInputChange}
              autoFocus
            />
            <Button 
              variant="primary" 
              type="submit" 
              disabled={!input.trim()}
              aria-label="Send message"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }

  // Render full chat view after conversation starts
  return (
    <div className="chat-active">
      <div className="chat-header">
        <FontAwesomeIcon icon={faRobot} className="header-icon" />
        <h4>Melbourne Community Helper</h4>
      </div>
      
      <div className="chat-body">
        {error && (
          <div className="error-banner">
            {error}
            <Button 
              variant="outline-danger" 
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
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="chat-footer">
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
              aria-label="Send message"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default ChatPage;