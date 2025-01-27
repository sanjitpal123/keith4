import { useState } from "react";
import { Calendar, FileText, Save, X as XIcon, Loader2, Trash2 } from "lucide-react";
import EditHistory from "../services/AboutPage/Postmethods/EditHistory";

function HistoryForm({ data, onDelete, isDeleting }) {
  const [isEditing2, setIsEditing2] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    date: data?.date || "",
    description: data?.description || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const closeEditing2 = () => {
    setIsEditing2(false);
    setFormData({ date: data?.date || "", description: data?.description || "" });
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    try {
      const res = await EditHistory(formData, data._id);
      console.log("Response:", res);
      setIsEditing2(false);
    } catch (error) {
      console.error("Error updating history:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!data?.date) return null;

  return (
    <div className="px-2 py-3 sm:p-6 bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
        {/* Year Input */}
        <div className="space-y-1.5 sm:space-y-2">
          <label className="flex items-center gap-1.5 sm:gap-2 text-gray-700 font-medium text-sm sm:text-base">
            <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" />
            Year
          </label>
          <input
            type="text"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            onClick={() => setIsEditing2(true)}
            className={`w-full px-2 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm transition-all duration-200 text-sm sm:text-base ${
              !isEditing2 ? 'bg-gray-50' : 'bg-white'
            }`}
            placeholder="Enter year (e.g., 2023)"
          />
        </div>

        {/* Description Input */}
        <div className="space-y-1.5 sm:space-y-2">
          <label className="flex items-center gap-1.5 sm:gap-2 text-gray-700 font-medium text-sm sm:text-base">
            <FileText className="w-4 h-4 text-blue-600 flex-shrink-0" />
            History Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            onClick={() => setIsEditing2(true)}
            className={`w-full px-2 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm transition-all duration-200 text-sm sm:text-base ${
              !isEditing2 ? 'bg-gray-50' : 'bg-white'
            }`}
            placeholder="Enter history description..."
            rows={4}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-end gap-2 sm:gap-3 mt-3 sm:mt-4">
        {isEditing2 ? (
          <>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSaving}
              className="flex items-center gap-1.5 px-2 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 disabled:opacity-50 text-sm sm:text-base"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={closeEditing2}
              className="flex items-center gap-1.5 px-2 sm:px-4 py-1.5 sm:py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-200 text-sm sm:text-base"
            >
              <XIcon className="w-4 h-4" />
              Cancel
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={onDelete}
            disabled={isDeleting}
            className="flex items-center gap-1.5 px-2 sm:px-4 py-1.5 sm:py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-200 disabled:opacity-50 text-sm sm:text-base"
          >
            {isDeleting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        )}
      </div>
    </div>
  );
}

export default HistoryForm;