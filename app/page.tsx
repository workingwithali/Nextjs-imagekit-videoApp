"use client";
import { useEffect, useState } from "react";
import VideoFeed from "./components/VideoFeed";
import Header from "./components/Header";
import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video";
import VideoFeedWrapper from "./components/VideoFeedWrapper";

export default function HomePage() {
  // const [videos, setVideos] = useState<IVideo[]>([]);

  // useEffect(() => {
  //   apiClient.getVideos().then((res) => {
      
  //     const data = res as { videos: IVideo[] };
  //     setVideos(data.videos);
      

  //   });
    
  // }, []);

  return (
    <>
      <Header />
      <VideoFeedWrapper />
      {/* {videos ? (
        <VideoFeed videos={videos} />
      ) : (
        <p className="text-center">Loading videos...</p>
      )} */}
    </>
  );
}
