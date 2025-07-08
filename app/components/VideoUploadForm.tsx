"use client";

import React, { useState } from "react";
import FileUpload from "./FileUpload";
import Image from "next/image";
import { useRouter } from "next/navigation";

function VideoUploadForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleUploadSuccess = (res: any) => {
    if (res?.url) {
      setVideoUrl(res.url);
      alert("✅ Video uploaded successfully!");
    } else {
      alert("❌ Upload failed, no URL received.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !videoUrl) {
      alert("Please complete all fields and upload a video.");
      return;
    }

    const formData = {
      title,
      description,
      videoUrl,
      thumbnailUrl,
    };
    

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("🎉 Video data submitted successfully!");
        console.log("✅ Submitted:", data);
        router.push("/");


        // Optionally reset the form
        setTitle("");
        setDescription("");
        setVideoUrl(null);
        setThumbnailUrl(null);
        setUploadProgress(null);
      } else {
        console.error("❌ API Error:", data);
        alert("Submission failed. Check console.");
      }
    } catch (error) {
      console.error("❌ Submission error:", error);
      alert("Error submitting video.");
    } finally {
      setIsSubmitting(false);
    }
    
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 rounded shadow space-y-4 bg-white dark:bg-gray-900"
    >
      <input
        type="text"
        placeholder="Video Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input rounded border w-full pl-4 py-2 placeholder:italic"
        required
      />

      <textarea
        placeholder="Video Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="textarea rounded border w-full pl-4 py-2 placeholder:italic"
      />

      <FileUpload
        fileType="video"
        onSuccess={handleUploadSuccess}
        onProgress={(progress) => setUploadProgress(progress)}
      />

      {uploadProgress !== null && (
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
          <div
            className="bg-purple-600 h-full transition-all duration-500 ease-in-out"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      
      )}

      {videoUrl && (
        <video
          src={videoUrl}
          controls
          className="w-full rounded shadow border mt-2"
        />
      )}
      <FileUpload
        fileType="image"
        onSuccess={(res) => {
          if (res?.url) {
            setThumbnailUrl(res.url);
            alert("✅ Thumbnail uploaded successfully!");
          } else {
            alert("❌ Thumbnail upload failed.");
          }
        }}
        onProgress={() => { }} // Optional: handle progress separately
      />
      {thumbnailUrl ? (
        <Image
          src={thumbnailUrl}
          alt="Thumbnail Preview"
          width={640}
          height={360}
          className="w-full rounded shadow border mt-2 object-cover"
        />
      ) : null}


      
  

      <button
        type="submit"
        disabled={!videoUrl || !thumbnailUrl || isSubmitting}
        className={`btn btn-primary pl-4 pr-4 pt-2 pb-2 border rounded-2xl ${(!videoUrl || isSubmitting) && "opacity-50 cursor-not-allowed"
          }`}
      >
        {isSubmitting ? "Submitting..." : "Submit Video"}
      </button>
    </form>
  );
}

export default VideoUploadForm;
