import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Edit2, Trash2, X, Settings, Search } from 'lucide-react';
import Getseo from '../services/FetchSeo';
import Addnewseo from "../services/addnewseo";

const AdminSEO = () => {
  const [metadatas, setMetadata] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemtoedit, setitemtoedit]=useState("");
  const [ isModalOpenforedit,setIsModalOpenforedit]=useState(false)
  const [typesofseoforupdate, settypesofseoforupdate]=useState(itemtoedit?.typesofseo);
  const [takingtitlefromedit, settakingtitlefromedit]=useState(itemtoedit?.title);
  const[takingdescriptionfromedit, settakingdescriptionfromedit]=useState(itemtoedit?.description);
  const [takingauthorfromedit, settakingauthorfromedit]=useState(itemtoedit?.author);
  const[takingkeywordsfromedit, settakingkeywordsfromedit]=useState(itemtoedit?.keywords);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    keywords: "",
    author: "",
    typesofseo: ""
  });

  async function fetchMetadata() {
    try {
      const data = await Getseo();
      setMetadata(data);
    } catch (error) {
      console.error('Error fetching SEO data:', error);
    }
  }

  useEffect(() => {
    fetchMetadata();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const data=await Addnewseo(formData);
     console.log('data',data);
      await fetchMetadata();
      setIsModalOpen(false);
      setFormData({
        title: "",
        description: "",
        keywords: "",
        author: "",
        typesofseo: ""
      });
    } catch (error) {
      console.error("Error updating metadata", error);
    }
  };

  // Group metadata by type
  const groupedMetadata = metadatas.reduce((acc, item) => {
    const type = item.typesofseo || 'Uncategorized';
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(item);
    return acc;
  }, {});
  function handleedit(item)
  {
    setIsModalOpenforedit(true)
    setitemtoedit(item);
    console.log('eidt',item)
  }
  

  const filteredGroups = Object.entries(groupedMetadata).filter(([type, items]) =>
    type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    items.some(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  function handleSubmit1()
  {
    console.log('title',takingtitlefromedit);
    console.log('des',takingdescriptionfromedit);
    console.log('type',typesofseoforupdate);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <Settings className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">SEO Management</h1>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search SEO entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full md:w-64 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              <span>Add New SEO</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid gap-6">
          {filteredGroups.map(([type, items]) => (
            <div key={type} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-800 capitalize">{type}</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={item._id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                      <div className="flex gap-2">
                        <button className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors" onClick={()=>handleedit(item)}>
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Description</p>
                        <p className="mt-1 text-gray-900">{item.description}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Keywords</p>
                        <p className="mt-1 text-gray-900">{item.keywords}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Author</p>
                        <p className="mt-1 text-gray-900">{item.author}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Last Updated</p>
                        <p className="mt-1 text-gray-900">
                          {new Date(item.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
              <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
                <h3 className="text-xl font-semibold text-gray-900">Add New SEO Entry</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
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
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select type</option>
                    <option value="Seo for home page">seo for home page</option>
                    <option value="seo for about page">seo for about page</option>
                    <option value="seo for product page">seo for product page</option>
                    <option value="seo for infrastructure page">seo for infrastructure page</option>
                    <option value="seo for contact page">seo for contact page</option>
                    <option value="seo for quality page">seo for quality page</option>
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
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Keywords
                  </label>
                  <input
                    type="text"
                    name="keywords"
                    value={formData.keywords}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
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
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Save SEO Entry
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isModalOpenforedit && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
              <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
                <h3 className="text-xl font-semibold text-gray-900">{ `update ${itemtoedit.typesofseo}`}</h3>
                <button
                  onClick={() => setIsModalOpenforedit(false)}
                  className="text-gray-400 hover:text-gray-500"
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
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select type</option>
                    <option value="Seo for home page">seo for home page</option>
                    <option value="seo for about page">seo for about page</option>
                    <option value="seo for product page">seo for product page</option>
                    <option value="seo for infrastructure page">seo for infrastructure page</option>
                    <option value="seo for contact page">seo for contact page</option>
                    <option value="seo for quality page">seo for quality page</option>
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
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Keywords
                  </label>
                  <input
                    type="text"
                    name="keywords"
                    value={takingkeywordsfromedit}
                    onChange={(e)=>settakingkeywordsfromedit(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
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
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Save SEO Entry
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