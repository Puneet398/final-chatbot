import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  // Embedded PDF content directly in the code
  const pdfContent = {
    marketSize: "$5.74 billion in 2024 (projected $20.49 billion by 2032)",
    sectors: {
      healthcare: `Healthcare Biomaterials Market:
      - Current size: $2.84 billion (2022)
      - Projected size: $9.44 billion (2030)
      - CAGR: 16.20%
      Key opportunities:
      • Biodegradable medical devices
      • Drug delivery systems
      • Tissue engineering scaffolds`,
      packaging: `Packaging Biomaterials:
      - Market size: $388.9 million (2025)
      - Projected size: $844.2 million (2032)
      - CAGR: 11.7%
      Key materials:
      • Florafoam (flower waste)
      • Bamboo biocomposites
      • Starch-based films`,
      agriculture: `Agricultural Applications:
      - 990 million tonnes annual biomass
      - 230 MMT surplus availability
      Key uses:
      • Bioplastics for mulch films
      • Bio-based fertilizers
      • Seed coatings`,
      textiles: `Textile Biomaterials:
      Innovations:
      • Biomass-based fibers
      • Bio-leather from agricultural waste
      • PLA-based sustainable fashion`
    },
    partnerships: `Essential Partnerships:
    1. Government: BIRAC, BioAngels platform
    2. Research: IITs, IISc, CSIR labs
    3. Industry: MYNUSCo, Phool.co`,
    policies: `Government Support:
    • BioE3 Policy Framework
    • PLI Schemes
    • National Biopharma Mission`
  };

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isInitializing, setIsInitializing] = useState(true);
  const [conversationStage, setConversationStage] = useState(0);
  const messagesEndRef = useRef(null);

  // Initial loading sequence
  useEffect(() => {
    const welcomeMessages = [
      { role: 'assistant', content: "Hey There ● I'm your Intelligent AI Copilot for India's Biomaterials sector" },
      { role: 'assistant', content: "I'm loaded with the latest 2024 market data" },
      { role: 'assistant', content: "India's biomaterials market is currently valued at $5.74B (projected $20.49B by 2032)" }
    ];

    // Initial 2 second delay
    const timer = setTimeout(() => {
      setIsInitializing(false);
      
      // Add messages one by one with delays
      welcomeMessages.forEach((msg, index) => {
        setTimeout(() => {
          setMessages(prev => [...prev, msg]);
        }, index * 800); // 800ms between messages
      });

      // Enable input after all messages are shown
      setTimeout(() => {
        setIsLoading(false);
      }, welcomeMessages.length * 800);
    }, 2000); // Initial 2 second delay

    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Simulate AI thinking (500-1500ms random delay)
      const delay = Math.random() * 1000 + 500;
      await new Promise(resolve => setTimeout(resolve, delay));
      
      let response;
      
      if (conversationStage === 0 && input.toLowerCase().includes('ready')) {
        response = { 
          content: "Which biomaterial sector are you targeting?\n\n" +
                   "1. Healthcare ($9.44B by 2030)\n" +
                   "2. Packaging (11.7% CAGR)\n" +
                   "3. Agriculture\n" + 
                   "4. Textiles"
        };
        setConversationStage(1);
      } 
      else if (conversationStage === 1) {
        const sector = getSectorFromInput(input);
        const sectorData = pdfContent.sectors[sector] || "";
        
        response = { 
          content: `Excellent choice! ${sectorData ? "Here's what I found:\n\n" + sectorData : ""}\n\n` +
                   "What stage is your venture at?\n" +
                   "• Pre-seed\n" +
                   "• Series A\n" +
                   "• Growth Stage"
        };
        setConversationStage(2);
      }
      else if (conversationStage === 2) {
        response = { 
          content: generateRecommendations(input, pdfContent)
        };
        setConversationStage(3);
      }
      else {
        const relevantContent = extractRelevantContent(input, pdfContent);
        response = { 
          content: relevantContent || "Based on general market trends, I recommend..."
        };
      }

      setMessages(prev => [...prev, { role: 'assistant', content: response.content }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Let's refocus on your venture. What's your most pressing challenge?" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper functions
  const getSectorFromInput = (input) => {
    if (/health|medical/i.test(input)) return 'healthcare';
    if (/packag|consumer/i.test(input)) return 'packaging';
    if (/agricult|farm/i.test(input)) return 'agriculture';
    if (/textile|fashion/i.test(input)) return 'textiles';
    return 'healthcare';
  };

  const generateRecommendations = (stage, data) => {
    return `For ${stage} ventures, here's your strategic roadmap:\n\n` +
           `1. ESSENTIAL PARTNERSHIPS:\n${data.partnerships}\n\n` +
           `2. POLICY SUPPORT:\n${data.policies}\n\n` +
           `3. NEXT STEPS:\n- Connect with BIRAC\n- Validate technology\n- Engage consultants`;
  };

  const extractRelevantContent = (query, data) => {
    const keywords = query.toLowerCase().split(/\s+/);
    let relevantInfo = [];
    
    Object.entries(data.sectors).forEach(([sector, content]) => {
      if (keywords.some(kw => content.toLowerCase().includes(kw))) {
        relevantInfo.push(`${sector.toUpperCase()}:\n${content}`);
      }
    });
    
    return relevantInfo.length > 0 
      ? "From our analysis:\n\n" + relevantInfo.join('\n\n') 
      : null;
  };

  return (
    <div className="app">
      <div className="header">
        <h1>ChatBot</h1>
      </div>
      
      <div className="chat-container">
        {isInitializing ? (
          <div className="initial-loading">
            <div className="loading-spinner"></div>
            <p>Initializing AI Assistant...</p>
          </div>
        ) : (
          <>
            <div className="chat-window">
              {messages.map((msg, i) => (
                <div key={i} className={`message ${msg.role}`}>
                  <div className="message-header">
                    {msg.role === 'user' ? (
                      <span className="user-badge">You</span>
                    ) : (
                      <span className="assistant-badge">AI Assistant</span>
                    )}
                  </div>
                  <div className="message-content">
                    {msg.content.split('\n').map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="message assistant">
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
            
            <form onSubmit={handleSubmit} className="input-area">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                placeholder={isLoading ? "AI Assistant is thinking..." : "Type your message..."}
                autoFocus
              />
              <button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <span className="spinner"></span>
                ) : (
                  <span>Send</span>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default App;