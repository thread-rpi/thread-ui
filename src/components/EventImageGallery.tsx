import { useGetEventImageDetails } from "../api/queries";
import type { EventImageDetails } from "../types/imageTypes";
import Loader from "./Loader";

const EVENT_IMAGE_COMPRESSION_SUFFIX = "og.jpg";

interface EventImageGalleryProps {
  imageData: string[];
  isDataReady: boolean;
  isImageFocused: boolean;
  onToggleImageFocused: () => void;
}

export default function EventImageGallery({ imageData, isDataReady, isImageFocused, onToggleImageFocused }: EventImageGalleryProps) {
  // console.log("IMAGE DATA?", imageData ?? "No image data");
  const {isSuccess: isImageDetailsSuccess, data: imageDetails, isLoading: isImageDetailsLoading, isError: isImageDetailsError} = useGetEventImageDetails(imageData, isDataReady);
  // console.log("IMAGE DETAILS?", imageDetails ?? "No image details");

  if (isImageDetailsLoading) {
    return <Loader />;
  }

  if (isImageDetailsError || (!isImageDetailsSuccess && !imageDetails)) {
    console.error("Error loading image details: ", isImageDetailsError ?? "Unknown error");
    return (
      <div className="w-full h-max px-4 pb-10 flex flex-col justify-center gap-4">
        <p className="text-white text-sm md:text-xl">Images for this event coming soon. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className={`w-full flex flex-col gap-4 sm:gap-7 lg:gap-9 xl:gap-12 pb-5 transition-all duration-300 ${isImageFocused ? "brightness-110" : "brightness-100"}`}>
      {imageDetails.map((image) => (
        <Image key={image.id} image={image} onToggleImageFocused={onToggleImageFocused} />
      ))}
    </div>
  );
}

function Image({ image, onToggleImageFocused }: { image: EventImageDetails, onToggleImageFocused: () => void }) {
  const imageUrl = import.meta.env.VITE_CLOUDFRONT_HOST + image.path + EVENT_IMAGE_COMPRESSION_SUFFIX;
  return (
    <div className="w-max max-w-full relative rounded-2xl overflow-hidden">
      <img src={imageUrl} alt={image.caption} className="w-full h-full object-cover" onClick={onToggleImageFocused} />
    </div>
  );
}