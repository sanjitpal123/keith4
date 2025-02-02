import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion'; // Import motion from framer-motion

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

  const fadeLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  return (
    <div>
      {/* Text Section with animation */}
      <motion.div initial="hidden" whileInView="visible" variants={fadeLeft} viewport={{ amount: "some" }} className="w-full bg-white h-auto md:min-h-[70vh] flex justify-center flex-col md:flex-row px-6 py-12 md:px-12 md:py-20">
        <div className="w-full md:w-[50%] flex flex-col justify-center p-6 md:p-10 text-center md:text-left bg-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-[#FD5D14]">Water Distribution</h1>
          <p className="text-sm sm:text-base md:text-lg text-[#02245B] leading-relaxed">
            {/* Content */}
          </p>
        </div>

        {/* Image Section with animation */}
        <motion.div initial="hidden" whileInView="visible" variants={fadeRight} viewport={{ amount: "some" }} className="w-full md:w-[50%] relative mt-8 md:mt-0">
          <img src="./assets/gifs/Water.gif" alt="Water Distribution" className="w-full h-full object-cover" />
        </motion.div>
      </motion.div>

      {/* FAQ Section with animation */}
      <motion.div initial="hidden" whileInView="visible" variants={fadeLeft} viewport={{ amount: "some" }} className="w-full bg-gray-100 py-16 px-6 md:px-12">
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

          {/* Repeat similar structure for other FAQ questions */}
        </div>
      </motion.div>
    </div>
  );
}

export default Product;
