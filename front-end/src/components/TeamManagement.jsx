import React, { useEffect, useState } from "react";
import FetchManagement from "../services/AboutPage/FetchManagement";

const TeamManagement = () => {
  // State to manage active category, members from the backend, and modal visibility
  const [activeCategory, setActiveCategory] = useState("Founders");
  const [members, setMembers] = useState([]);
  const [modal, setModal] = useState({
    isOpen: false,
    imageSrc: "",
    title: "",
    role:"",
    description: "",
  });

  // Fetch members from the backend
  const fetchingMembers = async () => {
    try {
      const res = await FetchManagement();
      console.log("hi",res)
      setMembers(res); // Store fetched data in the state
    } catch (err) {
      console.error("Error fetching team members:", err);
    }
  };

  // Filtered team members based on active category
  const filteredTeamMembers = members.filter(
    (member) =>
      (activeCategory === "Founders" &&
        ["Founder", "Co-Founder"].includes(member.position)) ||
      (activeCategory === "Leaders" && member.position === "Leader") ||
      (activeCategory === "Investors" && member.position === "Investor")
  );

  // Function to open modal
  const openModal = (imageSrc, title, role, description) => {
    setModal({
      isOpen: true,
      imageSrc,
      title,
      role,
      description,
    });
  };

  // Function to close modal
  const closeModal = () => {
    setModal({
      isOpen: false,
      imageSrc: "",
      title: "",
      description: "",
    });
  };

  // Fetch members on component mount
  useEffect(() => {
    fetchingMembers();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-[#FD5D14] mb-6 text-center">
        Meet Our Team
      </h1>

      {/* Navigation Buttons */}
      <div className="w-full mb-6">
  <div className="flex justify-center">
    <div className="flex overflow-x-auto gap-3 p-2 rounded-md shadow-md bg-gradient-to-r from-[#F9F9F9] to-[#EAEAEA]">
      {["Founders", "Leaders", "Investors"].map((category) => (
        <button
          key={category}
          className={`whitespace-nowrap px-4 py-2 rounded-md font-medium transition-all duration-300 shadow-sm text-xs sm:text-sm md:text-base lg:text-lg ${
            activeCategory === category
              ? "bg-gradient-to-r from-[#FD5D14] to-[#FF7F50] text-white scale-105 shadow-md"
              : "bg-white text-gray-600 hover:bg-gradient-to-r hover:from-[#FD5D14] hover:to-[#FF7F50] hover:text-white"
          }`}
          onClick={() => setActiveCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  </div>
</div>


      {/* Team Members Grid */}
      <div className="min-h-[100px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {
    filteredTeamMembers.length === 0 ? (
      <div className="col-span-full flex justify-center items-center min-h-[100px]">
        <span className="loading loading-spinner text-warning text-6xl sm:text-8xl"></span>
      </div>
    ) : (
      filteredTeamMembers.map((member) => (
        <div
          key={member._id}
          className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
          onClick={() =>
            openModal(member.image, member.name, member.position, member.description)
          }
        >
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
          <div className="absolute inset-x-0 bottom-0 p-4 text-white">
            <h2 className="text-lg font-bold">{member.name}</h2>
            <p className="text-sm mt-1">{member.position}</p>
          </div>
        </div>
      ))
    )
  }
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
          <div className="bg-white overflow-y-auto h-[300px] sm:h-[500px] w-10/12 sm:w-2/3 lg:w-1/3 rounded-lg shadow-lg relative">
  {/* Close Button */}
  <button
    id="close-team-modal"
    className="absolute top-3 right-3 bg-gray-200 hover:bg-red-500 text-gray-600 hover:text-white rounded-full w-8 h-8 flex justify-center items-center shadow transition duration-300"
    onClick={closeModal}
  >
    ✕
  </button>

  {/* Modal Image */}
  <div>
    <img
      id="team-modal-image"
      src={modal.imageSrc}
      alt={modal.title}
      className="w-full h-auto rounded-t-lg shadow-lg object-cover"
    />
  </div>

  {/* Modal Content */}
  <div className="p-6 text-left">
    {/* Title */}
    <h2
      id="team-modal-title"
      className="text-2xl font-extrabold text-gray-800 mb-4 text-center"
    >
      {modal.title}
    </h2>

    {/* Role */}
    <p className="text-sm text-[#FD5D14] font-medium mb-2 text-center uppercase tracking-wide">
      {modal.role}
    </p>

    {/* Description */}
    <p
      id="team-modal-description"
      className="text-gray-600 text-base leading-relaxed tracking-wide"
    >
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
