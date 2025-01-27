import React, { useState, useRef } from 'react';

function Product() {
  const [activeFAQs, setActiveFAQs] = useState([]);

  const faqRefs = useRef([]);

  const toggleFAQ = (faqNumber) => {
    const newActiveFAQs = [...activeFAQs];

    if (newActiveFAQs.includes(faqNumber)) {
      newActiveFAQs.splice(newActiveFAQs.indexOf(faqNumber), 1);
    } else {
      newActiveFAQs.push(faqNumber);
    }

    setActiveFAQs(newActiveFAQs);

    // Access DOM elements using refs
    const answer = faqRefs.current[faqNumber - 1]?.querySelector('.faq-answer');
    const icon = faqRefs.current[faqNumber - 1]?.querySelector('.faq-icon');

    if (answer && icon) {
      if (newActiveFAQs.includes(faqNumber)) {
        answer.classList.remove('hidden');
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
      } else {
        answer.classList.add('hidden');
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
      }
    }
  };

  return (
    <div>
      <div className="w-full bg-white h-auto md:min-h-[70vh] flex justify-center flex-col md:flex-row px-6 py-12 md:px-12 md:py-20">
        {/* Text Section */}
        <div className="w-full md:w-[50%] flex flex-col justify-center p-6 md:p-10 text-center md:text-left bg-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-[#FD5D14]">Water Distribution</h1>
          <p className="text-sm sm:text-base md:text-lg text-[#02245B] leading-relaxed">
            Water distribution systems are vital for delivering clean and potable water to communities, businesses, and industries. These systems consist of an intricate network of pipes, pumps, valves, reservoirs, and treatment plants that work harmoniously to ensure uninterrupted water supply.
            <br />
            <br />
            By incorporating advanced technologies like smart meters and automation, modern systems optimize performance, reduce water waste, and manage pressure to prevent leaks. Sustainable practices, including rainwater harvesting and desalination, play a crucial role in addressing water scarcity challenges.
            <br />
            <br />
            Reliable and equitable access to water is fundamental to public health, economic growth, and environmental sustainability, making water distribution a cornerstone of urban and rural development.
          </p>
        </div>
        {/* Image Section */}
        <div className="w-full md:w-[50%] relative mt-8 md:mt-0">
          <img src="./assets/gifs/Water.gif" alt="Water Distribution" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full bg-gray-100 py-16 px-6 md:px-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12 text-[#FD5D14]">Frequently Asked Questions</h2>
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Question 1 */}
          <div className="border-b border-white py-6 px-6 rounded-lg bg-[#1A3D60] hover:bg-[#FD5D14] transition-all duration-300" ref={(el) => (faqRefs.current[0] = el)}>
            <button
              className="w-full text-left text-xl md:text-2xl text-white focus:outline-none flex justify-between items-center"
              onClick={() => toggleFAQ(1)}
            >
              <span className="font-semibold">What is water distribution?</span>
              <i className="fas fa-chevron-down text-white faq-icon"></i>
            </button>
            <div className="hidden mt-4 text-lg text-white pl-6 faq-answer">
              Water distribution involves the transportation of water from a source to consumers through a network of pipes, reservoirs, pumps, and treatment plants.
            </div>
          </div>

          {/* Question 2 */}
          <div className="border-b border-white py-6 px-6 rounded-lg bg-[#1A3D60] hover:bg-[#FD5D14] transition-all duration-300" ref={(el) => (faqRefs.current[1] = el)}>
            <button
              className="w-full text-left text-xl md:text-2xl text-white focus:outline-none flex justify-between items-center"
              onClick={() => toggleFAQ(2)}
            >
              <span className="">How does water distribution affect our daily lives?</span>
              <i className="fas fa-chevron-down text-white faq-icon"></i>
            </button>
            <div className="hidden mt-4 text-white text-lg pl-6 faq-answer">
              Water distribution ensures that clean water is available for drinking, sanitation, industrial use, and agriculture, which is essential for public health and economic activities.
            </div>
          </div>

          {/* Question 3 */}
          <div className="border-b border-white py-6 px-6 rounded-lg bg-[#1A3D60] hover:bg-[#FD5D14] transition-all duration-300" ref={(el) => (faqRefs.current[2] = el)}>
            <button
              className="w-full text-left text-xl md:text-2xl text-white focus:outline-none flex justify-between items-center"
              onClick={() => toggleFAQ(3)}
            >
              <span>What technologies are used in water distribution?</span>
              <i className="fas fa-chevron-down text-white faq-icon"></i>
            </button>
            <div className="hidden mt-4 text-white text-lg pl-6 faq-answer">
              Advanced technologies include smart meters, automation, pressure management systems, and real-time monitoring to improve efficiency and reduce water waste.
            </div>
          </div>

          {/* Question 4 */}
          <div className="border-b border-white py-6 px-6 rounded-lg bg-[#1A3D60] hover:bg-[#FD5D14] transition-all duration-300" ref={(el) => (faqRefs.current[3] = el)}>
            <button
              className="w-full text-left text-xl md:text-2xl text-white focus:outline-none flex justify-between items-center"
              onClick={() => toggleFAQ(4)}
            >
              <span>Why is water distribution sustainability important?</span>
              <i className="fas fa-chevron-down text-white faq-icon"></i>
            </button>
            <div className="hidden mt-4 text-white text-lg pl-6 faq-answer">
              Sustainability in water distribution ensures a continuous, reliable water supply, reduces waste, and addresses challenges such as water scarcity and climate change.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;