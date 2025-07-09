"use client";

import React, { useState } from "react";
import FileUpload from "./FileUpload";
// import Image from "next/image";
import { useRouter } from "next/navigation";

function VideoUploadForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadthumbnail, setUploadthumbnail] = useState<number | null>(null);
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

    if (!title || !videoUrl || !thumbnailUrl) {
      alert("Please complete all fields, upload a video, and a thumbnail.");
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
        onProgress={(progress) => setUploadthumbnail(progress)} // Optional: handle progress separately
      />

      {uploadProgress !== null && (
        <div className="text-sm text-gray-700 dark:text-gray-300">
          Upload Progress: {uploadProgress}%
          <div className="w-full bg-gray-500 rounded-full h-4 overflow-hidden shadow-inner">
            <div
              className="bg-purple-800 h-full transition-all duration-500 ease-in-out"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>

        </div>
      )}
      {uploadthumbnail !== null && (
        <div className="text-sm text-gray-700 dark:text-gray-300">
          Upload Progress: {uploadthumbnail}%
          <div className="w-full bg-gray-500 rounded-full h-4 overflow-hidden shadow-inner">
            <div
              className="bg-purple-800 h-full transition-all duration-500 ease-in-out"
              style={{ width: `${uploadthumbnail}%` }}
            ></div>
          </div>

        </div>
      )}
      {videoUrl && (
        <div className="text-sm text-gray-500 mt-1">
          ✅ Video ready
        </div>
      )}

      {/* {videoUrl && (
        <video
          src={videoUrl}
          controls
          className="w-full rounded shadow border mt-2"
        />
      )} */}
      
      {thumbnailUrl && (
        <div className="text-sm text-gray-500 mt-1">
          ✅ Thumbnail ready
        </div>
      )}
      {/* {thumbnailUrl ? (
        <Image
          src={thumbnailUrl}
          alt="Thumbnail Preview"
          width={640}
          height={360}
          className="w-full rounded shadow border mt-2 object-cover"
        />
      ) : null} */}
      



      <button
        type="button"
        onClick={() => {
          setTitle("");
          setDescription("");
          setVideoUrl(null);
          setThumbnailUrl(null);
          setUploadProgress(null);
        }}
        className="ml-2 text-sm text-gray-600 underline"
      >
        Reset Form
      </button>


      <button
        type="submit"
        disabled={!videoUrl || !thumbnailUrl || isSubmitting}
        className={`btn btn-primary px-4 py-2 border rounded-2xl flex justify-center items-center gap-2 ${(!videoUrl || !thumbnailUrl || isSubmitting) && "opacity-50 cursor-not-allowed"
          }`}
      >
        {isSubmitting ? (
          <>
            <span className="loading loading-spinner"></span>
            Submitting...
          </>
        ) : (
          "Submit Video"
        )}
      </button>



    </form>
  );
}

export default VideoUploadForm;
