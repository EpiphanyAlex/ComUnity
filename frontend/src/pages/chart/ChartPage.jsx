import React, { useState, useEffect,useRef } from 'react';
import { Container, Form, Button, ListGroup, Spinner } from 'react-bootstrap';
import '../../css/ChartPageCss.css'; // import custom styles

const ChartPage = () => {
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Hello! How can I help you today?' }
      ]);
      const [input, setInput] = useState('');
      const [isThinking, setIsThinking] = useState(false);
      const messagesEndRef = useRef(null);
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
    
        const userMessage = { sender: 'me', text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsThinking(true);
    
        // simulate thinking stage == wait for the backend to response
        setTimeout(() => {
          setMessages((prev) => [...prev, { sender: 'bot', text: 'Great, I get you!' }]);
          setIsThinking(false);
        }, 3000);
      };
    
      useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, [messages, isThinking]);
    
      return (
        <Container fluid className="chat-container d-flex flex-column">
          <div className="chat-box flex-grow-1 overflow-auto p-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`message-bubble ${msg.sender === 'me' ? 'me' : 'bot'}`}
              >
                {msg.text}
              </div>
            ))}
    
            {isThinking && (
              <div className="message-bubble bot typing-indicator">
                <span></span><span></span><span></span>
              </div>
            )}
    
            <div ref={messagesEndRef} />
          </div>
    
          <Form onSubmit={handleSubmit} className="chat-input-area p-3 border-top">
            <div className="d-flex">
              <Form.Control
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isThinking}
              />
              <Button type="submit" variant="primary" className="ms-2" disabled={isThinking}>
                Send
              </Button>
            </div>
          </Form>
        </Container>
      );
};

export default ChartPage;
