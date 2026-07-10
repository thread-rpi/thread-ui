import type { Image } from "../../types/imageTypes";
import { formatDate } from "../../utils/formatter";

const ADMIN_IMAGE_COMPRESSION_SUFFIX = "og.jpg";

interface AdminImageCardProps {
  image: Pick<Image, "id" | "path" | "caption" | "date" | "width" | "height" | "published">;
}

export default function AdminImageCard({ image }: AdminImageCardProps) {
  const imageUrl = import.meta.env.VITE_CLOUDFRONT_HOST + image.path + ADMIN_IMAGE_COMPRESSION_SUFFIX;

  return (
    <article className="outline-1 outline-black bg-white flex flex-col">
      <div className="aspect-[3/2] w-full overflow-hidden border-b border-black bg-thread-off-white">
        <img
          src={imageUrl}
          alt={image.caption}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-4 flex flex-col gap-3">
        <p className="text-sm font-bold leading-snug line-clamp-2">{image.caption}</p>

        <p className="text-sm text-black/60 leading-snug">{formatDate(image.date)}</p>

        <p className="text-xs font-medium uppercase tracking-wide text-black/45">
          {image.width} × {image.height}
          {image.published ? " · Published" : " · Draft"}
        </p>
      </div>
    </article>
  );
}
