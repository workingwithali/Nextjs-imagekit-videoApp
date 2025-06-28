
import Header from './components/Header';
import VideoFeed from './components/VideoFeed';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-purple-500">
      
      <Header />
      <VideoFeed videos={[]} />

      
      
      

      
    </div>
  );
}
