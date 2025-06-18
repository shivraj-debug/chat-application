import LogOutButton from "../components/sidebar/LogOutButton.jsx";
import PropTypes from "prop-types";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext.jsx";
import { Upload } from "lucide-react";
import { Pencil } from "lucide-react";

import {
  FaUser,
  FaLock,
  FaComments,
  FaBell,
  FaDatabase,
  FaQuestionCircle,
} from "react-icons/fa";

export default function Setting() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [message, setMessage] = useState("");
  const { authuser } = useAuthContext();

  const url = import.meta.env.VITE_URL;

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
      setImageUploaded(false);
      setMessage("");
    }
  };

  const uploadImage = async () => {
    if (!selectedFile) {
      setMessage("Please select an image first");
      return;
    }

    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch(`${url}/api/users/pic`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Image uploaded successfully!");
        setImageUploaded(true);
        setSelectedFile(null);
      } else {
        setMessage(result.error || "Upload failed");
      }
    } catch (error) {
      setMessage("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-2/5 p-6 space-y-6 border-r border-gray-800">
        {/* Profile Card */}
        <div className="bg-gray-800 p-4 rounded-lg shadow">
          <img
            src={previewURL || authuser.profilePic}
            alt="Avatar"
            className="w-16 h-16 rounded-full mx-auto object-cover"
          />
          <h2 className="text-center font-semibold mt-2">
            {authuser.fullName}
          </h2>
          <p className="text-center text-sm text-gray-400">{authuser.about}</p>
        </div>

        {/* Menu */}
        <nav className="space-y-3">
          <MenuItem icon={<FaUser />} label="Account" />
          <MenuItem icon={<FaLock />} label="Privacy" />
          <MenuItem icon={<FaComments />} label="Chats" />
          <MenuItem icon={<FaBell />} label="Notifications" />
          <MenuItem icon={<FaDatabase />} label="Storage and data" />
          <MenuItem icon={<FaQuestionCircle />} label="Help" />
        </nav>
      </div>

      {/* Main content */}
      <div className="w-3/4 p-10">
        <h1 className="text-2xl font-semibold mb-6">Edit Profile</h1>

        {/* Profile section */}
        <div className="bg-gray-800 p-6 rounded-lg space-y-6">
          <div className="flex items-center space-x-4">
            <img
              src={previewURL || authuser.profilePic}
              alt="Avatar"
              className="w-16 h-16 rounded-full object-cover"
            />

            <div className="space-y-2">
              {!imageUploaded ? (
                <>
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="text-white"
                  />
                  {selectedFile && (
                    <button
                      onClick={uploadImage}
                      disabled={uploading}
                      className="bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                    >
                      {uploading ? (
                        <div className="animate-spin h-4 w-4 border-b-2 border-white rounded-full" />
                      ) : (
                        <>
                          <Upload className="h-4 w-4" />
                          Upload
                        </>
                      )}
                    </button>
                  )}
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setImageUploaded(false);
                      setSelectedFile(null);
                      setPreviewURL(null);
                      document.getElementById("fileInput").click();
                    }}
                    className="text-blue-500 hover:underline flex items-center gap-2"
                  >
                    <Pencil className="h-4 w-4" />
                    Edit Image
                  </button>
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </>
              )}
              {message && (
                <p className="text-sm mt-1 text-red-400">{message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              value={authuser.fullName}
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Phone number</label>
            <input
              type="text"
              value={authuser.phoneNumber}
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm mb-1">About</label>
            <input
              type="text"
              value={authuser.about}
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
              readOnly
            />
          </div>

          <button className="w-full text-red-500 font-semibold py-2 rounded hover:bg-red-800 bg-gray-700 flex justify-center items-center space-x-2">
            <div className="mb-3">
              <LogOutButton />
            </div>
            <div>Log out</div>
          </button>
        </div>
      </div>
    </div>
  );
}

function MenuItem({ icon, label }) {
  return (
    <div className="flex items-center p-3 rounded-lg bg-gray-800 hover:bg-gray-700 cursor-pointer">
      <div className="mr-3">{icon}</div>
      <span>{label}</span>
    </div>
  );
}

MenuItem.propTypes = {
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
};
