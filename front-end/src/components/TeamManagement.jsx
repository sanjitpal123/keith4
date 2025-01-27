import React, { useState } from "react";

const TeamManagement = () => {
  // State to manage modal visibility and content
  const [modal, setModal] = useState({
    isOpen: false,
    imageSrc: "",
    title: "",
    description: "",
  });

  // Function to open the modal with specific team member details
  const openModal = (imageSrc, title, description) => {
    setModal({
      isOpen: true,
      imageSrc,
      title,
      description,
    });
  };

  // Function to close the modal
  const closeModal = () => {
    setModal({
      isOpen: false,
      imageSrc: "",
      title: "",
      description: "",
    });
  };

  return (
    <div className="max-w-7xl mx-auto items-center mt-10 px-2 gap-8 py-[80px]">
      {/* Heading */}
      <div>
        <h1 className="text-xl md:text-3xl font-bold border-l-4 border-blue-800 pl-2 text-[#FD5D14] mb-4 md:mb-10">
          Management Team
        </h1>
      </div>

      {/* Team Member Nav */}
      <div className="mx-auto mb-4 text-white text-lg flex justify-around gap-3 max-w-[600px] bg-gradient-to-r from-[#FD5D14] to-[#FF7F50] py-3 px-3 sm:px-5 rounded-lg shadow-lg">
        <button className="relative group px-1 py-1 sm:px-4 sm:py-2 sm:font-semibold text-xs responsive-font sm:text-xl tracking-wide transition-all duration-300">
          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 rounded-lg"></span>
          <span className="relative z-10 group-hover:text-[#FD5D14]">Leaders</span>
        </button>
        <button className="relative group px-1 py-1 sm:px-4 sm:py-2 sm:font-semibold text-xs responsive-font sm:text-xl tracking-wide transition-all duration-300">
          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 rounded-lg"></span>
          <span className="relative z-10 group-hover:text-[#FD5D14]">Founders</span>
        </button>
        <button className="relative group px-1 py-1 sm:px-4 sm:py-2 sm:font-semibold text-xs responsive-font sm:text-xl tracking-wide transition-all duration-300">
          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 rounded-lg"></span>
          <span className="relative z-10 group-hover:text-[#FD5D14]">Investors</span>
        </button>
      </div>

      {/* Team Member Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {/* First Person */}
        <div
          className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
          onClick={() =>
            openModal(
              "https://i.pinimg.com/736x/42/91/53/429153b12ef02ef96ab90c59eabef330.jpg",
              "Mr. Walter White",
              "Founder"
            )
          }
        >
          <img
            src="https://i.pinimg.com/736x/42/91/53/429153b12ef02ef96ab90c59eabef330.jpg"
            alt="Mr. Walter White"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
          <div className="absolute inset-x-0 bottom-0 p-4 text-white">
            <h2 className="sm:text-xl font-bold">Mr. Walter White</h2>
            <p className="text-sm mt-1">Founder</p>
          </div>
        </div>
        <div
          className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
          onClick={() =>
            openModal(
              "https://i.pinimg.com/736x/42/91/53/429153b12ef02ef96ab90c59eabef330.jpg",
              "Mr. Walter White",
              "Founder"
            )
          }
        >
          <img
            src="https://i.pinimg.com/736x/42/91/53/429153b12ef02ef96ab90c59eabef330.jpg"
            alt="Mr. Walter White"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
          <div className="absolute inset-x-0 bottom-0 p-4 text-white">
            <h2 className="sm:text-xl font-bold">Mr. Walter White</h2>
            <p className="text-sm mt-1">Founder</p>
          </div>
        </div>

        {/* Second Person */}
        <div
          className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
          onClick={() =>
            openModal(
              "https://i.pinimg.com/736x/3d/1c/a2/3d1ca29adaeea08c88a9bbfc39ded36b.jpg",
              "Mr. Brad Pitt",
              "Co-Founder"
            )
          }
        >
          <img
            src="https://i.pinimg.com/736x/3d/1c/a2/3d1ca29adaeea08c88a9bbfc39ded36b.jpg"
            alt="Mr. Brad Pitt"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
          <div className="absolute inset-x-0 bottom-0 p-4 text-white">
            <h2 className="sm:text-xl font-bold">Mr. Brad Pitt</h2>
            <p className="text-sm mt-1">Co-Founder</p>
          </div>
        </div>

        {/* Third Person */}
        <div
          className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
          onClick={() =>
            openModal(
              "https://cdn.pixabay.com/photo/2022/09/29/14/57/teacher-7487482_1280.jpg",
              "Mr. John Smith",
              "Investor"
            )
          }
        >
          <img
            src="https://cdn.pixabay.com/photo/2022/09/29/14/57/teacher-7487482_1280.jpg"
            alt="Mr. John Smith"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
          <div className="absolute inset-x-0 bottom-0 p-4 text-white">
            <h2 className="sm:text-xl font-bold">Mr. John Smith</h2>
            <p className="text-sm mt-1">Investor</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modal.isOpen && (
        <div
          id="team-member-modal"
          className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-center items-center"
          onClick={(e) => {
            if (e.target.id === "team-member-modal") closeModal(); // Close modal on background click
          }}
        >
          <div className="bg-white overflow-y-auto h-[300px] sm:h-[500px] w-10/12 sm:w-2/3 lg:w-1/3 rounded-lg overflow-hidden shadow-lg relative">
            {/* Close Button */}
            <button
              id="close-team-modal"
              className="absolute top-3 right-3 bg-gray-200 hover:bg-red-500 text-gray-600 hover:text-white rounded-full w-8 h-8 flex justify-center items-center shadow"
              onClick={closeModal}
            >
              ✕
            </button>

            {/* Modal Content */}
            <div>
              <img
                id="team-modal-image"
                src={modal.imageSrc}
                alt={modal.title}
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
            </div>
            <div className="p-4 text-left">
              <h2 id="team-modal-title" className="text-md sm:text-lg font-bold mb-2">
                {modal.title}
              </h2>
              <p id="team-modal-description" className="text-gray-600 text-xs sm:text-sm">
                {modal.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManagement;
