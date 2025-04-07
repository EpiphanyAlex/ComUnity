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

    // Add user message to chat
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Send message to backend API
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: input,
          conversationId: conversationId 
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      // Update conversation ID if returned by server
      if (data.conversationId) {
        setConversationId(data.conversationId);
      }
      
      // Add assistant response to chat
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="chat-container">
      <h2 className="chat-title">Chat with Melbourne Community Helper</h2>
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