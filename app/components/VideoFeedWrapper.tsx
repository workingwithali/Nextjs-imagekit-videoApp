// components/VideoFeedWrapper.tsx
"use client";

import { useEffect, useState } from "react";
import VideoFeed from "./VideoFeed";
import { IVideo } from "@/models/Video";

export default function VideoFeedWrapper() {
    const [videos, setVideos] = useState<IVideo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchVideos() {
            try {
                const res = await fetch("/api/video");
                if (!res.ok) throw new Error("Failed to fetch videos");

                const data = await res.json();
                setVideos(data);
            } catch (err: any) {
                console.error("Error fetching videos:", err);
                setError(err.message || "Unexpected error");
            } finally {
                setLoading(false);
            }
        }

        fetchVideos();
    }, []);

    if (loading) return <p className="text-center py-12">Loading...</p>;
    if (error) return <p className="text-center py-12 text-error">{error}</p>;

    return <VideoFeed videos={videos} />;
}
