import { useState } from 'react';

const FAQ = () => {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (item) => {
    setOpenItem(openItem === item ? null : item);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-gray-500">Got a question? We've got answers.</p>
        </div>
        <div className="border-t border-gray-200" data-orientation="vertical">
          {faqData.map((faq, index) => (
            <div key={index} className="border-b">
              <h3 className="flex">
                <button
                  type="button"
                  aria-controls={`faq-${index}`}
                  aria-expanded={openItem === index}
                  onClick={() => toggleItem(index)}
                  className="flex-1 font-medium transition-all hover:underline flex items-center justify-between w-full py-4 text-left text-gray-900 hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75"
                >
                  <span className="text-lg font-medium">{faq.question}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`lucide lucide-chevron-down w-6 h-6 text-gray-400 transform transition-transform duration-300 ${openItem === index ? 'rotate-180' : ''}`}
                  >
                    <path d="m6 9 6 6 6-6"></path>
                  </svg>
                </button>
              </h3>
              <div
                id={`faq-${index}`}
                hidden={openItem !== index}
                role="region"
                aria-labelledby={`faq-${index}`}
                className={`overflow-hidden text-sm transition-all ${openItem === index ? 'animate-accordion-down' : 'animate-accordion-up'} py-4 text-gray-500`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const faqData = [
  {
    question: 'What is your car rental process?',
    answer: 'Our car rental process is simple. You can book online, choose your preferred vehicle, and pick it up at your convenience.',
  },
  {
    question: 'What are your rental rates?',
    answer: 'Our rental rates vary depending on the vehicle model and rental duration. Please check our website for detailed pricing.',
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'You can cancel your booking up to 24 hours before the pickup time without any charges.',
  },
  {
    question: 'What insurance coverage do you offer?',
    answer: 'We offer comprehensive insurance coverage, including collision damage waiver and theft protection.',
  },
  {
    question: 'How do I extend my rental?',
    answer: 'To extend your rental, please contact our customer service or manage your booking online through our portal.',
  },
];

export default FAQ;
