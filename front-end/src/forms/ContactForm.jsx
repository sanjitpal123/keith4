import { useEffect, useState } from "react";
import FetchAboutHeading from "../services/AboutPage/FetchAboutHeading";
import Fetchhistoryall from "../services/AboutPage/FetchHistory";
import HistoryForm from "../components/HistoryForm";
import MissionVisionComponent from "../components/MissionVisionComponent";
import FetchManagement from "../services/AboutPage/FetchManagement";
import Postaboutheading_content_image from "../services/AboutPage/Postmethods/PostAboutHeadingContentAndImage";
import FetchCoreAndPrinciple from "../services/AboutPage/FetchCoreAndPrinciple";
import HeroBackground from "../components/CertificatesImages";
import FetchCertificates from "../services/AboutPage/FetchCertificates";
import CertificatesImages from "../components/CertificatesImages";
import FetchHeroSection from "../services/Homepage/FetchHeading";
import PostHero from "../services/Homepage/PostHerosection";
import Getbackroundyear from "../services/Homepage/fetchyearbacround";
import postyearbackroundimage from "../services/Homepage/Postyearbackroundimage";
import Gettourvidoe from "../services/Homepage/GetTourVIdeo";
import PostTourVideo from "../services/Homepage/postvideotour";
function ContactForm() {
  const [aboutData1, setAboutData1] = useState();
  const [AboutHeading, setAboutHeading] = useState();
  const [AboutContent, setAboutContent] = useState();
  const [Aboutimageprev, setAboutimageprev] = useState(null);
  const [AboutFile, SetAboutFile] = useState();
  const [aboutData2, setAboutData2] = useState();
  const [historyData, setHistoryData] = useState();
  const [isEditing1, setIsEditing1] = useState(false);
  const [isEditing2, setIsEditing2] = useState(false);
  const [GetPrincipleData, SetPrincipleData] = useState([]);
  const [GettingPrincipleAndcoreHeading1, SetGettingPrincipleAndcoreHeading1] =
    useState();
  const [herosectionData, setHeroSectionData] = useState();
  const [heroheader, setheroheader] = useState();
  const [herocontent, setherocontent] = useState();

  const [videoPreview, setVideoPreview] = useState("");
  const [aboutImage, setAboutImage] = useState("");
  const [whyusImage, setWhyusImage] = useState("");
  const [yearbackroundiamgefile, setyearbackroundiamgefile] = useState();
  const [getyearbackround, setgetyearbackround] = useState("");
  const [isediting, setisediting] = useState("");
  const [videofileoftour, setvideofileoftour] = useState();
  const [issubmiting, setissubmitting] = useState(false);
  const [previewvideoftour, setpreviewtour] = useState();
  const [imagePreview,setImagePreview]=useState()

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // for form 1
  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    setAboutData1({ ...aboutData1, [name]: value });
  };
  const openEditing1 = () => {
    setIsEditing1(true); // Enable edit mode
  };
  function closeEditing1() {
    setIsEditing1(false);
  }
  const [tourvideodata, settourvideodata] = useState();
  // onchange of image of aboutus
  function handleimagechange(e) {
    console.log("e");
    e.preventDefault();
    const files = e.target.files[0];
    SetAboutFile(files);
    // Declare `files` properly
    if (files) {
      const fileurl = URL.createObjectURL(files);
      setAboutimageprev(fileurl);
    }
  }
  // fetch backroundiamge of  year
  async function fetchbackroundimageofyear() {
    try {
      const data = await Getbackroundyear();
      console.log("data", data);
      setgetyearbackround(data);
    } catch (error) {
      console.log("error", error);
    }
  }

  //posting about heading image content
  const handleSubmit1 = async (e) => {
    e.preventDefault();
    setIsEditing1(false); // Save and exit edit mode

    const formData = new FormData();
    console.log("content:", herocontent);
    console.log("header:", heroheader);
    console.log("file:", AboutFile);

    formData.append("content1", heroheader);
    formData.append("content2", herocontent);

    // Ensure AboutFile is a valid file before appending it
    if (AboutFile) {
      formData.append("video", AboutFile);
    } else {
      console.log("No video file provided");
    }

    // To log the contents of FormData
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      const response = await PostHero(formData);
      alert(response.message);
      console.log("Posting response:", response);
    } catch (error) {
      console.error("Error during posting:", error);
    }
  };

  // for form 2
  const handleInputChange2 = (e) => {
    const { name, value } = e.target;
    setAboutData2({ ...aboutData2, [name]: value });
  };
  const openEditing2 = () => {
    setIsEditing2(true); // Enable edit mode
  };
  function closeEditing2() {
    setIsEditing2(false);
  }

  function previewWhyUs(e) {
    const files = e.target.files[0];
    console.log("file", files);
    if (files) {
      const fileurl = URL.createObjectURL(files);
      setWhyusImage(fileurl);
    }
  }

  // for fetching about
  async function fetchingAbout() {
    try {
      const get = await FetchAboutHeading();
      console.log("getting about heading section", get);
      setAboutData1(get);
      setAboutHeading(get.header);
      setAboutContent(get.content);
      if (get.image) {
        setAboutImage(get.image);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function previewAboutImage(e) {
    const files = e.target.files[0];
    console.log("file", files);
    setyearbackroundiamgefile(files);
    if (files) {
      const fileurl = URL.createObjectURL(files);
      setAboutImage(fileurl);
    }
  }

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    SetAboutFile(file);
    if (file) {
      const fileUrl = URL.createObjectURL(file); // Create a preview URL for the uploaded video
      setVideoPreview(fileUrl);
    }
  };

  // for fetching history
  async function fetchingHistory() {
    try {
      const get = await Fetchhistoryall();
      console.log("getting about history", get);
      setHistoryData(get);
    } catch (error) {
      console.log(error);
    }
  }

  // fetching principle and core
  async function Fetchcoreandprinciple() {
    try {
      const res = await FetchCoreAndPrinciple();
      console.log("herlro", res);
      SetPrincipleData(res);
    } catch (error) {
      console.log("error", error);
    }
  }
  // fetching certificates

  //fetch hero section
  async function FetchHero() {
    try {
      const res = await FetchHeroSection();
      console.log("resherosection", res.gethero);
      setHeroSectionData(res.gethero);
      setheroheader(res.gethero.content1);
      setherocontent(res.gethero.content2);
      if (res.gethero.video) {
        setVideoPreview(res.gethero.video);
        const videoResponse = await fetch(res.gethero.video);
        const videoBlob = await videoResponse.blob();
        const videoFile = new File([videoBlob], "hero-video.mp4", {
          type: videoBlob.type,
        });
        SetAboutFile(videoFile); // Assume video URL is returned here
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  async function handleSubmit2(e) {
    e.preventDefault();
    console.log("files", yearbackroundiamgefile);
    const formdata = new FormData();
    formdata.append("image", yearbackroundiamgefile);
    try {
      const res = await postyearbackroundimage(formdata);
      alert(res.message);
    } catch (error) {
      console.log("error", error);
    }
  }

  async function Fetchtourvideo() {
    try {
      const get = await Gettourvidoe();
      console.log("tour", get);
      settourvideodata(get);
    } catch (error) {
      console.log("error", error);
    }
  }
  function handleEditvideotour() {
    setisediting(!isediting);
  }
  async function handlesubmitoftourvideo(e) {
    e.preventDefault();
    console.log("file", videofileoftour);
    const formdata = new FormData();
    formdata.append("video", videofileoftour);
    setissubmitting(true);
    try {
      const p = await PostTourVideo(formdata);
      console.log("p", p);

      setissubmitting(false);
    } catch (error) {
      setissubmitting(false);
      console.log(error);
    }
  }
  function changevideotour(e) {
    const file = e.target.files[0]; // Get the selected file
    setvideofileoftour(file); // Update state with the file

    if (file) {
      const url = URL.createObjectURL(file); // Generate a temporary URL for the video file
      setpreviewtour(url); // Update the preview state with the temporary URL
    }
  }
  useEffect(() => {
    Fetchcoreandprinciple();
    FetchHero();
    fetchbackroundimageofyear();
    Fetchtourvideo();
  }, []);

  useEffect(() => {
    fetchingAbout();
    fetchingHistory();
  }, []);

  return (
    <main className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      {/* Form Container */}
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-5xl mx-auto">
        <h2 className="text-3xl flex justify-center items-center gap-2 font-bold p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center">
          <span>
            <svg
              fill="#ffffff"
              width="50px"
              height="50px"
              viewBox="0 0 64 64"
              version="1.1"
              xmlSpace="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              stroke="#ffffff"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g id="_x32_5_attachment"></g> <g id="_x32_4_office"></g>{" "}
                <g id="_x32_3_pin"></g> <g id="_x32_2_business_card"></g>{" "}
                <g id="_x32_1_form"></g> <g id="_x32_0_headset"></g>{" "}
                <g id="_x31_9_video_call"></g> <g id="_x31_8_letter_box"></g>{" "}
                <g id="_x31_7_papperplane"></g> <g id="_x31_6_laptop"></g>{" "}
                <g id="_x31_5_connection"></g> <g id="_x31_4_phonebook"></g>{" "}
                <g id="_x31_3_classic_telephone"></g>{" "}
                <g id="_x31_2_sending_mail"></g> <g id="_x31_1_man_talking"></g>{" "}
                <g id="_x31_0_date"></g> <g id="_x30_9_review"></g>{" "}
                <g id="_x30_8_email"></g> <g id="_x30_7_information"></g>{" "}
                <g id="_x30_6_phone_talking">
                  {" "}
                  <g>
                    {" "}
                    <g>
                      {" "}
                      <path d="M37.063,18.062h-0.0596c-0.5522,0-0.9702,0.4478-0.9702,1s0.4775,1,1.0298,1s1-0.4478,1-1S37.6152,18.062,37.063,18.062z "></path>{" "}
                      <path d="M45.1787,18.062H45.123c-0.5522,0-0.9722,0.4478-0.9722,1s0.4756,1,1.0278,1s1-0.4478,1-1S45.731,18.062,45.1787,18.062z "></path>{" "}
                      <path d="M53.2983,18.062h-0.0596c-0.5522,0-0.9702,0.4478-0.9702,1s0.4775,1,1.0298,1s1-0.4478,1-1 S53.8506,18.062,53.2983,18.062z"></path>{" "}
                      <path d="M45.1953,45.9268c-5.1489-2.9038-6.6909-2.6665-10.6172-0.4468c-2.0146,1.3389-4.4404,0.5225-8.6563-2.9111 c-0.8276-0.6743-1.6592-1.4263-2.4688-2.2319c-0.8091-0.8125-1.5605-1.644-2.2344-2.4722 c-3.1782-3.8999-4.0435-7.459-3.0112-8.5317c3.042-3.271,2.3516-5.957-0.3335-10.7173c-1.6172-3.0591-3.3931-6.104-5.7568-6.8027 c-1.7139-0.5034-4.2588,0.8154-5.0166,1.3184c-1.9492,1.2983-3.8003,3.5947-4.8311,5.9937 c-1.896,4.4136-1.3931,9.7329-0.29,13.2397c1.812,5.749,6.1611,12.4063,11.6348,17.8086 c5.4043,5.4761,12.0615,9.8242,17.8081,11.6313c1.8154,0.5728,4.1167,0.9844,6.5283,0.9844c2.2437,0,4.583-0.3564,6.7124-1.271 c2.3989-1.0327,4.6938-2.8838,5.9888-4.8306c0.5039-0.7554,1.8276-3.2998,1.3184-5.021 C51.2754,49.3071,48.2305,47.5308,45.1953,45.9268z M44.2368,47.6821c1.8521,0.979,5.2998,2.8018,5.8149,4.5513 c0.1056,0.3564-0.0228,1.0059-0.2598,1.681l-13.5292-7.089C38.8073,45.4165,39.8377,45.2009,44.2368,47.6821z M11.5513,13.7314 c1.7524,0.5181,3.5752,3.9663,4.5674,5.8428c2.6213,4.647,2.613,6.1134,0.9274,8.0579L9.748,14.0356 c0.556-0.2056,1.1049-0.3412,1.499-0.3412C11.3633,13.6943,11.4658,13.7061,11.5513,13.7314z M43.873,59.6807 c-3.9175,1.6836-8.8311,1.1694-11.8501,0.2163c-5.4517-1.7144-11.8032-5.8765-16.9897-11.1328 c-0.0034-0.0034-0.0063-0.0063-0.0098-0.0098C9.7695,43.5698,5.606,37.2178,3.8872,31.7642 c-0.9497-3.0195-1.4619-7.9346,0.2202-11.8501c0.8441-1.9645,2.3123-3.8291,3.8699-4.948l7.923,14.7618 c-0.4362,2.3732,0.9189,5.9038,3.7676,9.4001c0.7153,0.8789,1.5122,1.7607,2.3711,2.623 c0.8594,0.856,1.7407,1.6528,2.6196,2.3687c3.0879,2.5153,6.3303,4.6262,9.3667,3.7915l14.8708,7.792 C47.7888,57.3002,45.8823,58.816,43.873,59.6807z"></path>{" "}
                      <path d="M60.9551,10.771C56.3843,2.0591,45.5757-1.3105,36.8604,3.2568l-0.0005,0.0005 c-8.7119,4.5723-12.0825,15.3813-7.5137,24.0952c0.3311,0.6313,0.709,1.2549,1.1274,1.8613l-2.7012,4.6299 c-0.1885,0.3228-0.1812,0.7241,0.0195,1.0396c0.1997,0.3159,0.5596,0.4912,0.9321,0.4604l7.75-0.6851 c2.7095,1.5068,5.6899,2.2627,8.6748,2.2627c2.8374,0,5.6787-0.6836,8.293-2.0552 C62.1543,30.2944,65.5249,19.4854,60.9551,10.771z M52.5127,33.0952c-4.8472,2.543-10.5723,2.4214-15.3154-0.3252 c-0.1523-0.0884-0.3257-0.1348-0.501-0.1348c-0.0293,0-0.0586,0.0015-0.0879,0.0039l-6.1338,0.542l2.0532-3.519 c0.2017-0.3462,0.1777-0.7793-0.0615-1.1006c-0.5132-0.6899-0.9668-1.4092-1.3486-2.1377 c-4.0571-7.7373-1.0645-17.3354,6.6719-21.396l-0.0005,0.0005c7.7378-4.0581,17.3354-1.0635,21.395,6.6719 C63.2417,19.438,60.2485,29.0356,52.5127,33.0952z"></path>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>{" "}
                <g id="_x30_5_women_talking"></g> <g id="_x30_4_calling"></g>{" "}
                <g id="_x30_3_women"></g> <g id="_x30_2_writing"></g>{" "}
                <g id="_x30_1_chatting"></g>{" "}
              </g>
            </svg>
          </span>
          Contact
        </h2>

        {/* Hero Section */}
        <div className="border-b-2 border-gray-300">
          <h2 className="text-xl p-4 text-gray-800 font-semibold underline decoration-blue-500 decoration-2">
            Address Section
          </h2>
          <form className="space-y-6 p-6" onSubmit={handleSubmit1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* hero Heading */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={heroheader}
                  onChange={(e) => setheroheader(e.target.value)}
                  className="w-full p-3 border bg-white border-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  placeholder="Enter heading"
                  disabled={!isEditing1}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Map Link
                </label>
                <input
                  type="text"
                  value={heroheader}
                  onChange={(e) => setheroheader(e.target.value)}
                  className="w-full p-3 border bg-white border-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  placeholder="Enter heading"
                  disabled={!isEditing1}
                />
              </div>

              {/* hero Description */}
              <div>
  <label className="block text-gray-700 font-semibold mb-2">
    Address
  </label>
  <textarea
    value={herocontent}
    onChange={(e) => setherocontent(e.target.value)}
    className="w-full p-3 border bg-white border-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm resize-none"
    placeholder="Enter description"
    disabled={!isEditing1}
    rows={4} // Adjust rows as needed
  />
</div>


              {/* adress images */}
              <div>
  <label className="block text-gray-700 font-semibold mb-2">
    Hero Image
  </label>
  <input
    type="file"
    accept="image/*"
    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
    onChange={handleImageUpload} // Change function name accordingly
    disabled={!isEditing1}
  />
  {imagePreview && (
    <div className="mt-4">
      <img
        src={imagePreview}
        alt="Preview"
        className="w-full h-auto rounded-lg shadow-md"
      />
    </div>
  )}
</div>

            </div>

            {/* Submit & Cancel Buttons */}
            {isEditing1 && (
              <div className="flex justify-start space-x-4 mt-6">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={handleSubmit1}
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={closeEditing1}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Cancel
                </button>
              </div>
            )}
          </form>

          {/* Edit Button */}
          {!isEditing1 && (
            <div className="p-4">
              <button
                type="button"
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500"
                onClick={openEditing1}
              >
                Edit
              </button>
            </div>
          )}
        </div>

        {/* background hero Section */}
        {/* <div className="border-b-2 border-gray-300">
          <h2 className="text-xl p-4 text-gray-800 font-semibold underline decoration-blue-500 decoration-2">
            History
          </h2>
          <form className="space-y-6 p-6" onSubmit={handleSubmit2}>
            {historyData?.map((data) => (
              <HistoryForm key={data._id} data={data} isEditing2={isEditing2} />
            ))}
          </form>
        </div> */}
        <div className="w-full">
          <h2 className="text-xl p-4 text-gray-800 font-semibold underline decoration-blue-500 decoration-2">
            Tourvideo Section
          </h2>
          <div className="bg-white shadow-md rounded-lg p-6">
            <input
              type="file"
              accept="video/*"
              onChange={changevideotour}
              className=""
            />
            <div className="w-full flex flex-col items-center">
              <div className="relative w-full max-w-3xl">
                <video
                  src={
                    previewvideoftour ? previewvideoftour : tourvideodata?.video
                  }
                  controls
                  className="w-full rounded-lg shadow-lg border border-gray-200"
                ></video>
                <p className="mt-4 text-sm text-gray-600">
                  *Please ensure the video is updated before saving.
                </p>
              </div>
            </div>

            <div className="flex justify-center mt-6 gap-4">
              <button
                onClick={handlesubmitoftourvideo}
                className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <i className="lucide lucide-check-circle"></i> Submit
              </button>
            </div>
          </div>
        </div>

        {/* Hero Background */}
        <div className="border-b-2 border-gray-300">
          <h2 className="text-xl p-4 text-gray-800 font-semibold underline decoration-blue-500 decoration-2">
            Hero Background
          </h2>
          <form className="space-y-6 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* HEro background */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Hero image
                </label>
                <input
                  type="file"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  onChange={previewAboutImage}
                  disabled={!isEditing1}
                />
                {aboutImage && (
                  <div className="mt-4">
                    <img
                      src={getyearbackround.image}
                      alt="Year Background"
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Submit & Cancel Buttons */}
            {isEditing1 && (
              <div className="flex justify-start space-x-4 mt-6">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={handleSubmit2}
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={closeEditing1}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Cancel
                </button>
              </div>
            )}
          </form>

          {/* Edit Button */}
          {!isEditing1 && (
            <div className="p-4">
              <button
                type="button"
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500"
                onClick={openEditing1}
              >
                Edit
              </button>
            </div>
          )}
        </div>

        {/* Hero backgoround image */}

        <CertificatesImages></CertificatesImages>
      </div>
    </main>
  );
}

export default ContactForm;
