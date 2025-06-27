"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, User } from "lucide-react";
import { useNotification } from "./Notification";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
      setShowPopup(false);
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  // Close popup on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setShowPopup(false);
      }
    };
    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);

  return (
    <>
      <div className="navbar bg-base-300 sticky top-0 z-40">
        <div className="container mx-auto ">
          <div className="flex-1 px-2 lg:flex-none  ">
            <Link
              href="/"
              className="btn btn-ghost text-xl gap-2 normal-case font-bold flex items-center pt-2"
              prefetch={true}
              onClick={() =>
                showNotification("Welcome to ImageKit ReelsPro", "info")
              }
            >
              <Home className="w-5 h-5" />
              <h1> Video with AI</h1>
             
            </Link>
          </div>
          <div className="flex flex-1 justify-end px-2 relative">
            <button
              onClick={() => setShowPopup(!showPopup)}
              className="btn btn-ghost btn-circle"
              title="Account"
            >
              <User className="w-5 h-5" />
            </button>

            {showPopup && (
              <div
                ref={popupRef}
                className="absolute right-0 mt-12 w-64 bg-base-100 rounded-lg shadow-xl z-50 p-3 border border-2"
              >
                {session ? (
                  <>
                    <div className="text-sm text-gray-500 mb-1">
                      Signed In As{" "}
                      <strong>{session.user?.email?.split("@")[0].toUpperCase()}</strong>
                    </div>
                    <div className="divider my-2"></div>
                    <Link
                      href="/upload"
                      onClick={() => {
                        showNotification("Welcome to Admin Dashboard", "info");
                        setShowPopup(false);
                      }}
                      className="block w-full px-3 py-2 rounded hover:bg-base-200 text-left"
                    >
                      Upload Video
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full px-3 py-2 mt-1 text-error hover:bg-base-200 text-left rounded"
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
                    className="block w-full px-3 py-2 hover:bg-base-200 rounded text-left"
                  >
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
