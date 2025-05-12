import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([
    { text: 'Hi there! How can I help you with bus tracking or ticketing today?', sender: 'bot' },
  ]);
  const [inputValue, setInputValue] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    setMessages([...messages, { text: inputValue, sender: 'user' }]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "I can help you track your bus or purchase a ticket. What would you like to do?",
        "To track your bus, go to the 'Track' page and enter your route number.",
        "You can purchase a ticket by going to the 'Tickets' page and following the instructions.",
        "Need more help? Check out our 'Help' section for FAQs.",
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages(prev => [...prev, { text: randomResponse, sender: 'bot' }]);
    }, 1000);
  };

  return (
    <div className="chatbot-widget">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-lg shadow-lg w-[320px] sm:w-[350px] h-[450px] mb-4 flex flex-col overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-primary-600 text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <MessageCircle size={20} />
                <h3 className="font-medium">BusTrack Assistant</h3>
              </div>
              <button
                onClick={toggleChat}
                className="text-white hover:text-neutral-200 transition"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-neutral-50">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-3 ${
                    message.sender === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <div
                    className={`inline-block px-4 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-neutral-800 border border-neutral-200'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-neutral-200 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="input flex-1 text-sm"
              />
              <button
                type="submit"
                className="p-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        className="w-14 h-14 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-lg hover:bg-primary-700 transition"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
    </div>
  );
};

export default ChatbotWidget;