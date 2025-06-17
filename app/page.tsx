import Link from 'next/link';

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-purple-500">
      <Navbar />

      {/* Main Body */}
      <main className="flex-grow flex flex-col items-center justify-center text-center p-8">
        <h1 className="text-4xl font-bold mb-6">Welcome to the Video Uploader</h1>
        
        <Link href="/upload">
          <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
            Upload Video
          </button>
        </Link>
      </main>

      <Footer />
    </div>
  );
}
