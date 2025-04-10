import React, { useState, useEffect, useRef } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import './ChatPage.css';

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: 'Hi there! I\'m your Melbourne Community Connections Helper. How can I assist you today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Generate a random conversation ID on component mount if not set
  useEffect(() => {
    if (!conversationId) {
      setConversationId(`conv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
    }
  }, [conversationId]);
  
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Clear any previous errors
    setError(null);
    
    // Add user message to chat
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    
    const userInput = input; // Store input before clearing
    setInput('');
    setIsLoading(true);
    
    try {
      // Send message to backend API
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include credentials if your backend expects them
        body: JSON.stringify({ 
          message: userInput,
          conversationId: conversationId 
        }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error (${response.status}): ${errorText}`);
      }
      
      const data = await response.json();
      
      // Update conversation ID if returned by server
      if (data.conversationId) {
        setConversationId(data.conversationId);
      }
      
      // Add assistant response to chat
      // Check both response and message properties to handle different API formats
      const responseContent = data.response || data.message || "I received your message but couldn't generate a response.";
      setMessages(prev => [...prev, { role: 'assistant', content: responseContent }]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      let errorMessage = 'Sorry, I encountered an error. Please try again.';
      
      // Provide more specific error messages for common issues
      if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
        errorMessage = 'Network error: Could not connect to the server. Please check your connection and try again.';
      } else if (error.message.includes('CORS')) {
        errorMessage = 'Connection error: The server rejected the request. This might be a CORS issue.';
      }
      
      setError(errorMessage);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: errorMessage
      }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to retry connection if there was an error
  const retryConnection = () => {
    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: 'Attempting to reconnect to the server...' 
    }]);
    
    // Simple ping to check if server is available
    fetch('http://localhost:5000/api/ping', { 
      method: 'GET',
      credentials: 'include'
    })
    .then(response => {
      if (response.ok) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'Connection restored! You can continue chatting.' 
        }]);
        setError(null);
      } else {
        throw new Error('Server is not responding properly');
      }
    })
    .catch(err => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Still having trouble connecting. The server might be down or there might be a configuration issue.' 
      }]);
    });
  };
  
  return (
    <Container className="chat-container">
      <h2 className="chat-title">Chat with Melbourne Community Helper</h2>
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
      <Card className="chat-card">
        <Card.Body className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              <div className="message-content">{message.content}</div>
            </div>
          ))}
          {isLoading && (
            <div className="message assistant">
              <div className="message-content typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </Card.Body>
        <Card.Footer>
          <Form onSubmit={handleSendMessage}>
            <Form.Group className="message-input-container">
              <Form.Control
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message here..."
                disabled={isLoading}
              />
              <Button 
                variant="primary" 
                type="submit" 
                disabled={isLoading || !input.trim()}
              >
                Send
              </Button>
            </Form.Group>
          </Form>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default ChatPage;