import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, Play, Star, Calendar } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import TrailerModal from "./TrailerModal";
import axios from "axios";
import toast from "react-hot-toast";

const genreMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western"
};

const getGenres = (genreIds) => {
  if (!genreIds || !Array.isArray(genreIds)) return "";
  return genreIds
    .map((id) => genreMap[id])
    .filter(Boolean)
    .slice(0, 3)
    .join(" | ");
};

const truncateText = (text, maxLength) => {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const HeroSection = () => {
  const { liveMovies, getImageUrl } = useAppContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingTrailer, setLoadingTrailer] = useState(false);
  
  const timerRef = useRef(null);

  // Take top 5 live movies for the hero carousel
  const carouselMovies = liveMovies ? liveMovies.slice(0, 5) : [];

  const startTimer = () => {
    stopTimer();
    if (carouselMovies.length > 1) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselMovies.length);
      }, 6000); // changes slide every 6 seconds
    }
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [carouselMovies.length]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? carouselMovies.length - 1 : prevIndex - 1
    );
    startTimer();
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % carouselMovies.length
    );
    startTimer();
  };

  const handleWatchTrailer = async (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
    setTrailerUrl("");
    setLoadingTrailer(true);
    try {
      const { data } = await axios.get(`/api/show/movie-trailer/${movie.id}`);
      if (data.success) {
        setTrailerUrl(data.trailerUrl);
      } else {
        toast.error(data.message || "Trailer not found");
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch trailer");
      setIsModalOpen(false);
    } finally {
      setLoadingTrailer(false);
    }
  };

  if (carouselMovies.length === 0) {
    // Elegant fallback loader skeleton matching Eventopia colors
    return (
      <div className="h-screen w-full bg-zinc-950 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="animate-pulse flex flex-col items-start gap-4 px-6 md:px-16 lg:px-36 w-full max-w-7xl">
          <div className="h-4 w-32 bg-white/10 rounded-md"></div>
          <div className="h-16 w-2/3 max-w-xl bg-white/10 rounded-lg mt-4"></div>
          <div className="h-6 w-1/2 max-w-sm bg-white/10 rounded-md"></div>
          <div className="h-20 w-3/4 max-w-md bg-white/10 rounded-lg mt-2"></div>
          <div className="flex gap-4 mt-4">
            <div className="h-12 w-36 bg-white/10 rounded-full"></div>
            <div className="h-12 w-36 bg-white/10 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="h-screen w-full relative overflow-hidden bg-zinc-950"
      onMouseEnter={stopTimer}
      onMouseLeave={startTimer}
    >
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {carouselMovies.map((movie, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={movie.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 pointer-events-none scale-105"
              }`}
              style={{
                backgroundImage: `linear-gradient(to top, rgba(9, 9, 11, 1) 0%, rgba(9, 9, 11, 0.4) 40%, rgba(9, 9, 11, 0.85) 100%), url(${getImageUrl(movie.backdrop_path)})`,
                backgroundSize: "cover",
                backgroundPosition: "center 25%",
              }}
            >
              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 lg:px-36 max-w-3xl mt-12 z-20">
                {/* Meta Row */}
                <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-gray-300">
                  <span className="px-2.5 py-0.5 bg-primary/20 text-primary border border-primary/30 rounded-md font-semibold tracking-wide uppercase text-[10px] md:text-xs">
                    Live In Theatres
                  </span>
                  
                  {movie.vote_average > 0 && (
                    <span className="flex items-center gap-1 font-semibold text-white bg-black/40 px-2 py-0.5 rounded border border-white/5">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      {movie.vote_average.toFixed(1)}
                    </span>
                  )}

                  {movie.release_date && (
                    <span className="flex items-center gap-1 font-medium bg-black/40 px-2 py-0.5 rounded border border-white/5">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      {new Date(movie.release_date).getFullYear()}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mt-4 mb-2 leading-none drop-shadow-md">
                  {movie.title}
                </h1>

                {/* Genres */}
                <p className="text-primary font-medium text-xs md:text-sm tracking-wider uppercase mb-4 drop-shadow">
                  {getGenres(movie.genre_ids)}
                </p>

                {/* Overview */}
                <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-xl mb-8 drop-shadow-sm font-light">
                  {truncateText(movie.overview, 180)}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 items-center">
                  <button
                    onClick={() => handleWatchTrailer(movie)}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dull text-white text-sm md:text-base font-semibold rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    Watch Trailer
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      {carouselMovies.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 md:p-3.5 rounded-full bg-black/40 border border-white/10 text-white hover:bg-primary hover:border-primary transition-all duration-300 cursor-pointer hidden md:flex"
            aria-label="Previous slide"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 md:p-3.5 rounded-full bg-black/40 border border-white/10 text-white hover:bg-primary hover:border-primary transition-all duration-300 cursor-pointer hidden md:flex"
            aria-label="Next slide"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Slide Indicators */}
      {carouselMovies.length > 1 && (
        <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center items-center gap-2">
          {carouselMovies.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                startTimer();
              }}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                index === currentIndex ? "w-8 bg-primary" : "w-2 bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Trailer Modal Overlay */}
      <TrailerModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedMovie(null);
          setTrailerUrl("");
        }}
        trailerUrl={trailerUrl}
        movieTitle={selectedMovie?.title}
      />
    </div>
  );
};

export default HeroSection;
