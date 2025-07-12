import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight, FaDownload, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import logo from '../assets/logo.png'; // Import your logo
import carouselImage1 from '../assets/events/012A3702.jpg';
import carouselImage2 from '../assets/events/DSC07070.jpg';
import carouselImage3 from '../assets/events/DSC07105.jpg';

// Import all event images using Vite's import.meta.glob
// This assumes your images are in the assets/events directory
const eventImages = import.meta.glob('../assets/events/**/*.{png,jpg,jpeg,webp}', { eager: true });

const Gallery = () => {
  // State for images
  const [images, setImages] = useState([]);
  const [randomizedImages, setRandomizedImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [modalImageLoaded, setModalImageLoaded] = useState(false);
  const [columns, setColumns] = useState(4);
  const [visibleCount, setVisibleCount] = useState(20);
  const [imageCache, setImageCache] = useState({});

  // Carousel state for hero section
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselImages = [
    {
      url: carouselImage1,
      title: "Media Gallery",
      subtitle: "Explore our collection of memorable moments"
    },
    {
      url: carouselImage2,
      title: "Media Gallery",
      subtitle: "Explore our collection of memorable moments"
    },
    {
      url: carouselImage3,
      title: "Media Gallery",
      subtitle: "Explore our collection of memorable moments"
    }
  ];

  const totalSlides = carouselImages.length;

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Hero carousel controls
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToNextSlide = () => {
    setCurrentSlide((currentSlide + 1) % totalSlides);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((currentSlide - 1 + totalSlides) % totalSlides);
  };

  // Update columns based on screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setColumns(1);
      else if (width < 768) setColumns(2);
      else if (width < 1024) setColumns(3);
      else setColumns(4);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load images from events folder on component mount
  useEffect(() => {
    try {
      // Convert the imported image objects to an array of URLs
      const imageArray = Object.entries(eventImages).map(([path, module]) => ({
        path,
        url: module.default,
        id: path.split('/').pop().replace(/\.[^/.]+$/, "")
      }));

      setImages(imageArray);

      // Create a copy and shuffle the array
      const shuffled = [...imageArray].sort(() => 0.5 - Math.random());
      setRandomizedImages(shuffled);
    } catch (error) {
      console.error("Error loading images:", error);
    }
  }, []);

  // Reset image loaded state when current image changes in modal
  useEffect(() => {
    setModalImageLoaded(false);
  }, [currentImageIndex]);

  // Open image in modal view
  const openImageModal = (imageIndex) => {
    setCurrentImageIndex(imageIndex);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
  };

  // Navigate to next image in modal
  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % randomizedImages.length);
  }, [randomizedImages.length]);

  // Navigate to previous image in modal
  const prevImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex - 1 + randomizedImages.length) % randomizedImages.length
    );
  }, [randomizedImages.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showModal) {
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
        if (e.key === "Escape") closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showModal, nextImage, prevImage]);

  // Preload next and previous images when modal is open
  useEffect(() => {
    if (showModal && randomizedImages.length > 0) {
      const nextIdx = (currentImageIndex + 1) % randomizedImages.length;
      const prevIdx = (currentImageIndex - 1 + randomizedImages.length) % randomizedImages.length;

      // Preload next and previous images
      const nextImg = new Image();
      nextImg.src = randomizedImages[nextIdx].url;

      const prevImg = new Image();
      prevImg.src = randomizedImages[prevIdx].url;
    }
  }, [showModal, currentImageIndex, randomizedImages]);

  // Handle scroll to load more images
  useEffect(() => {
    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1000) {
        // User is near the bottom, load more images
        if (visibleCount < randomizedImages.length) {
          setVisibleCount(prev => Math.min(prev + 20, randomizedImages.length));
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleCount, randomizedImages.length]);

  // Update image cache when an image loads or errors - but use function instead of callback
  const updateImageCache = (id, status) => {
    setImageCache(prev => {
      // Only update if status has changed
      if (prev[id] !== status) {
        return { ...prev, [id]: status };
      }
      return prev;
    });
  };

  // Gallery Item Component with lazy loading and optimized rendering
  const GalleryItem = React.memo(({ image, index }) => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      rootMargin: '300px 0px',
    });

    // Local state to track image loading status to prevent flicker
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Pre-check cache when component mounts
    useEffect(() => {
      if (imageCache[image.id] === 'loaded') setIsLoaded(true);
      if (imageCache[image.id] === 'error') setHasError(true);
    }, []);

    const handleImageLoad = () => {
      setIsLoaded(true);
      updateImageCache(image.id, 'loaded');
    };

    const handleImageError = () => {
      setHasError(true);
      updateImageCache(image.id, 'error');
    };

    return (
      <div
        ref={ref}
        className="aspect-[4/3] overflow-hidden rounded-lg shadow-md cursor-pointer relative group bg-gray-100"
        onClick={() => openImageModal(index)}
      >
        {/* Loading placeholder - shown only when image is not yet loaded or has error */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin"></div>
          </div>
        )}

        {inView && (
          <>
            <img
              key={image.id}
              src={hasError ? "https://via.placeholder.com/400x400?text=Image+Not+Available" : image.url}
              alt={`Gallery image ${index + 1}`}
              className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              style={{
                transform: 'translate3d(0,0,0)',
                willChange: 'transform'
              }}
              onError={handleImageError}
              onLoad={handleImageLoad}
              loading="lazy"
              width="400"
              height="300"
            />

            {/* Image name overlay on hover */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white text-sm truncate">
                {image.path.split('/').pop()}
              </p>
            </div>
          </>
        )}
      </div>
    );
  }, (prevProps, nextProps) => {
    // Custom comparison function to prevent unnecessary re-renders
    return prevProps.image.id === nextProps.image.id;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-stone-50"
    >
      {/* Hero Section with Carousel */}
      <section className="relative w-full h-[100vh] overflow-hidden" style={{ minHeight: '100dvh' }}>
        {/* Carousel Images */}
        {carouselImages.map((slide, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{
              opacity: currentSlide === index ? 1 : 0,
              zIndex: currentSlide === index ? 10 : 0
            }}
            transition={{ duration: 1 }}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${slide.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center'
              }}
            >
              {/* Dark overlay for better text visibility */}
              <div className="absolute inset-0 bg-black/60">
                {/* Content Centered Overlay - Updated position */}
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: currentSlide === index ? 1 : 0
                  }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <div className="max-w-3xl mx-auto px-6 py-10 rounded-lg">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
                      {slide.subtitle}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Navigation Arrows */}
        <div className="absolute z-20 flex justify-between items-center w-full top-1/2 px-4 md:px-8 transform -translate-y-1/2">
          <button
            onClick={goToPrevSlide}
            className="bg-black/40 hover:bg-black/60 text-white rounded-full p-2 md:p-3 backdrop-blur-sm transition-all hover:scale-110"
            aria-label="Previous slide"
          >
            <FaArrowLeft size={20} />
          </button>
          <button
            onClick={goToNextSlide}
            className="bg-black/40 hover:bg-black/60 text-white rounded-full p-2 md:p-3 backdrop-blur-sm transition-all hover:scale-110"
            aria-label="Next slide"
          >
            <FaArrowRight size={20} />
          </button>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index
                  ? 'bg-white scale-125 shadow-lg'
                  : 'bg-white/60 hover:bg-white/90 hover:scale-110'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {randomizedImages.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {randomizedImages.slice(0, visibleCount).map((image, index) => (
              <GalleryItem key={`${image.id}-${index}`} image={image} index={index} />
            ))}
          </div>
        )}

        {visibleCount < randomizedImages.length && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setVisibleCount(prev => Math.min(prev + 20, randomizedImages.length))}
              className="px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition"
            >
              Load More Images
            </button>
          </div>
        )}
      </div>

      {/* Full screen image modal */}
      {showModal && randomizedImages.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <button
            className="absolute top-4 right-4 z-50 bg-white/20 hover:bg-white/30 rounded-full p-3 text-white transition-colors"
            onClick={closeModal}
          >
            <FaTimes size={24} />
          </button>

          {/* Navigation buttons */}
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 text-white transition-colors"
            onClick={prevImage}
          >
            <FaChevronLeft size={24} />
          </button>

          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 text-white transition-colors"
            onClick={nextImage}
          >
            <FaChevronRight size={24} />
          </button>

          {/* Loading spinner */}
          {!modalImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
          )}

          {/* Image container */}
          <motion.div
            className="w-full h-full flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: modalImageLoaded ? 1 : 0.3 }}
            transition={{ duration: 0.2 }}
          >
            {randomizedImages[currentImageIndex] && (
              <img
                src={randomizedImages[currentImageIndex].url}
                alt={`Gallery image ${currentImageIndex + 1}`}
                className="max-h-[85vh] max-w-[90%] object-contain pointer-events-none"
                style={{ transform: 'translate3d(0,0,0)' }}
                onLoad={() => setModalImageLoaded(true)}
                onError={(e) => {
                  console.log(`Modal image failed to load:`, e.target.src);
                  e.target.src = "https://via.placeholder.com/800x600?text=Image+Not+Available";
                  setModalImageLoaded(true);
                }}
              />
            )}
          </motion.div>

          {/* Counter and download button */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-between items-center px-4">
            <div className="bg-black/50 text-white px-4 py-2 rounded-full">
              {currentImageIndex + 1} / {randomizedImages.length}
            </div>
            {randomizedImages[currentImageIndex] && (
              <a
                href={randomizedImages[currentImageIndex].url}
                download={`gallery-image-${currentImageIndex + 1}.jpg`}
                target="_blank"
                rel="noreferrer"
                className="bg-white/20 hover:bg-white/30 rounded-full p-3 text-white transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <FaDownload size={18} />
              </a>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Gallery;