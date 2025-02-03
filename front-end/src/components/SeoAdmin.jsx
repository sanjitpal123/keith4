import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Edit2, Trash2, X, Settings, Search, Loader2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import Getseo from '../services/FetchSeo';
import Addnewseo from "../services/addnewseo";
import EditMeta from "../services/EditMeta";
import DeleteMeta from "../services/deletingMeta";

const AdminSEO = () => {
  const [metadatas, setMetadata] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemtoedit, setitemtoedit]=useState("");
  const [ isModalOpenforedit,setIsModalOpenforedit]=useState(false)
  const [typesofseoforupdate, settypesofseoforupdate]=useState("");
  const [takingtitlefromedit, settakingtitlefromedit]=useState("");
  const[takingdescriptionfromedit, settakingdescriptionfromedit]=useState("");
  const [takingauthorfromedit, settakingauthorfromedit]=useState("");
  const[takingkeywordsfromedit, settakingkeywordsfromedit]=useState("");
  const[idtoedit, setidtoedit]=useState(null);
  const[updating, setupdating]=useState(false);
  const [loading, setLoading] = useState(false);
  const [editTags, setEditTags] = useState([]);
  const [newTags, setNewTags] = useState([]);
  const [newKeywordInput, setNewKeywordInput] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    keywords: "",
    author: "",
    typesofseo: ""
  });

  async function fetchMetadata() {
    setLoading(true);
    try {
      const data = await Getseo();
      setMetadata(data);
      toast.success('SEO data loaded successfully');
    } catch (error) {
      console.error('Error fetching SEO data:', error);
      toast.error('Failed to load SEO data');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMetadata();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNewKeywordKeyDown = (e) => {
    if (e.key === 'Enter' && newKeywordInput.trim()) {
      e.preventDefault();
      setNewTags([...newTags, newKeywordInput.trim()]);
      setNewKeywordInput("");
    }
  };

  const removeNewTag = (indexToRemove) => {
    setNewTags(newTags.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Adding new SEO entry...');
    try {
      const dataToSubmit = {
        ...formData,
        keywords: newTags.join(', ')
      };
      const data = await Addnewseo(dataToSubmit);
      await fetchMetadata();
      setIsModalOpen(false);
      setFormData({
        title: "",
        description: "",
        keywords: "",
        author: "",
        typesofseo: ""
      });
      setNewTags([]);
      toast.success('SEO entry added successfully', { id: loadingToast });
    } catch (error) {
      console.error("Error updating metadata", error);
      toast.error('Failed to add SEO entry', { id: loadingToast });
    }
  };

  const groupedMetadata = metadatas.reduce((acc, item) => {
    const type = item.typesofseo || 'Uncategorized';
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(item);
    return acc;
  }, {});

  function handleedit(item) {
    setIsModalOpenforedit(true);
    setitemtoedit(item);
    setidtoedit(item._id);
    settakingauthorfromedit(item.author);
    settakingdescriptionfromedit(item.description);
    settakingkeywordsfromedit("");
    setEditTags(item.keywords.split(',').map(k => k.trim()).filter(k => k));
    settakingtitlefromedit(item.title);
    settypesofseoforupdate(item.typesofseo);
  }

  const handleKeywordKeyDown = (e) => {
    if (e.key === 'Enter' && takingkeywordsfromedit.trim()) {
      e.preventDefault();
      setEditTags([...editTags, takingkeywordsfromedit.trim()]);
      settakingkeywordsfromedit("");
    }
  };

  const removeTag = (indexToRemove) => {
    setEditTags(editTags.filter((_, index) => index !== indexToRemove));
  };

  const filteredGroups = Object.entries(groupedMetadata).filter(([type, items]) =>
    type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    items.some(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  async function handleSubmit1(e) {
    e.preventDefault();
    const loadingToast = toast.loading('Updating SEO entry...');
    const obj = {
      title: takingtitlefromedit,
      description: takingdescriptionfromedit,
      author: takingauthorfromedit,
      typesofseo: typesofseoforupdate,
      keywords: editTags.join(', ')
    };
    
    setupdating(true);
    try {
      await EditMeta(obj, idtoedit);
      toast.success('SEO entry updated successfully', { id: loadingToast });
      setupdating(false);
      fetchMetadata();
      setIsModalOpenforedit(false);
    } catch(error) {
      console.log('error', error);
      toast.error('Failed to update SEO entry', { id: loadingToast });
      setupdating(false);
    }
  }

  async function handledelete(id) {
    const loadingToast = toast.loading('Deleting SEO entry...');
    try {
      await DeleteMeta(id);
      toast.success('SEO entry deleted successfully', { id: loadingToast });
      fetchMetadata();
    } catch(error) {
      console.log('error', error);
      toast.error('Failed to delete SEO entry', { id: loadingToast });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto p-3 sm:p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Settings className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">SEO Management</h1>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search SEO entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition-all transform hover:scale-105 shadow-sm whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              <span>Add New SEO</span>
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredGroups.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <p className="text-gray-500">No SEO entries found</p>
              </div>
            ) : (
              filteredGroups.map(([type, items]) => (
                <div key={type} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                  <div className="border-b border-gray-200 bg-gray-50 px-4 sm:px-6 py-4">
                    <h2 className="text-xl font-semibold text-gray-800 capitalize">{type}</h2>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {items.map((item) => (
                      <div key={item._id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                          <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                          <div className="flex gap-2">
                            <button 
                              className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                              onClick={() => handleedit(item)}
                            >
                              <Edit2 className="w-5 h-5" />
                            </button>
                            <button 
                              className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                              onClick={() => handledelete(item._id)}
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Description</p>
                            <p className="text-gray-900">{item.description}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Keywords</p>
                            <p className="text-gray-900">{item.keywords}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Author</p>
                            <p className="text-gray-900">{item.author}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Last Updated</p>
                            <p className="text-gray-900">
                              {new Date(item.updatedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Add Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4 sticky top-0 bg-white">
                <h3 className="text-xl font-semibold text-gray-900">Add New SEO Entry</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type of SEO
                  </label>
                  <select
                    name="typesofseo"
                    value={formData.typesofseo}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select type</option>
                    <option value="Seo for home page">SEO for home page</option>
                    <option value="seo for about page">SEO for about page</option>
                    <option value="seo for product page">SEO for product page</option>
                    <option value="seo for infrastructure page">SEO for infrastructure page</option>
                    <option value="seo for contact page">SEO for contact page</option>
                    <option value="seo for quality page">SEO for quality page</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Keywords
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {newTags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md flex items-center gap-1"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeNewTag(index)}
                          className="hover:text-blue-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={newKeywordInput}
                    onChange={(e) => setNewKeywordInput(e.target.value)}
                    onKeyDown={handleNewKeywordKeyDown}
                    placeholder="Type and press Enter to add keywords"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4 sticky bottom-0 bg-white border-t border-gray-200 -mx-6 -mb-6 p-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
                  >
                    Save SEO Entry
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {isModalOpenforedit && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4 sticky top-0 bg-white">
                <h3 className="text-xl font-semibold text-gray-900">{ `Update ${itemtoedit.typesofseo}`}</h3>
                <button
                  onClick={() => setIsModalOpenforedit(false)}
                  className="text-gray-400 hover:text-gray-500 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleSubmit1} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type of SEO
                  </label>
                  <select
                    name="typesofseo"
                    value={typesofseoforupdate}
                    onChange={(e)=>settypesofseoforupdate(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select type</option>
                    <option value="Seo for home page">SEO for home page</option>
                    <option value="seo for about page">SEO for about page</option>
                    <option value="seo for product page">SEO for product page</option>
                    <option value="seo for infrastructure page">SEO for infrastructure page</option>
                    <option value="seo for contact page">SEO for contact page</option>
                    <option value="seo for quality page">SEO for quality page</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={takingtitlefromedit}
                    onChange={(e)=>settakingtitlefromedit(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={takingdescriptionfromedit}
                    onChange={(e)=>settakingdescriptionfromedit(e.target.value)}
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Keywords
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {editTags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md flex items-center gap-1"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(index)}
                          className="hover:text-blue-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    name="keywords"
                    value={takingkeywordsfromedit}
                    onChange={(e) => settakingkeywordsfromedit(e.target.value)}
                    onKeyDown={handleKeywordKeyDown}
                    placeholder="Type and press Enter to add keywords"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={takingauthorfromedit}
                    onChange={(e)=>settakingauthorfromedit(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4 sticky bottom-0 bg-white border-t border-gray-200 -mx-6 -mb-6 p-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpenforedit(false)}
                    className="px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
                    disabled={updating}
                  >
                    {updating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSEO; 