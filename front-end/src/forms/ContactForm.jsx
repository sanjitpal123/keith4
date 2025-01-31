import { useEffect, useState } from "react";
import FetchQuality from "../services/Quality/FetchQuality";
import AddNewQuality from "../services/Quality/AddItem";
import { ClipLoader } from "react-spinners";
import DeleteQuality from "../services/Quality/DeletedItem";
import { Plus, X, Edit2, Trash2, Save } from "lucide-react";
import EditQuality from "../services/Quality/EditQuality";
import FetchCertificates from "../services/AboutPage/FetchCertificates";
import EditCertificate from "../services/AboutPage/Postmethods/EditCertificate";
import DeleteCertificate from "../services/AboutPage/Postmethods/DeleteCertificate";
import AddNewCertificate from "../services/AboutPage/Postmethods/postcertificates";
import FetchContact from "../services/Contact/fetchcontact";
import AddNewContact from "../services/Contact/addNew";
import DeleteContact from "../services/Contact/Delete";
import EditContact from "../services/Contact/Edit";

function ContactForm() {
  const [allqualitydata, setallqualitydata] = useState([]);
  const [EditId, setEditId] = useState(null);
  const [Description, SetDescription] = useState("");
  const [mapurl, setmapurl] = useState("");
  const [file, setfile] = useState(null);
  const [typesofproduct, settypesofproduct] = useState("Physical Testing");
  const [Name, setName] = useState("");
  const [isadd, setisadd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [editedFiles, setEditedFiles] = useState({});
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [City, setCity]=useState("");
  const [Area, setArea]=useState("");
  const[State, setState]=useState("");
  const[Country, setCountry]=useState("");
  const[Pin , setPin]=useState("");
  const[Landmark, setLandmark]=useState("");



  async function fetchquality() {
    setIsLoading(true);
    try {
      const get = await FetchContact();
      console.log("getcontact", get);
      setallqualitydata(
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
      setDeleteLoading(true);
      const res = await DeleteContact(id);
      console.log("deleted", res);
      setDeleteLoading(false);
      fetchquality();
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleEdit = async (id) => {
    if (EditId === id) {
      const editedItem = allqualitydata.find((item) => item._id === id);
      setSaveLoading(true);
      const formData = new FormData();
      formData.append("title", Name || editedItem.title);


      formData.append("city",City || editedItem.city);
      formData.append("area",Area || editedItem.area);

      formData.append("country", Country || editedItem.Country);
      formData.append("state", State || editedItem.state);
      formData.append("pin", Pin || editedItem.pin);
      formData.append("landmark", Landmark || editedItem.landmark);
      formData.append("findonmap", mapurl || editedItem.findonmap);

      if (editedFiles[id]) {
        formData.append("image", editedFiles[id]);
      }

      try {
        const res = await EditContact(formData, id);
        console.log("Edited Response:", res);
        fetchquality();
        setSaveLoading(false);
        setEditId(null);
        setName("");
        SetDescription("");
        setEditedFiles((prev) => {
          const newState = { ...prev };
          delete newState[id];
          return newState;
        });
        settypesofproduct("Physical Testing");
      } catch (error) {
        console.error("Error updating item:", error);
      }
    } else {
      const selectedItem = allqualitydata.find((item) => item._id === id);
      setEditId(id);
      setName(selectedItem.title);
      setmapurl(selectedItem.findonmap);
      setCity(selectedItem.city);
      setArea(selectedItem.area);
      setCountry(selectedItem.country);
      setState(selectedItem.state);
      setPin(selectedItem.pin);
      setLandmark(selectedItem.landmark);

      if (!editedFiles[id]) {
        setEditedFiles((prev) => ({
          ...prev,
          [id]: null,
        }));
      }
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedId) {
      try {
        setDeleteLoading(true);
        await DeleteContact(selectedId);
        console.log("Deleted:", selectedId);
        setDeleteLoading(false);
        fetchquality();
      } catch (error) {
        console.log("Error:", error);
      }
    }
    setIsModalOpen(false);
    setSelectedId(null);
  };

  const handleAdd = () => {
    setisadd(!isadd);
  };

  async function HandleAddNew() {
    const formData = new FormData();
    formData.append("image", file);

    formData.append("title", Name );
    formData.append("city",City );
    formData.append("area",Area );
    formData.append("country", Country );
    formData.append("state", State );
    formData.append("pin",Pin );
    formData.append("landmark", Landmark )
    formData.append("findonmap",mapurl );


    setIsLoading1(true);
    try {
      const res = await AddNewContact(formData);
      console.log("added", res);
      setisadd(false);
      setName("");
      SetDescription("");
      setCity("");
      setCountry("");
      setPin("");
      setLandmark("");
      setmapurl("");
      setState("");
      setfile(null);
      fetchquality();
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading1(false);
    }
  }

  useEffect(() => {
    fetchquality();
  }, []);

  return (
    <main className="p-2 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-lg underline inline-block decoration-blue-600 md:text-4xl font-bold text-center mb-8 text-gray-800 animate-fade-in">
          Contact Manager
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-bounce">
              <ClipLoader size={50} color="#3490dc" loading={isLoading} />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {allqualitydata.map((item) => (
              <div
                key={item._id}
                className="bg-white max-h-[500px] relative overflow-y-auto shadow-xl rounded-xl overflow-hidden transform hover:scale-102 transition-all duration-300 hover:shadow-2xl"
              >
                <div className="relative group">
                  <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                    <img
                      src={item.previewImage || item.image}
                      alt={item.title}
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

                <div className="sm:p-6 p-2 space-y-4">

                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  value={EditId === item._id ? Name : item?.title}
                  onChange={(e) => setName(e.target.value)}
                  readOnly={EditId !== item._id}
                  className="w-full bg-white border-gray-400 text-left p-2 border rounded-lg font-semibold focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
                
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  id="city"
                  value={EditId === item._id ? City : item?.city}
                  onChange={(e) => setCity(e.target.value)}
                  readOnly={EditId !== item._id}
                  className="w-full bg-white border-gray-400 text-left p-2 border rounded-lg font-semibold focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
                <label htmlFor="area" className="block text-sm font-medium text-gray-700">Area</label>
                <input
                  type="text"
                  id="area"
                  value={EditId === item._id ? Area : item?.area}
                  onChange={(e) => setArea(e.target.value)}
                  readOnly={EditId !== item._id}
                  className="w-full bg-white border-gray-400 text-left p-2 border rounded-lg font-semibold focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />

                <label htmlFor="pin" className="block text-sm font-medium text-gray-700">Pin</label>
                <input
                  type="text"
                  id="pin"
                  value={EditId === item._id ? Pin : item?.pin}
                  onChange={(e) => setPin(e.target.value)}
                  readOnly={EditId !== item._id}
                  className="w-full p-2 border bg-white border-gray-400 rounded-lg text-left font-semibold focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />

                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                <input
                  type="text"
                  id="state"
                  value={EditId === item._id ? State : item?.state}
                  onChange={(e) => setState(e.target.value)}
                  readOnly={EditId !== item._id}
                  className="w-full bg-white border-gray-400 text-left p-2 border rounded-lg font-semibold focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />

                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                <input
                  type="text"
                  id="country"
                  value={EditId === item._id ? Country : item?.country}
                  onChange={(e) => setCountry(e.target.value)}
                  readOnly={EditId !== item._id}
                  className="w-full bg-white border-gray-400 text-left p-2 border rounded-lg font-semibold focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />

                <label htmlFor="mapurl" className="block text-sm font-medium text-gray-700">Map URL</label>
                <input
                  type="text"
                  id="mapurl"
                  value={EditId === item._id ? mapurl : item?.findonmap}
                  onChange={(e) => setmapurl(e.target.value)}
                  readOnly={EditId !== item._id}
                  className="w-full bg-white border-gray-400 text-left p-2 border rounded-lg font-semibold focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />

                <label htmlFor="landmark" className="block text-sm font-medium text-gray-700">Landmark</label>
                <input
                  value={EditId === item._id ? Landmark : item.landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  readOnly={EditId !== item._id}
                  id="landmark"
                  className="w-full bg-white border-gray-400 text-left p-3 border rounded-lg font-bold text-sm resize-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />

                <>
                    {/* Delete and Edit Buttons */}
                    <div className=" flex flex-wrap justify-between gap-2 pt-2">

                      <button
                        disabled={deleteLoading}
                        onClick={() => handleDeleteClick(item._id)}
                        className="flex items-center text-sm sm:text-lg px-2 sm:px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </button>

                      <button
                        disabled={saveLoading}
                        onClick={() => handleEdit(item._id)}
                        className={`flex items-center text-sm sm:text-lg px-2 sm:px-4 py-2 ${
                          EditId === item._id
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-blue-500 hover:bg-blue-600"
                        } text-white rounded-lg transition-colors duration-300`}
                      >
                        {EditId === item._id ? (
                          <>
                            {saveLoading ? (
                              <span>Saving...</span>
                            ) : (
                              <>
                                <Save className="w-4 h-4 mr-2" />
                                Save
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            <Edit2 className="w-4 h-4 mr-2" />
                            Edit
                          </>
                        )}
                      </button>
                    </div>

                    {isModalOpen && selectedId === item._id && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
                          <h2 className="text-lg font-semibold text-gray-800">
                            Are you sure you want to delete this item?
                          </h2>
                          <div className="flex justify-center gap-4 mt-4">
                            <button
                              onClick={confirmDelete}
                              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setIsModalOpen(false)}
                              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
                            >
                              No
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                </div>
              </div>
            ))}
          </div>
        )}

        <div

          className={`fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${

            isadd ? "opacity-100 z-50" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className={`bg-white max-h-[80vh] overflow-y-auto py-2 px-2  rounded-xl sm:p-6 m-4 max-w-lg w-full transform transition-all duration-300 ${
              isadd ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
            }`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Add New Item</h2>
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
                  className="absolute bg-white inset-0 opacity-0 cursor-pointer"
                />
                <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center group-hover:border-blue-500 transition-colors duration-300">
                  <span className="text-gray-500 group-hover:text-blue-500">
                    {file ? file.name : "Click to upload image"}
                  </span>
                </div>
              </div>

              <input
                type="text"
                value={Name || ""}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter title"
                className="w-full p-3 border bg-white border-gray-400  rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
                <input
                type="text"
                value={City || ""}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter City"
                className="w-full p-3 border  bg-white border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
                <input
                type="text"
                value={State || ""}
                onChange={(e) => setState(e.target.value)}
                placeholder="Enter state"
                className="w-full p-3 border bg-white border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
               <input
                placeholder="Enter pin"
                value={Pin || ""}
                onChange={(e) => setPin(e.target.value)}
                className="w-full p-3 border bg-white border-gray-400 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                
              /> 
               <input
                placeholder="Enter Landmark"
                value={Landmark || ""}
                onChange={(e) => setLandmark(e.target.value)}
                className="w-full p-3 border bg-white border-gray-400 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                
              />
               <input
                placeholder="Enter Area"
                value={Area || ""}
                onChange={(e) => setArea(e.target.value)}
                className="w-full p-3 border bg-white border-gray-400 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                
              />

              <input
                placeholder="Enter Country"
                value={Country || ""}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full p-3 border bg-white border-gray-400 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                
              />

               <input
                placeholder="Enter map url"
                value={mapurl || ""}
                onChange={(e) => setmapurl(e.target.value)}
                className="w-full p-3 border bg-white border-gray-400 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                
              />


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

        <div className="fixed bottom-5 sm:bottom-8 right-8">
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

export default ContactForm;
