import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  // Comprehensive PDF data structure
  const pdfData = {
    marketOverview: {
      currentSize: "$5.74 billion (2024)",
      projectedSize: "$20.49 billion (2032)",
      biopolymers: {
        current: "$388.9 million (2025)",
        projected: "$844.2 million (2032)",
        cagr: "11.7%"
      },
      healthcare: {
        current: "$2.84 billion (2022)",
        projected: "$9.44 billion (2030)",
        cagr: "16.20%"
      }
    },
    sectors: {
      healthcare: {
        opportunities: [
          "Biodegradable Medical Devices (e.g., PLA-based implants)",
          "Drug Delivery Systems (chitosan, gelatin, calcium phosphate)",
          "Tissue Engineering (cellulose-based scaffolds)"
        ],
        examples: [
          "Orthocrafts Innovations' bioabsorbable maxillofacial implants",
          "CSIR-CDRI's Blockchain For Impact partnership for biomedical innovation"
        ]
      },
      packaging: {
        opportunities: [
          "Biodegradable packaging (Florafoam from flower waste)",
          "Compostable films (cellulose, starch, chitosan)",
          "Automotive biocomposites (MYNUSCo's bamboo waste materials)"
        ],
        examples: [
          "Phool's temple flower waste conversion",
          "MYNUSCo's partnerships with Renault Nissan and beauty brands"
        ]
      },
      agriculture: {
        opportunities: [
          "Bioplastics for mulch films and seed coatings",
          "Bio-based fertilizers from agricultural waste",
          "Bamboo fiber utilization (1.5-4.0mm length)"
        ],
        statistics: [
          "990 million tonnes annual agricultural biomass",
          "230 MMT surplus availability"
        ]
      },
      textiles: {
        opportunities: [
          "Biomass-based fibers comparable to synthetics",
          "Bio-leather from agricultural waste",
          "PLA-based sustainable fashion materials"
        ]
      }
    },
    partnerships: {
      government: [
        "BIRAC (BioAngels platform, India Health Fund)",
        "BioE3 Policy Framework (bio-manufacturing hubs)",
        "State initiatives (Odisha biotech park, AMTZ in Andhra Pradesh)"
      ],
      research: [
        "IISc Bangalore (3D Bioprinting Center of Excellence)",
        "IIT Guwahati (NRL-Center for Bioplastics)",
        "CSIR network (IICT, CGCRI, CDRI)"
      ],
      industry: [
        "MYNUSCo (biocomposites for automotive and packaging)",
        "Advance Bio Material Company (bioplastics raw materials)",
        "KIHT (technology transfer with IITs/NITs)"
      ],
      distribution: [
        "Biotechno Labs (life sciences distribution)",
        "DKSH (international distribution networks)",
        "Healthcare partners (Zydus, Cadila, Axio Biosolutions)"
      ]
    },
    policies: {
      keyPolicies: [
        "BioE3 Policy (biomanufacturing hubs, AI/ML capabilities)",
        "PLI Schemes (electronics, pharmaceuticals)",
        "National Biopharma Mission"
      ],
      funding: [
        "BIRAC BIG Grant (₹50 lakh/USD 70,000)",
        "BioNEST Incubators (1M sq ft space)",
        "SBIRI funding for advanced projects"
      ]
    },
    caseStudies: [
      {
        name: "MYNUSCo",
        description: "Developed biocomposites from bamboo/rice/wood waste. Partners: Renault Nissan, beauty brands"
      },
      {
        name: "Phool",
        description: "Transformed temple flower waste into Florafoam packaging"
      },
      {
        name: "Hi-Tech International",
        description: "First Indian plant-based biopolymer 'Dr Bio' for single-use plastic replacement"
      }
    ],
    entryStrategies: {
      regulatory: [
        "FDI approval route for biotechnology",
        "National Biodiversity Authority permissions",
        "CDSCO (medical), FSSAI (food), BIS certifications"
      ],
      routes: [
        "Joint ventures (e.g., Sonru BioScience & Veeda Clinical)",
        "Technology transfer (CSIR Scientist Entrepreneurship Scheme)",
        "Acquisition of local players"
      ],
      dosDonts: {
        dos: [
          "Obtain NBA approvals for biological resources",
          "Register for GST and understand transfer pricing",
          "File patents/trademarks early",
          "Build strong local partnerships",
          "Adapt products to local needs"
        ],
        donts: [
          "Underestimate compliance requirements",
          "Ignore environmental regulations",
          "Rush regulatory approvals",
          "Neglect IP protection",
          "Attempt independent operations without local partners"
        ]
      }
    },
    localBodies: {
      municipal: [
        "Mumbai Metropolitan Region (Dutch partnerships)",
        "Greater Chennai Corporation (Urban Ocean program)",
        "Surat Municipal Corporation (PPP models)"
      ],
      researchInstitutions: [
        "BIRAC BioNEST (73 incubators, 1M sq ft)",
        "National Biotechnology Parks (7 locations)",
        "ICAR (agricultural biomass research)"
      ],
      industrial: [
        "SEZs (centralized waste management)",
        "Industrial Estates (common treatment facilities)"
      ]
    }
  };

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isInitializing, setIsInitializing] = useState(true);
  const [conversationStage, setConversationStage] = useState(0);
  const [currentSector, setCurrentSector] = useState('');
  const messagesEndRef = useRef(null);

  // Initial loading sequence
  useEffect(() => {
    const welcomeMessages = [
      { role: 'assistant', content: "Namaste! I'm your AI Guide for India's Biomaterials Sector" },
      { role: 'assistant', content: "I have comprehensive data on India's $5.74B biomaterials market (2024)" },
      { role: 'assistant', content: "Let me help you navigate partnerships, policies, and market entry strategies" },
      { role: 'assistant', content: "Type 'ready' when you want to begin exploring opportunities" }
    ];

    const timer = setTimeout(() => {
      setIsInitializing(false);
      
      welcomeMessages.forEach((msg, index) => {
        setTimeout(() => {
          setMessages(prev => [...prev, msg]);
        }, index * 800);
      });

      setTimeout(() => {
        setIsLoading(false);
      }, welcomeMessages.length * 800);
    }, 2000);

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
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      const delay = Math.random() * 1000 + 500;
      await new Promise(resolve => setTimeout(resolve, delay));
      
      let response;
      
      if (conversationStage === 0 && input.toLowerCase().includes('ready')) {
        response = { 
          content: "Which aspect of India's biomaterials sector interests you?\n\n" +
                   "1. Market Overview\n" +
                   "2. Sector Opportunities\n" +
                   "3. Essential Partnerships\n" + 
                   "4. Government Policies\n" +
                   "5. Successful Case Studies\n" +
                   "6. Market Entry Strategies\n" +
                   "7. Local Collaboration Partners"
        };
        setConversationStage(1);
      } 
      else if (conversationStage === 1) {
        const selection = getSelectionFromInput(input);
        if (selection === 'sector') {
          response = { 
            content: "Which biomaterial sector are you targeting?\n\n" +
                     "1. Healthcare ($9.44B by 2030)\n" +
                     "2. Packaging (11.7% CAGR)\n" +
                     "3. Agriculture (990M tonnes biomass)\n" + 
                     "4. Textiles (bio-leather, PLA fibers)"
          };
          setConversationStage(2);
        } else {
          response = generateGeneralResponse(selection, pdfData);
          setConversationStage(0); // Reset to main menu
        }
      }
      else if (conversationStage === 2) {
        const sector = getSectorFromInput(input);
        setCurrentSector(sector);
        response = { 
          content: generateSectorResponse(sector, pdfData)
        };
        setConversationStage(3);
      }
      else if (conversationStage === 3) {
        response = { 
          content: generateStageResponse(input, currentSector, pdfData)
        };
        setConversationStage(0); // Reset to main menu
      }
      else {
        response = { 
          content: extractRelevantContent(input, pdfData) || 
          "I can help with:\n- Market data\n- Partnership options\n- Policy frameworks\n- Entry strategies\n\nWhat would you like to know?"
        };
      }

      setMessages(prev => [...prev, { role: 'assistant', content: response.content }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Let me help you differently. What specific question can I answer about India's biomaterials market?" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper functions
  const getSelectionFromInput = (input) => {
    if (/market|overview|size/i.test(input)) return 'overview';
    if (/sector|opportunity|application/i.test(input)) return 'sector';
    if (/partner|collab|network/i.test(input)) return 'partnership';
    if (/policy|government|regulation/i.test(input)) return 'policy';
    if (/case|study|example/i.test(input)) return 'case';
    if (/entry|strategy|how to enter/i.test(input)) return 'entry';
    if (/local|body|municipal/i.test(input)) return 'local';
    return 'sector';
  };

  const getSectorFromInput = (input) => {
    if (/health|medical/i.test(input)) return 'healthcare';
    if (/packag|consumer/i.test(input)) return 'packaging';
    if (/agricult|farm/i.test(input)) return 'agriculture';
    if (/textile|fashion/i.test(input)) return 'textiles';
    return 'healthcare';
  };

  const generateGeneralResponse = (selection, data) => {
    switch(selection) {
      case 'overview':
        return `MARKET OVERVIEW:\n\n` +
               `Current Size: ${data.marketOverview.currentSize}\n` +
               `Projected 2032 Size: ${data.marketOverview.projectedSize}\n\n` +
               `Key Segments:\n` +
               `• Healthcare: ${data.marketOverview.healthcare.current} (${data.marketOverview.healthcare.cagr} CAGR)\n` +
               `• Biopolymers: ${data.marketOverview.biopolymers.current} (${data.marketOverview.biopolymers.cagr} CAGR)`;
      
      case 'partnership':
        return `ESSENTIAL PARTNERSHIPS:\n\n` +
               `Government:\n- ${data.partnerships.govvernment.join('\n- ')}\n\n` +
               `Research:\n- ${data.partnerships.research.join('\n- ')}\n\n` +
               `Industry:\n- ${data.partnerships.industry.join('\n- ')}`;
      
      case 'policy':
        return `GOVERNMENT POLICIES & SUPPORT:\n\n` +
               `Key Policies:\n- ${data.policies.keyPolicies.join('\n- ')}\n\n` +
               `Funding Schemes:\n- ${data.policies.funding.join('\n- ')}`;
      
      case 'case':
        return `SUCCESSFUL CASE STUDIES:\n\n` +
               data.caseStudies.map(cs => 
                 `${cs.name}: ${cs.description}`
               ).join('\n\n');
      
      case 'entry':
        return `MARKET ENTRY STRATEGIES:\n\n` +
               `Regulatory Requirements:\n- ${data.entryStrategies.regulatory.join('\n- ')}\n\n` +
               `Entry Routes:\n- ${data.entryStrategies.routes.join('\n- ')}\n\n` +
               `Do's:\n- ${data.entryStrategies.dosDonts.dos.join('\n- ')}\n\n` +
               `Don'ts:\n- ${data.entryStrategies.dosDonts.donts.join('\n- ')}`;
      
      case 'local':
        return `LOCAL COLLABORATION PARTNERS:\n\n` +
               `Municipal Bodies:\n- ${data.localBodies.municipal.join('\n- ')}\n\n` +
               `Research Institutions:\n- ${data.localBodies.researchInstitutions.join('\n- ')}\n\n` +
               `Industrial Zones:\n- ${data.localBodies.industrial.join('\n- ')}`;
      
      default:
        return "Let me know which sector you'd like to explore:\n1. Healthcare\n2. Packaging\n3. Agriculture\n4. Textiles";
    }
  };

  const generateSectorResponse = (sector, data) => {
    const sectorData = data.sectors[sector];
    return `${sector.toUpperCase()} SECTOR OPPORTUNITIES:\n\n` +
           `Key Applications:\n- ${sectorData.opportunities.join('\n- ')}\n\n` +
           (sectorData.examples ? `Success Examples:\n- ${sectorData.examples.join('\n- ')}\n\n` : '') +
           (sectorData.statistics ? `Market Stats:\n- ${sectorData.statistics.join('\n- ')}\n\n` : '') +
           `What's your venture stage?\n• Pre-seed\n• Series A\n• Growth Stage`;
  };

  const generateStageResponse = (stage, sector, data) => {
    return `STRATEGIC ROADMAP FOR ${sector.toUpperCase()} (${stage}):\n\n` +
           `1. ESSENTIAL PARTNERSHIPS:\n` +
           `- Government: ${data.partnerships.government.slice(0, 2).join('\n- ')}\n` +
           `- Research: ${data.partnerships.research.slice(0, 2).join('\n- ')}\n` +
           `- Industry: ${data.partnerships.industry.slice(0, 2).join('\n- ')}\n\n` +
           `2. POLICY SUPPORT:\n` +
           `- ${data.policies.keyPolicies.slice(0, 2).join('\n- ')}\n\n` +
           `3. NEXT STEPS:\n` +
           `- Connect with BIRAC for funding\n` +
           `- Validate technology at CSIR labs\n` +
           `- Engage regulatory consultants\n` +
           `- Explore joint venture opportunities`;
  };

  const extractRelevantContent = (query, data) => {
    const keywords = query.toLowerCase().split(/\s+/);
    let relevantInfo = [];
    
    // Check market overview
    if (keywords.some(kw => 
      kw.includes('market') || kw.includes('size') || kw.includes('growth'))) {
      relevantInfo.push(
        `MARKET SIZE:\n` +
        `Current: ${data.marketOverview.currentSize}\n` +
        `Projected 2032: ${data.marketOverview.projectedSize}\n` +
        `Healthcare: ${data.marketOverview.healthcare.current} → ${data.marketOverview.healthcare.projected}\n` +
        `Biopolymers: ${data.marketOverview.biopolymers.current} → ${data.marketOverview.biopolymers.projected}`
      );
    }
    
    // Check policies
    if (keywords.some(kw => 
      kw.includes('policy') || kw.includes('regulation') || kw.includes('government'))) {
      relevantInfo.push(
        `GOVERNMENT POLICIES:\n` +
        `- ${data.policies.keyPolicies.join('\n- ')}`
      );
    }
    
    // Check partnerships
    if (keywords.some(kw => 
      kw.includes('partner') || kw.includes('collab') || kw.includes('network'))) {
      relevantInfo.push(
        `KEY PARTNERSHIPS:\n` +
        `Government:\n- ${data.partnerships.government.slice(0, 3).join('\n- ')}\n` +
        `Research:\n- ${data.partnerships.research.slice(0, 3).join('\n- ')}`
      );
    }
    
    return relevantInfo.length > 0 
      ? "Here's relevant information:\n\n" + relevantInfo.join('\n\n') 
      : null;
  };

  return (
    <div className="app">
      <div className="header">
        <h1>India Biomaterials AI Advisor</h1>
        <p>Market Entry Guidance for Foreign Startups</p>
      </div>
      
      <div className="chat-container">
        {isInitializing ? (
          <div className="initial-loading">
            <div className="loading-spinner"></div>
            <p>Loading 2024 Biomaterials Market Data...</p>
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
                      <span className="assistant-badge">India Biomaterials Advisor</span>
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
                placeholder={isLoading ? "Analyzing biomaterials data..." : "Ask about India's biomaterials market..."}
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