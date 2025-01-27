import { useState, useEffect } from "react";
import EditCoreandprinciple from "../services/AboutPage/Postmethods/EditCoreandPriciple";

function MissionVisionComponent({ data, title, description, image }) {
  const [isEditing, setIsEditing] = useState(false);
  const [aboutData, setAboutData] = useState({ header: title, content: description });
  const [yearBackgroundImage, setYearBackgroundImage] = useState(image);
  const [file, setFile] = useState(null);

  useEffect(() => {
    setYearBackgroundImage(image); // Reset image from prop when the component mounts or image prop changes
  }, [image]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAboutData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsEditing(true);
  };

  const handleBackgroundPhotoChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const fileUrl = URL.createObjectURL(selectedFile); // Convert file to URL
      setYearBackgroundImage(fileUrl); // Update image URL
      setIsEditing(true);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", aboutData.header);
    formData.append("description", aboutData.content);

    if (file) {
      formData.append("image", file);
    }

    try {
      const res = await EditCoreandprinciple(formData, data._id); // Send FormData to backend
      console.log("Response from backend:", res);
      if (res?.imageUrl) {
        setYearBackgroundImage(res.imageUrl); // Update image URL if response contains it
      }
    } catch (error) {
      console.log("Error:", error);
    }

    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setAboutData({ header: title, content: description });
    setYearBackgroundImage(image); // Reset to the initial prop value
    setFile(null);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Heading</label>
          <input
            type="text"
            name="header"
            value={aboutData?.header || ""}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Enter heading"
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Heading Description</label>
          <input
            type="text"
            name="content"
            value={aboutData?.content || ""}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Enter description"
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Heading Image</label>
          <input
            type="file"
            className="w-full p-3 border border-gray-300 rounded-lg"
            onChange={handleBackgroundPhotoChange}
            disabled={!isEditing}
          />
          {yearBackgroundImage && (
            <div className="mt-4">
              <img
                src={yearBackgroundImage}
                alt="Year Background"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="flex justify-start space-x-4 mt-6">
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 bg-red-600 text-white rounded-lg"
          >
            Cancel
          </button>
        </div>
      )}

      {!isEditing && (
        <div className="p-4">
          <button
            type="button"
            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}

export default MissionVisionComponent;
