import React from 'react';
import { useEffect, useState } from "react";
import { 
  Building2, 
  History, 
  Image as ImageIcon,
  Loader2,
  PencilLine,
  Save,
  X as XIcon,
  Heart,
  BookOpen,
  HelpCircle,
  Trash2
} from "lucide-react";
import FetchAboutHeading from "../services/AboutPage/FetchAboutHeading";
import Fetchhistoryall from "../services/AboutPage/FetchHistory";
import HistoryForm from "../components/HistoryForm";
import MissionVisionComponent from "../components/MissionVisionComponent";
import FetchCoreAndPrinciple from "../services/AboutPage/FetchCoreAndPrinciple";
import fetchwhykeith from "../services/AboutPage/Whykeith";
import Postaboutheading_content_image from "../services/AboutPage/Postmethods/PostAboutHeadingContentAndImage";

function AboutForm() {
  const [aboutHeading, setAboutHeading] = useState("");
  const [aboutContent, setAboutContent] = useState("");
  const [aboutImage, setAboutImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [historyData, setHistoryData] = useState([]);
  const [principlesData, setPrinciplesData] = useState([]);
  const [whyUsData, setWhyUsData] = useState({
    title: "",
    description: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log('files',file)
    setAboutImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    console.log('submit')
    
    const formData = new FormData();
    formData.append("header", aboutHeading);
    formData.append("content", aboutContent);
    console.log('aboutimage',aboutImage)
    if (aboutImage) {
      formData.append("image", aboutImage);
    }
    console.log('formdata',formData)

    try {
      const response = await Postaboutheading_content_image(formData);
      console.log("Form submitted successfully:", response);
      setIsEditing(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    setIsDeleting(true);
    try {
      // Add your delete API calls here based on the type
      // Example:
      // if (type === 'history') await DeleteHistory(id);
      // if (type === 'principle') await DeletePrinciple(id);
      
      // Update local state after successful deletion
      if (type === 'history') {
        setHistoryData(prev => prev.filter(item => item._id !== id));
      } else if (type === 'principle') {
        setPrinciplesData(prev => prev.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const aboutData = await FetchAboutHeading();
        setAboutHeading(aboutData.header);
        setAboutContent(aboutData.content);
        setImagePreview(aboutData.image || "");

        const history = await Fetchhistoryall();
        setHistoryData(history);

        const principles = await FetchCoreAndPrinciple();
        setPrinciplesData(principles);

        const whyKeith = await fetchwhykeith();
        if (whyKeith && whyKeith.length > 0) {
          setWhyUsData({
            title: whyKeith[0]?.Title || "",
            description: whyKeith[0]?.description || "",
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <main className="px-1 sm:px-4 lg:px-8 py-2 sm:py-4 lg:py-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen w-full">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-2 py-3 sm:p-6 flex items-center justify-center gap-1.5 sm:gap-3">
          <Building2 className="w-5 h-5 sm:w-8 sm:h-8 text-white flex-shrink-0" />
          <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white truncate">
            About Page Management
          </h2>
        </div>

        <div className="px-2 py-3 sm:p-6 space-y-4 sm:space-y-10">
          <section className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-1.5 sm:gap-2 border-b pb-2">
              <BookOpen className="w-4 h-4 sm:w-6 sm:h-6 text-indigo-600 flex-shrink-0" />
              <h3 className="text-base sm:text-xl md:text-2xl font-semibold text-gray-800 truncate">
                About Section
              </h3>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5 sm:gap-2">
                    <PencilLine className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                    Heading
                  </label>
                  <input
                    type="text"
                    value={aboutHeading}
                    onChange={(e) => setAboutHeading(e.target.value)}
                    className={`w-full px-2 sm:px-4 py-2 sm:py-3 rounded-lg border ${
                      !isEditing ? 'bg-gray-50' : 'bg-white'
                    } border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm sm:text-base`}
                    placeholder="Enter heading"
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5 sm:gap-2">
                    <PencilLine className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                    Description
                  </label>
                  <textarea
                    value={aboutContent}
                    onChange={(e) => setAboutContent(e.target.value)}
                    className={`w-full px-2 sm:px-4 py-2 sm:py-3 rounded-lg border ${
                      !isEditing ? 'bg-gray-50' : 'bg-white'
                    } border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm sm:text-base`}
                    placeholder="Enter description"
                    rows={3}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5 sm:gap-2">
                    <ImageIcon className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                    Image
                  </label>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className={`w-full px-2 sm:px-4 py-2 sm:py-3 rounded-lg border ${
                      !isEditing ? 'bg-gray-50' : 'bg-white'
                    } border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm sm:text-base`}
                    disabled={!isEditing}
                  />
                  {imagePreview && (
                    <div className="mt-4 rounded-lg overflow-hidden shadow-lg">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 sm:gap-3">
                {isEditing ? (
                  <>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="flex items-center gap-1.5 px-3 sm:px-6 py-2 sm:py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50 text-sm sm:text-base"
                    >
                      {isSaving ? (
                        <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                      {isSaving ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex items-center gap-1.5 px-3 sm:px-6 py-2 sm:py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 text-sm sm:text-base"
                    >
                      <XIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-1.5 px-3 sm:px-6 py-2 sm:py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 text-sm sm:text-base"
                  >
                    <PencilLine className="w-4 h-4 sm:w-5 sm:h-5" />
                    Edit
                  </button>
                )}
              </div>
            </form>
          </section>

          <section className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2 border-b pb-2">
              <History className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 flex-shrink-0" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 truncate">
                History
              </h3>
            </div>
            <div className="space-y-4 sm:space-y-6">
              {historyData.map((data) => (
                <HistoryForm 
                  key={data._id} 
                  data={data} 
                  onDelete={() => handleDelete(data._id, 'history')}
                  isDeleting={isDeleting}
                />
              ))}
            </div>
          </section>

          <section className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2 border-b pb-2">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 flex-shrink-0" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 truncate">
                Principles & Core Values
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {principlesData.map((item) => (
                <MissionVisionComponent
                  key={item.id}
                  data={item}
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  onDelete={() => handleDelete(item.id, 'principle')}
                  isDeleting={isDeleting}
                />
              ))}
            </div>
          </section>

          <section className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2 border-b pb-2">
              <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 flex-shrink-0" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 truncate">
                Why Us?
              </h3>
            </div>
            <form className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Heading
                </label>
                <input
                  type="text"
                  value={whyUsData.title}
                  onChange={(e) =>
                    setWhyUsData({ ...whyUsData, title: e.target.value })
                  }
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm sm:text-base"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={whyUsData.description}
                  onChange={(e) =>
                    setWhyUsData({ ...whyUsData, description: e.target.value })
                  }
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm sm:text-base"
                  rows={3}
                />
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}

export default AboutForm;