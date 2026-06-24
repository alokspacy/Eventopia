import { useEffect } from "react";
import ReactPlayer from "react-player";
import { X } from "lucide-react";

const TrailerModal = ({ isOpen, onClose, trailerUrl, movieTitle }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md transition-opacity duration-300 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all transform scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/5 bg-zinc-900/50">
          <h3 className="text-lg font-semibold text-white truncate max-w-[80%]">
            {movieTitle ? `${movieTitle} - Official Trailer` : "Official Trailer"}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition duration-200"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Video Player Container */}
        <div className="relative aspect-video w-full bg-black">
          {trailerUrl ? (
            <ReactPlayer
              url={trailerUrl}
              controls
              playing
              width="100%"
              height="100%"
              className="absolute top-0 left-0"
              config={{
                youtube: {
                  playerVars: { autoplay: 1 }
                }
              }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <p>Loading trailer...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;
