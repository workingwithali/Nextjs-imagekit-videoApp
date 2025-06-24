"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, User } from "lucide-react";
import { useNotification } from "./Notification";
import { useState } from "react";

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();
  const [showPopup, setShowPopup] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
      setShowPopup(false);
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  return (
    <>
      <div className="navbar bg-base-300 sticky top-0 z-40">
        <div className="container mx-auto">
          <div className="flex-1 px-2 lg:flex-none">
            <Link
              href="/"
              className="btn btn-ghost text-xl gap-2 normal-case font-bold"
              prefetch={true}
              onClick={() =>
                showNotification("Welcome to ImageKit ReelsPro", "info")
              }
            >
              <Home className="w-5 h-5" />
              Video with AI
            </Link>
          </div>
          <div className="flex flex-1 justify-end px-2">
            <button
              onClick={() => setShowPopup(true)}
              className="btn btn-ghost btn-circle"
              title="Account"
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
          <div className="bg-base-100 rounded-lg shadow-lg w-80 p-4 relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-lg btn btn-sm btn-circle"
              aria-label="Close"
            >
              ✕
            </button>
            {session ? (
              <>
                <div className="mb-2 text-sm text-gray-600">
                  Signed in as <strong>{session.user?.email?.split("@")[0]}</strong>
                </div>
                <div className="divider my-2"></div>
                <Link
                  href="/upload"
                  onClick={() => {
                    showNotification("Welcome to Admin Dashboard", "info");
                    setShowPopup(false);
                  }}
                  className="btn btn-block btn-outline mb-2"
                >
                  Upload Video
                </Link>
                <button
                  onClick={handleSignOut}
                  className="btn btn-block btn-error"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => {
                  showNotification("Please sign in to continue", "info");
                  setShowPopup(false);
                }}
                className="btn btn-block"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
