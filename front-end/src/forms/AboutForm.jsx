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
  Trash2,
  Plus
} from "lucide-react";
import FetchAboutHeading from "../services/AboutPage/FetchAboutHeading";
import Fetchhistoryall from "../services/AboutPage/FetchHistory";
import HistoryForm from "../components/HistoryForm";
import MissionVisionComponent from "../components/MissionVisionComponent";
import FetchCoreAndPrinciple from "../services/AboutPage/FetchCoreAndPrinciple";
import fetchwhykeith from "../services/AboutPage/Whykeith";
import Postaboutheading_content_image from "../services/AboutPage/Postmethods/PostAboutHeadingContentAndImage";
import DeleteHistory from '../services/AboutPage/DeleteHistory';
import AddNewHistory from '../services/AboutPage/Postmethods/AddHistory';
import WhykeithPost from '../services/AboutPage/Postmethods/Postwhykeith';

function AboutForm() {
  // State for modals
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showPrincipleModal, setShowPrincipleModal] = useState(false);
  
  // State for new items
  const [newHistory, setNewHistory] = useState({
    title: "",
    description: "",
    date: ""
  });
  
  const [newPrinciple, setNewPrinciple] = useState({
    title: "",
    description: "",
    image: null
  });

  // Existing state
  const [aboutHeading, setAboutHeading] = useState("");
  const [aboutContent, setAboutContent] = useState("");
  const [aboutImage, setAboutImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditingWhyUs, setIsEditingWhyUs] = useState(false);
  const [isAddingHistory, setIsAddingHistory] = useState(false);
  const [isAddingPrinciple, setIsAddingPrinciple] = useState(false);
  const [isSavingWhyUs, setIsSavingWhyUs] = useState(false);

  const [historyData, setHistoryData] = useState([]);
  const [principlesData, setPrinciplesData] = useState([]);
  const [whyUsData, setWhyUsData] = useState({
    title: "",
    description: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAboutImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    
    setIsSaving(true);
    const formData = new FormData();
    formData.append("header", aboutHeading);
    formData.append("content", aboutContent);
    if (aboutImage) {
      formData.append("image", aboutImage);
    }

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
      if (type === 'history') {
        const res = await DeleteHistory(id);
        setHistoryData(prev => prev.filter(item => item._id !== id));
      } else if (type === 'principle') {
        // Add your API call here
        setPrinciplesData(prev => prev.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleAddHistory = async (e) => {
    e.preventDefault();
    setIsAddingHistory(true);
    try {
      // Add your API call here to save new history
      // const response = await AddHistory(newHistory);
      // setHistoryData(prev => [...prev, response]);
      console.log('historydata',newHistory)
      const res=await AddNewHistory(newHistory);
      alert(res.message);
      setShowHistoryModal(false);
      setNewHistory({ title: "", description: "", date: "" });
    } catch (error) {
      console.error("Error adding history:", error);
    } finally {
      setIsAddingHistory(false);
    }
  };

  const handleAddPrinciple = async (e) => {
    e.preventDefault();
    setIsAddingPrinciple(true);
    try {
      // Add your API call here to save new principle
      // const response = await AddPrinciple(newPrinciple);
      // setPrinciplesData(prev => [...prev, response]);
      setShowPrincipleModal(false);
      setNewPrinciple({ title: "", description: "", image: null });
    } catch (error) {
      console.error("Error adding principle:", error);
    } finally {
      setIsAddingPrinciple(false);
    }
  };

  const handleWhyUsSubmit = async (e) => {
    e.preventDefault();
    setIsSavingWhyUs(true);
    try {
      // Add your API call here to save Why Us data
      console.log('fomdata',whyUsData)
      const res=await WhykeithPost(whyUsData);
      alert(res.message);
      setIsEditingWhyUs(false);
    } catch (error) {
      console.error("Error saving Why Us data:", error);
    } finally {
      setIsSavingWhyUs(false);
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
        <div className="flex items-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          <span className="text-lg font-medium text-gray-700">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto p-2 sm:p-4 lg:p-8">
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 sm:p-6">
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <Building2 className="w-5 h-5 sm:w-8 sm:h-8 text-white flex-shrink-0" />
              <h2 className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white truncate">
                About Page Management
              </h2>
            </div>
          </div>

          <div className="p-3 sm:p-6 space-y-6 sm:space-y-10">
            {/* About Section */}
            <section className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 border-b pb-2">
                <BookOpen className="w-4 h-4 sm:w-6 sm:h-6 text-indigo-600 flex-shrink-0" />
                <h3 className="text-sm sm:text-xl md:text-2xl font-semibold text-gray-800 truncate">
                  About Section
                </h3>
              </div>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                if (!isEditing) {
                  setIsEditing(true);
                }
              }} className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <PencilLine className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                      Heading
                    </label>
                    <input
                      type="text"
                      value={aboutHeading}
                      onChange={(e) => setAboutHeading(e.target.value)}
                      className={`w-full px-3 py-2 text-sm rounded-lg border ${
                        !isEditing ? 'bg-gray-50' : 'bg-white'
                      } border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                      placeholder="Enter heading"
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <PencilLine className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                      Description
                    </label>
                    <textarea
                      value={aboutContent}
                      onChange={(e) => setAboutContent(e.target.value)}
                      className={`w-full px-3 py-2 text-sm rounded-lg border ${
                        !isEditing ? 'bg-gray-50' : 'bg-white'
                      } border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                      placeholder="Enter description"
                      rows={3}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                      Image
                    </label>
                    <input
                      type="file"
                      onChange={handleImageChange}
                      className={`w-full px-3 py-2 text-sm rounded-lg border ${
                        !isEditing ? 'bg-gray-50' : 'bg-white'
                      } border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                      disabled={!isEditing}
                    />
                    {imagePreview && (
                      <div className="mt-2 rounded-lg overflow-hidden shadow-lg">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSaving}
                        className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Saving...</span>
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            <span>Save</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="flex items-center gap-1.5 px-3 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <XIcon className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </>
                  ) : (
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 px-3 py-2 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      <PencilLine className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                  )}
                </div>
              </form>
            </section>

            {/* History Section */}
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 sm:w-6 sm:h-6 text-indigo-600 flex-shrink-0" />
                  <h3 className="text-sm sm:text-xl md:text-2xl font-semibold text-gray-800 truncate">
                    History
                  </h3>
                </div>
                <button
                  onClick={() => setShowHistoryModal(true)}
                  className="flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-2 bg-indigo-600 text-white text-xs sm:text-sm rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Add History</span>
                </button>
              </div>
              <div className="space-y-4">
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

            {/* Principles Section */}
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-indigo-600 flex-shrink-0" />
                  <h3 className="text-sm sm:text-xl md:text-2xl font-semibold text-gray-800 truncate">
                    Principles & Core Values
                  </h3>
                </div>
                <button
                  onClick={() => setShowPrincipleModal(true)}
                  className="flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-2 bg-indigo-600 text-white text-xs sm:text-sm rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Add Principle</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {principlesData.map((item) => (
                  <MissionVisionComponent
                    key={item.id}
                    data={item}
                    title={item.title}
                    description={item.description}
                    image={item.image}
                    onDelete={() => handleDelete(item._id, 'principle')}
                    isDeleting={isDeleting}
                  />
                ))}
              </div>
            </section>

            {/* Why Us Section */}
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 sm:w-6 sm:h-6 text-indigo-600 flex-shrink-0" />
                  <h3 className="text-sm sm:text-xl md:text-2xl font-semibold text-gray-800 truncate">
                    Why Us?
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  {!isEditingWhyUs ? (
                    <button
                      onClick={() => setIsEditingWhyUs(true)}
                      className="flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-2 bg-gray-600 text-white text-xs sm:text-sm rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      <PencilLine className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Edit</span>
                    </button>
                  ) : null}
                  <button
                    onClick={() => handleDelete(null, 'whyUs')}
                    disabled={isDeleting}
                    className="flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-2 bg-red-500 text-white text-xs sm:text-sm rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                  >
                    {isDeleting ? (
                      <>
                        <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                        <span>Deleting...</span>
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Delete</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              <form onSubmit={handleWhyUsSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                    disabled={!isEditingWhyUs}
                    className={`w-full px-3 py-2 text-sm rounded-lg border ${
                      !isEditingWhyUs ? 'bg-gray-50' : 'bg-white'
                    } border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
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
                    disabled={!isEditingWhyUs}
                    className={`w-full px-3 py-2 text-sm rounded-lg border ${
                      !isEditingWhyUs ? 'bg-gray-50' : 'bg-white'
                    } border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                    rows={3}
                  />
                </div>
                {isEditingWhyUs && (
                  <div className="lg:col-span-2 flex gap-2">
                    <button
                      type="submit"
                      disabled={isSavingWhyUs}
                      className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                      {isSavingWhyUs ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          <span>Save</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingWhyUs(false)}
                      className="flex items-center gap-1.5 px-3 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <XIcon className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </form>
            </section>
          </div>
        </div>
      </div>

      {/* Add History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New History</h3>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddHistory} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={newHistory.title}
                  onChange={(e) => setNewHistory({ ...newHistory, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={newHistory.description}
                  onChange={(e) => setNewHistory({ ...newHistory, description: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={newHistory.date}
                  onChange={(e) => setNewHistory({ ...newHistory, date: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowHistoryModal(false)}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  <XIcon className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
                <button
                  type="submit"
                  disabled={isAddingHistory}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {isAddingHistory ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Adding...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add History</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Principle Modal */}
      {showPrincipleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Principle</h3>
              <button
                onClick={() => setShowPrincipleModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddPrinciple} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={newPrinciple.title}
                  onChange={(e) => setNewPrinciple({ ...newPrinciple, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={newPrinciple.description}
                  onChange={(e) => setNewPrinciple({ ...newPrinciple, description: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <input
                  type="file"
                  onChange={(e) => setNewPrinciple({ ...newPrinciple, image: e.target.files[0] })}
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-indigo-50 file:text-indigo-700
                    hover:file:bg-indigo-100"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPrincipleModal(false)}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  <XIcon className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
                <button
                  type="submit"
                  disabled={isAddingPrinciple}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {isAddingPrinciple ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Adding...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add Principle</span>
                    </>
                  )}
                </button>
              </div>
            </form> 
          </div>
        </div>
      )}
    </main>
  );
}

export default AboutForm;