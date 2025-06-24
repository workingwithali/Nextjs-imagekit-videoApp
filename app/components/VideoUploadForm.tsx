"use client";

import React, { useState } from "react";
import FileUpload from "./FileUpload";

function VideoUploadForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleUploadSuccess = (res: any) => {
    setVideoUrl(res.url); // ImageKit response includes .url
    alert("Video uploaded successfully!");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !videoUrl) {
      alert("Please complete all fields and upload a video.");
      return;
    }

    // Submit form data (e.g., to backend or DB)
    const formData = {
      title,
      description,
      videoUrl,
    };

    console.log("Submitted Video Info:", formData);
    alert("Video data submitted successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 rounded shadow space-y-4">
      

      <input
        type="text"
        placeholder="Video Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input  rounded border w-full pl-4  placeholder:italic"
        required
      />

      <textarea
        placeholder="Video Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="textarea rounded border w-full pl-4  placeholder:italic"
      />

      <FileUpload
        fileType="video"
        onSuccess={handleUploadSuccess}
        onProgress={(progress) => setUploadProgress(progress)}
      />

      {uploadProgress !== null && (
        <progress className="progress w-full" value={uploadProgress} max="100" />
      )}

      <button type="submit" className="btn btn-primary pl-4 pr-4 pt-2 pb-2 border rounded-2xl">
        Submit Video
      </button>
    </form>
  );
}

export default VideoUploadForm;
