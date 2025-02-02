import { useEffect, useState } from "react";
import FetchQuality from "../services/Quality/FetchQuality";
import AddNewQuality from "../services/Quality/AddItem";
import ManagementPost from "../services/AboutPage/Postmethods/ManagementPost";
import FetchManagement from "../services/AboutPage/FetchManagement";

import { ClipLoader } from "react-spinners";
import DeleteQuality from "../services/Quality/DeletedItem";
import { Plus, X, Edit2, Trash2, Save } from "lucide-react";
import EditQuality from "../services/Quality/EditQuality";
import { Bounce, toast, ToastContainer } from "react-toastify";
import EditManagement from "../services/AboutPage/Postmethods/EditManagement";
import DeleteManagement from "../services/AboutPage/Postmethods/DeleteManagement";
// Quality

function ManagementForm() {
  const [allqualitydata, setallqualitydata] = useState([]);
  const [EditId, setEditId] = useState(null);
  const [file, setfile] = useState(null);
  const [typesofproduct, settypesofproduct] = useState("Physical Testing");

  const [position,setPosition]=useState()
  const [Description, SetDescription] = useState("");
  const [Name, setName] = useState("");
  const [image,setImage]=useState()
  const [allTeamMembers,setAllTeamMembers]=useState([])

  const [isadd, setisadd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [editedFiles, setEditedFiles] = useState({});
  const [isSaving,setIsSaving]=useState(false)
  const [isDeleting,setIsDeleting]=useState(null)

  //fetching management
  async function fetchManagement() {
    setIsLoading(true);
    try {
      const get = await FetchManagement();
      console.log("management",get)
      setAllTeamMembers(
        get.map((item) => ({
          ...item,
          previewImage: item.image,
        }))
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleFileChange = (id, newFile) => {
    if (newFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setallqualitydata((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, previewImage: reader.result } : item
          )
        );
      };
      reader.readAsDataURL(newFile);

      setEditedFiles((prev) => ({
        ...prev,
        [id]: newFile,
      }));
    }
  };

  const handleDelete = async (id) => {
    try {
      setIsDeleting(id)
      const res = await DeleteManagement(id);
      console.log("deleted", res);
      fetchManagement();
      setIsDeleting(null)
      toast.success('Deleted successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
      fetchquality();
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleEdit = async (id) => {
    if (EditId === id) {
      const editedItem = allTeamMembers.find((item) => item._id === id);
      setIsSaving(true)
      // Prepare the form data
      const formData = new FormData();
      formData.append("name", Name || editedItem.name);
      formData.append("description", Description || editedItem.description);
      formData.append(
        "position",
        position || editedItem.position
      );
      if (editedFiles[id]) {
        formData.append("image", editedFiles[id]); // Append the edited file if exists
      }

      try {
        const res = await EditManagement(formData, id); // Send FormData to the API
        console.log("Edited Management:", res);
        setIsSaving(false)
        toast.success('Updated successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
        // Re-fetch data to update UI
        fetchManagement();

        // Reset states
        setEditId(null);
        setName("");
        SetDescription("");
        setEditedFiles((prev) => {
          const newState = { ...prev };
          delete newState[id];
          return newState;
        });
        setPosition("");
      } catch (error) {
        console.error("Error updating item:", error);
      }
    } else {
      // Set the item for editing
      const selectedItem = allTeamMembers.find((item) => item._id === id);
      setEditId(id);
      setName(selectedItem.name);
      SetDescription(selectedItem.description);
      settypesofproduct(selectedItem.typeofproduct);

      if (!editedFiles[id]) {
        setEditedFiles((prev) => ({
          ...prev,
          [id]: null,
        }));
      }
    }
  };

  const handleAdd = () => {
    setisadd(!isadd);
  };

  const handleTypeChange = (e, id) => {
    const newType = e.target.value;
    setPosition(newType);

    setAllTeamMembers((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, position: newType } : item
      )
    );
  };

  //working
  async function HandleAddNew() {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", Name);
    formData.append("description", Description);
    // formData.append("typeofproduct", typesofproduct);
    formData.append("position", position);

    setIsLoading1(true);
    try {
      const res = await ManagementPost(formData);
      console.log("added", res);
      setisadd(false);
      setName("");
      SetDescription("");
      setfile(null);
    //   fetchquality();
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading1(false);
    }
  }

  useEffect(() => {
    fetchManagement()
    console.log("Team",allTeamMembers)
  }, []);

  return (
    <main className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <ToastContainer></ToastContainer>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl md:text-4xl font-bold rounded-md py-2 text-center mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2  animate-fade-in">
          Management
        </h1>

        {/* {isLoading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-bounce">
              <ClipLoader size={50} color="#3490dc" loading={isLoading} />
            </div>
          </div>
        ) : (.......div goes here.....)} */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {allTeamMembers?.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow-xl rounded-xl overflow-hidden transform hover:scale-102 transition-all duration-300 hover:shadow-2xl"
              >
                <div className="relative group">
                  <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                    <img
                      src={item.previewImage || item.image}
                      alt={item.name}
                      className="w-full h-48 object-contain transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  {EditId === item._id && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <input
                        type="file"
                        onChange={(e) =>
                          handleFileChange(item._id, e.target.files[0])
                        }
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <div className="text-center">
                        <span className="text-white text-sm block">
                          {editedFiles[item._id]
                            ? editedFiles[item._id].name
                            : "Click to change image"}
                        </span>
                        {editedFiles[item._id] && (
                          <span className="text-white text-xs block mt-1">
                            File selected
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-4">
                  <input
                    type="text"
                    value={EditId === item._id ? Name : item.name}
                    onChange={(e) => setName(e.target.value)}
                    readOnly={EditId !== item._id}
                    className="w-full p-2 border bg-white border-black rounded-lg text-center font-semibold focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  />

                  <textarea
                    value={EditId === item._id ? Description : item.description}
                    onChange={(e) => SetDescription(e.target.value)}
                    readOnly={EditId !== item._id}
                    className="w-full p-3 border bg-white border-black text-black rounded-lg text-sm resize-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    rows={3}
                  />

                  <select
                    value={
                      EditId === item._id ? position : item.position
                    }
                    onChange={(e) => handleTypeChange(e, item._id)}
                    disabled={EditId !== item._id}
                    className="w-full p-2 border bg-white border-black text-black rounded-lg bg-white focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  >
                    <option>Founder</option>
                    <option>Investor</option>
                    <option>Leaders</option>
                  </select>

                  <div className="flex flex-wrap justify-between gap-4 pt-2">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      {
                        isDeleting===item._id?"Deleting...":"Delete"

                      }
                    </button>
                    <button
                      onClick={() => handleEdit(item._id)}
                      className={`flex items-center px-4 py-2 ${
                        EditId === item._id
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-blue-500 hover:bg-blue-600"
                      } text-white rounded-lg transition-colors duration-300`}
                    >
                      {EditId === item._id ? (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          {
                            isSaving?"Saving...":"Save"
                          }
                        </>
                      ) : (
                        <>
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        

        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${
            isadd ? "opacity-100 z-50" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className={`bg-white max-h-[80vh] overflow-y-auto rounded-xl p-6 m-4 max-w-lg w-full transform transition-all duration-300 ${
              isadd ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
            }`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Add New</h2>
              <button
                onClick={() => setisadd(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="relative group">
                <input
                  type="file"
                  onChange={(e) => setfile(e.target.files[0])}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center group-hover:border-blue-500 transition-colors duration-300">
                  <span className="text-gray-500 group-hover:text-blue-500">
                    {file ? file.name : "Click to upload image"}
                  </span>
                </div>
              </div>

              <input
                type="text"
                value={Name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                className="w-full p-3 border bg-white border-black text-black rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />

              <textarea
                placeholder="Enter description"
                value={Description}
                onChange={(e) => SetDescription(e.target.value)}
                className="w-full p-3 border bg-white border-black text-black rounded-lg resize-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                rows={4}
              />

              <select
                className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              >
                <option>Founder</option>
                <option>Investor</option>
                <option>Leader</option>
                
              </select>

              <button
                className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
                onClick={HandleAddNew}
                disabled={isLoading1}
              >
                {isLoading1 ? (
                  <>
                    <ClipLoader size={20} color="#ffffff" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    <span>Add Item</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="fixed bottom-8 right-8">
          <button
            onClick={handleAdd}
            className="group bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
          >
            {isadd ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </main>
  );
}

export default ManagementForm;
