import React, { useState } from "react";
import { Copy, Check, Upload, Sparkles } from "lucide-react";

function App() {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setCaption("");
    setCopied(false);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${API_URL}/generate-caption/`, {
        method: "POST",
        body: formData,
      });
      
      const result = await response.json();
      
      if (result.error) {
        setCaption("❌ " + result.error);
      } else {
        setCaption(result.caption);
      }
    } catch (error) {
      console.error("Caption generation failed:", error);
      setCaption("❌ Failed to generate caption. Make sure the backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCaption = async () => {
    if (!caption) return;
    
    try {
      await navigator.clipboard.writeText(caption);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy caption:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-8 rounded-3xl shadow-2xl w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Image Caption Generator
            </h1>
          </div>
          <p className="text-gray-400 text-sm">Upload an image and get AI-generated captions instantly</p>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="flex items-center justify-center w-full h-12 bg-gray-700/50 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:bg-gray-700/70 hover:border-gray-500 transition-all duration-200 group"
            >
              <Upload className="w-5 h-5 text-gray-400 mr-2 group-hover:text-gray-300" />
              <span className="text-gray-400 group-hover:text-gray-300">
                {file ? file.name : "Choose an image file"}
              </span>
            </label>
          </div>

          {preview && (
            <div className="relative">
              <img 
                src={preview} 
                alt="Preview" 
                className="w-full rounded-xl border border-gray-600 shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl pointer-events-none"></div>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                Generating Caption...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Caption
              </>
            )}
          </button>

          {caption && (
            <div className="bg-gray-700/30 border border-gray-600/50 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-300 font-semibold text-sm uppercase tracking-wide">
                  Generated Caption
                </span>
                <button
                  onClick={handleCopyCaption}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-600/50 hover:bg-gray-600/70 rounded-lg transition-colors duration-200 text-sm"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="text-green-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-gray-300" />
                      <span className="text-gray-300">Copy</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-gray-100 leading-relaxed">
                {caption}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;