import { useState } from 'react';
import { X, Send, Bot } from 'lucide-react';

const AiBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI Health Assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    // Add user message
    setMessages(prev => [...prev, { id: Date.now(), text: inputMessage, sender: 'user' }]);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        text: "I understand you're looking for health advice. Let me ask you a few questions to better assist you.", 
        sender: 'bot' 
      }]);
    }, 1000);
    
    setInputMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating AI Bot Button */}
      <div className="fixed bottom-20 right-4 md:bottom-24 md:right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary hover:bg-primary/90 text-white p-3 md:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 group"
          aria-label="Open AI Health Assistant"
        >
          <Bot className="w-6 h-6 md:w-7 md:h-7" />
        </button>
      </div>

      {/* AI Bot Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-end p-4 md:items-center md:justify-center">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md h-96 md:h-[500px] flex flex-col">
            {/* Header */}
            <div className="bg-primary text-white p-4 rounded-t-xl flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-white p-1 rounded-full mr-3">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Health Assistant</h3>
                  <p className="text-xs text-primary/80">AI-powered healthcare support</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-white hover:text-primary/80"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs md:max-w-sm rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-primary text-white rounded-br-none'
                          : 'bg-gray-200 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your health question..."
                  className="flex-1 border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={inputMessage.trim() === ''}
                  className="bg-primary hover:bg-primary/90 disabled:bg-primary/70 text-white py-2 px-4 rounded-r-lg transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AiBot;