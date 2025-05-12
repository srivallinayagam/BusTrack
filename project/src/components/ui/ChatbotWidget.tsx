import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  type?: 'greeting' | 'service' | 'smalltalk' | 'default'; // Allowing 'type' to be one of these values
}

const initialBotGreeting: Message = {
  text: "Hi there! I'm your BusTrack AI Assistant. Ready to make your public transit experience awesome! 🚌✨",
  sender: 'bot',
  type: 'greeting', // Ensure the greeting is assigned to 'greeting' type
};

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialBotGreeting]);
  const [inputValue, setInputValue] = useState('');

  const botKnowledge = [
    {
      keywords: ['hi', 'hello', 'hey'],
      responses: [
        'Hi there! Welcome to BusTrack. How can I help you today?',
        'Hello! I\'m your BusTrack AI Assistant. What can I do for you?',
      ],
      type: 'greeting' as const, // Make sure the type is strongly typed
    },
    {
      keywords: ['thank you', 'thanks'],
      responses: [
        'You\'re welcome! Happy to help anytime.',
        'My pleasure! That\'s what I\'m here for.',
      ],
      type: 'smalltalk' as const, // Strongly typed as 'smalltalk'
    },
    {
      keywords: ['routes', 'route'],
      responses: [
        'BusTrack currently supports all major city bus routes, including routes 101-505.',
        'You can find our full route list in the Routes section.',
      ],
      type: 'service' as const, // Strongly typed as 'service'
    },
  ];

  const findBotResponse = (userMessage: string): Message => {
    const normalizedMessage = userMessage.toLowerCase().trim();

    // Find a matching response based on keywords
    for (const knowledge of botKnowledge) {
      if (knowledge.keywords.some(keyword => normalizedMessage.includes(keyword))) {
        return {
          text: knowledge.responses[Math.floor(Math.random() * knowledge.responses.length)],
          sender: 'bot',
          type: knowledge.type, // Ensure it's the correct type
        };
      }
    }

    // Default message if no match found
    return {
      text: "I'm sorry, I didn't quite catch that. Could you please rephrase?",
      sender: 'bot',
      type: 'default', // Ensure 'default' is a valid type
    };
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      text: inputValue,
      sender: 'user',
      type: 'default', // Always 'default' for user messages
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    setTimeout(() => {
      const botResponse = findBotResponse(inputValue);
      setMessages(prev => [...prev, botResponse]);
    }, 800);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleClearChat = () => {
    // Clears all messages and resets the initial bot greeting
    setMessages([initialBotGreeting]);
  };

  return (
    <div className="chatbot-widget fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-xs sm:max-w-sm h-[400px] sm:h-[440px] mb-2 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary-600 text-white p-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <MessageCircle size={18} />
                <h3 className="font-bold text-sm">BusTrack AI</h3>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClearChat}
                  className="text-xs font-semibold border border-white px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 transition duration-150"
                >
                  Clear
                </motion.button>
                <button
                  onClick={toggleChat}
                  className="text-white hover:text-neutral-200 transition"
                  aria-label="Close chat"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-2 overflow-y-auto bg-neutral-50 space-y-2">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`inline-block max-w-[85%] px-3 py-1.5 rounded-lg text-sm ${
                        message.sender === 'user'
                          ? 'bg-primary-600 text-white'
                          : 'bg-white text-neutral-800 border border-neutral-200'
                      }`}
                    >
                      {message.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Input */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t border-neutral-200 flex gap-2 items-center"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Chat with BusTrack AI..."
                className="flex-grow p-3 text-base border rounded px-4 py-2"
              />
              <button
                type="submit"
                className="p-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition flex items-center justify-center"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        className="w-14 h-14 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-lg hover:bg-primary-700 transition"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </motion.button>
    </div>
  );
};

export default ChatbotWidget;
