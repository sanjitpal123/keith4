import { useEffect, useState, useRef, useMemo } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
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
import JoditEditor from "jodit-react";
function HomeForm() {
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
  const [videofileoftour, setvideofileoftour] = useState(); //the tour video
  const [isTourSubmitting, setIsTourVideoSubmitting] = useState(false);
  const [previewvideoftour, setpreviewtour] = useState();
  const [isHeroSubmitting, setIsHeroSubmitting] = useState(false);
  const [isYearBackgroundSubmitting, setIsYearBackgroundSubmitting] =
    useState(false);
  const [isCompressing, setIsCompressing] = useState();
  const [hasCompressed, setHasCompressed] = useState(false);
  const [compressionTap, setCompressionTap] = useState(0);

  const editor = useRef(null);
  const [content, setContent] = useState("");

  const startCompression = async () => {
    try {
      // Compression function
      if (hasCompressed)
        return toast.info("Please refresh the page for compressing again", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      if (!videofileoftour)
        return toast.error("Please choose a video file!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      setIsCompressing(true);
      //to prevent multiple tap of compression
      if (compressionTap > 0)
        return console.log("Iwont letyou do you have already done");
      setCompressionTap((value) => value + 1);
      const compressedBlob = await compressVideo(videofileoftour);
      const previewUrl = URL.createObjectURL(compressedBlob);

      console.log("compression done");
      // Set preview and prepare for upload
      setIsCompressing(false);
      setpreviewtour(previewUrl);

      // Set the compressed blob in state for later submission
      // setVideoToUpload(compressedBlob);
      const compressedFile = new File(
        [compressedBlob],
       ` compressed_${videofileoftour.name}`,
        {
          type: "video/mp4", // or 'video/webm' depending on your compression
          lastModified: Date.now(),
        }
      ); // Get the selected file
      setvideofileoftour(compressedFile);
      toast.success("Video compressed succesfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setHasCompressed(true);
      setCompressionTap(0);
    } catch (error) {
      console.error("Video processing error:", error);
    }
  };

  // Compression using browser APIs
  const compressVideo = (file) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.muted = true; // Required for automatic playback
      video.playsInline = true;
      video.src = URL.createObjectURL(file);

      video.addEventListener("loadedmetadata", () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Set canvas dimensions (maintain aspect ratio)
        const aspectRatio = video.videoWidth / video.videoHeight;
        canvas.width = 1280;
        canvas.height = canvas.width / aspectRatio;

        video.addEventListener("canplay", async () => {
          const stream = canvas.captureStream(30);
          const recorder = new MediaRecorder(stream, {
            mimeType: "video/webm;codecs=vp9",
            bitsPerSecond: 2500000, // Higher bitrate for better compatibility
          });

          const chunks = [];
          recorder.ondataavailable = (e) => chunks.push(e.data);
          recorder.onstop = () => {
            const blob = new Blob(chunks, { type: "video/webm" });
            resolve(blob);
          };

          // Start recording
          recorder.start();

          // Render video frames continuously
          const startTime = Date.now();
          const drawFrame = () => {
            if (video.paused || video.ended) return;

            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            requestAnimationFrame(drawFrame);
          };

          video
            .play()
            .then(() => {
              drawFrame();

              // Record for actual video duration
              setTimeout(() => {
                recorder.stop();
                stream.getTracks().forEach((track) => track.stop());
                URL.revokeObjectURL(video.src);
              }, video.duration * 1000);
            })
            .catch(reject);
        });
      });

      video.addEventListener("error", (error) => {
        URL.revokeObjectURL(video.src);
        reject(error);
      });
    });
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
    // Declare files properly
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
    // Save and exit edit mode
    setIsHeroSubmitting(true);
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
      // alert(response.message)
      console.log("Posting response:", response);
      toast.success("Updated successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setIsHeroSubmitting(false);
      setIsEditing1(false);
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
    setIsYearBackgroundSubmitting(true);
    console.log("files", yearbackroundiamgefile);
    const formdata = new FormData();
    formdata.append("image", yearbackroundiamgefile);
    try {
      const res = await postyearbackroundimage(formdata);
      // alert(res.message);
      setIsYearBackgroundSubmitting(false);
      toast.success("Updated successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      fetchbackroundimageofyear();
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
    if (isCompressing)
      return toast.warning("Video is being compressed, please wait!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    if (!videofileoftour)
      return toast.error("Please choose a video file", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

    console.log("file", videofileoftour);
    const formdata = new FormData();
    formdata.append("video", videofileoftour);
    setIsTourVideoSubmitting(true);
    try {
      const p = await PostTourVideo(formdata);
      console.log("p", p);

      setIsTourVideoSubmitting(false);
      toast.success("Updated sucessfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      setIsTourVideoSubmitting(false);
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
    <main className="p-1 sm:p-6 bg-gray-100 min-h-screen">
      {/* Form Container */}
      <ToastContainer></ToastContainer>
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-5xl mx-auto">
        <h2 className="text-lg sm:text-3xl flex justify-center items-center sm:items-end gap-2 font-bold p-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center">
          <span className="">
            <svg
              width="50px"
              height="50px"
              className="sm:w-[50px] sm:h-[50px] w-[30px] w-[30px]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 22L2 22"
                stroke="#ffff"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M2 11L10.1259 4.49931C11.2216 3.62279 12.7784 3.62279 13.8741 4.49931L22 11"
                stroke="#ffff"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                opacity="0.5"
                d="M15.5 5.5V3.5C15.5 3.22386 15.7239 3 16 3H18.5C18.7761 3 19 3.22386 19 3.5V8.5"
                stroke="#ffff"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M4 22V9.5"
                stroke="#ffff"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M20 22V9.5"
                stroke="#ffff"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                opacity="0.5"
                d="M15 22V17C15 15.5858 15 14.8787 14.5607 14.4393C14.1213 14 13.4142 14 12 14C10.5858 14 9.87868 14 9.43934 14.4393C9 14.8787 9 15.5858 9 17V22"
                stroke="#ffff"
                strokeWidth="1.5"
              />
              <path
                opacity="0.5"
                d="M14 9.5C14 10.6046 13.1046 11.5 12 11.5C10.8954 11.5 10 10.6046 10 9.5C10 8.39543 10.8954 7.5 12 7.5C13.1046 7.5 14 8.39543 14 9.5Z"
                stroke="#ffff"
                strokeWidth="1.5"
              />
            </svg>
          </span>
          Home
        </h2>

        {/* Hero Section */}
        <div className="border-b-2 border-gray-300">
          <h2 className="text-xl p-4 text-gray-800 font-semibold underline decoration-blue-500 decoration-2">
            Hero Section
          </h2>
          <form className="space-y-6 p-6" onSubmit={handleSubmit1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Hero Heading */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Hero Heading
                </label>
                <input
                  type="text"
                  value={heroheader}
                  onChange={(e) => setheroheader(e.target.value)}
                  className="w-full p-3 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  placeholder="Enter heading"
                  disabled={!isEditing1}
                />
              </div>

              {/* Hero Description */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Hero Description
                </label>
                <input
                  type="text"
                  value={ herocontent}
                  
                  // onBlur={(newContent) => setherocontent(newContent)}
                  onChange={(e) => {setherocontent(e.target.value)}}
                  className="w-full p-4 border-2 border-gray-300 bg-white rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-200 ease-in-out"
                  disabled={!isEditing1}
                />
              </div>

              {/* Hero Video */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Hero Video
                </label>
                <input
                  type="file"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  onChange={handleVideoUpload}
                  disabled={!isEditing1}
                />
                {videoPreview && (
                  <div className="mt-4">
                    <video
                      controls
                      src={videoPreview}
                      className="w-full h-auto rounded-lg shadow-md"
                    >
                      Your browser does not support the video tag.
                    </video>
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
                  disabled={isHeroSubmitting}
                >
                  {isHeroSubmitting ? "Submitting..." : "Submit"}
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

        {/* Tour Video Section */}
        <div className="w-full">
          <h2 className="text-xl p-4 text-gray-800 font-semibold underline decoration-blue-500 decoration-2">
            Tour Video Section
          </h2>
          <div className="bg-white shadow-md rounded-lg p-6">
            <input
              type="file"
              required
              accept="video/*"
              onChange={changevideotour}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
            <div className="w-full flex flex-col items-center mt-4">
              <div className="relative w-full max-w-3xl">
                <video
                  src={
                    previewvideoftour ? previewvideoftour : tourvideodata?.video
                  }
                  controls
                  className="w-full rounded-lg shadow-lg border border-gray-200"
                ></video>
                <p className="mt-4 text-red-600 text-sm text-gray-600">
                  *Note: You may loose the audio if you compress.
                </p>
              </div>
            </div>

            <div className="flex justify-center text-xs sm:text-lg flex-wrap mt-6 gap-2">
              <button
                onClick={handlesubmitoftourvideo}
                disabled={isTourSubmitting}
                className="flex items-center gap-2 px-2 sm:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {isTourSubmitting ? "Submitting..." : "Submit"}
              </button>
              <button
                className="bg-yellow-500 rounded-lg px-2 sm:px-6 py-2 text-white"
                onClick={startCompression}
              >
                {hasCompressed
                  ? "Compressed"
                  : isCompressing
                  ? "Compressing..."
                  : "Compress"}
              </button>
            </div>
          </div>
        </div>

        {/* Hero Background Section */}
        <div className="border-b-2 border-gray-300">
          <h2 className="text-xl p-4 text-gray-800 font-semibold underline decoration-blue-500 decoration-2">
            Hero Background
          </h2>
          <form className="space-y-6 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Hero Background Image */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Hero Image
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
                  {isYearBackgroundSubmitting ? "Submitting..." : "Submit"}
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

export default HomeForm;