import React, { useState } from 'react';
import axios from 'axios';
import { Upload, ImageIcon, Loader2 } from 'lucide-react';
import Logout from './Logout';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // 1. Handle File Selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // Create local preview
      setCaption(""); // Reset caption for new image
    }
  };

  // 2. Upload and Get Caption
  const generateCaption = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      // Replace with your actual backend URL
      const response = await axios.post('http://localhost:3000/api/posts', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
          // 'Authorization': Bearer ${token} // Ye line bohot zaroori hai req.user ke liye
        }
      });
      console.log("Caption Response:", response.data);
      setCaption(response.data.post.caption);
    } catch (error) {
      console.error("Error generating caption:", error);
      setCaption("Failed to generate caption. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center    p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">AI Image Captioner</h1>

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        {/* Upload Area */}
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer  hover:bg-gray-50 transition">
          {preview ? (
            <img src={preview} alt="Preview" className="h-full w-full object-contain rounded-lg" />
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-10 h-10 text-gray-400 mb-3" />
              <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
            </div>
          )}
          <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
        </label>

        {/* Action Button */}
        <button
          onClick={generateCaption}
          disabled={!selectedFile || isLoading}
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:bg-gray-400"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Generate Caption"}
        </button>

        {/* Result Area */}
        {caption && (
          <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
            <p className="text-gray-700 italic">"{caption}"</p>
          </div>
        )}
      </div>

        <Logout/>
    </div>
  );
}