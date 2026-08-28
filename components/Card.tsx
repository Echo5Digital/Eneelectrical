import React from "react";
import Image from "next/image";
import { LucideIcon } from "lucide-react";

export type CardVariant = "service" | "testimonial" | "blog" | "default";

interface BaseCardProps {
  variant?: CardVariant;
  className?: string;
}

interface ServiceCardProps extends BaseCardProps {
  variant: "service";
  title: string;
  description: string;
  icon?: LucideIcon;
  imageSrc?: string;
  imageAlt?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
}

interface TestimonialCardProps extends BaseCardProps {
  variant: "testimonial";
  quote: string;
  authorName: string;
  authorLocation?: string;
  rating?: number;
  avatarSrc?: string;
}

interface BlogCardProps extends BaseCardProps {
  variant: "blog";
  title: string;
  excerpt: string;
  imageSrc?: string;
  imageAlt?: string;
  date?: string;
  category?: string;
  readTime?: string;
  onCtaClick?: () => void;
}

interface DefaultCardProps extends BaseCardProps {
  variant?: "default";
  title?: string;
  description?: string;
  icon?: LucideIcon;
  imageSrc?: string;
  imageAlt?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
}

type CardProps =
  | ServiceCardProps
  | TestimonialCardProps
  | BlogCardProps
  | DefaultCardProps;

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill={i < rating ? "#F5A623" : "#D1D5DB"}
        className="w-4 h-4"
        aria-hidden="true"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const Card: React.FC<CardProps> = (props) => {
  const { variant = "default", className = "" } = props;

  const baseCardClasses =
    "bg-white rounded-[0.75rem] shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col";

  if (variant === "testimonial") {
    const { quote, authorName, authorLocation, rating = 5, avatarSrc } =
      props as TestimonialCardProps;

    return (
      <div
        className={`${baseCardClasses} p-6 border border-gray-100 ${className}`}
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {/* Quote mark */}
        <div
          className="text-5xl leading-none mb-3 font-bold select-none"
          style={{ color: "#F5A623" }}
          aria-hidden="true"
        >
          &ldquo;
        </div>

        {/* Rating */}
        <div className="mb-3">
          <StarRating rating={rating} />
        </div>

        {/* Quote text */}
        <p
          className="text-[#1A2530] text-sm leading-relaxed flex-grow mb-5 italic"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {quote}
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          {avatarSrc ? (
            <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={avatarSrc}
                alt={`Photo of ${authorName}`}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm"
              style={{ backgroundColor: "#0B1F3A" }}
              aria-hidden="true"
            >
              {authorName.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p
              className="font-semibold text-sm"
              style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
            >
              {authorName}
            </p>
            {authorLocation && (
              <p className="text-xs text-gray-500">{authorLocation}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "blog") {
    const {
      title,
      excerpt,
      imageSrc,
      imageAlt,
      date,
      category,
      readTime,
      onCtaClick,
    } = props as BlogCardProps;

    return (
      <div
        className={`${baseCardClasses} border border-gray-100 ${className}`}
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {/* Image */}
        {imageSrc && (
          <div className="relative w-full h-48 overflow-hidden flex-shrink-0">
            <Image
              src={imageSrc}
              alt={imageAlt || title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
            {category && (
              <span
                className="absolute top-3 left-3 text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full"
                style={{
                  backgroundColor: "#F5A623",
                  color: "#0B1F3A",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                {category}
              </span>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Meta */}
          {(date || readTime) && (
            <div className="flex items-center gap-3 mb-3">
              {date && <p className="text-xs text-gray-400">{date}</p>}
              {date && readTime && (
                <span className="text-gray-300 text-xs">•</span>
              )}
              {readTime && (
                <p className="text-xs text-gray-400">{readTime} read</p>
              )}
            </div>
          )}

          {/* Title */}
          <h3
            className="text-base font-bold mb-2 leading-snug"
            style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
          >
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-gray-500 leading-relaxed flex-grow mb-5 line-clamp-3">
            {excerpt}
          </p>

          {/* CTA */}
          <button
            onClick={onCtaClick}
            className="self-start text-sm font-semibold uppercase tracking-wide flex items-center gap-1 transition-opacity hover:opacity-75"
            style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}
            aria-label={`Read more about ${title}`}
          >
            Read More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // service / default
  const {
    title,
    description,
    icon: Icon,
    imageSrc,
    imageAlt,
    ctaLabel,
    onCtaClick,
  } = props as ServiceCardProps | DefaultCardProps;

  return (
    <div
      className={`${baseCardClasses} border border-gray-100 ${className}`}
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Image (if provided) */}
      {imageSrc && !Icon && (
        <div className="relative w-full h-44 overflow-hidden flex-shrink-0">
          <Image
            src={imageSrc}
            alt={imageAlt || title || "Card image"}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Icon */}
        {Icon && (
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 flex-shrink-0"
            style={{ backgroundColor: "#F5A623" }}
            aria-hidden="true"
          >
            <Icon size={22} color="#0B1F3A" strokeWidth={2} />
          </div>
        )}

        {/* Title */}
        {title && (
          <h3
            className="text-lg font-bold mb-2 leading-snug"
            style={{
              color: "#0B1F3A",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            {title}
          </h3>
        )}

        {/* Accent line */}
        {title && (
          <div
            className="w-10 h-0.5 mb-3 rounded-full"
            style={{ backgroundColor: "#F5A623" }}
            aria-hidden="true"
          />
        )}

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-500 leading-relaxed flex-grow mb-5">
            {description}
          </p>
        )}

        {/* CTA */}
        {ctaLabel && (
          <button
            onClick={onCtaClick}
            className="mt-auto self-start px-5 py-2.5 rounded-xl text-sm font-semibold uppercase tracking-wide shadow-md hover:shadow-lg transition-all duration-200 hover:brightness-105"
            style={{
              backgroundColor: "#F5A623",
              color: "#0B1F3A",
              fontFamily: "Montserrat, sans-serif",
            }}
            aria-label={ctaLabel}
          >
            {ctaLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;