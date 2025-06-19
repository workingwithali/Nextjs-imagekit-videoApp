"use client";

import VideoUploadForm from "../components/VideoUploadForm";

export default function VideoUploadPage() {
  return (
    <div className="min-h-screen bg-black text-purple-500 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-gray-900 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Upload New Reel</h1>
        <VideoUploadForm />
      </div>
    </div>
  );
}
