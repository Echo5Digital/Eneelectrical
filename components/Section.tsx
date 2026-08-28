import React from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: "default" | "primary" | "secondary" | "white";
  spacing?: "sm" | "md" | "lg" | "xl";
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  containerClassName?: string;
  as?: keyof JSX.IntrinsicElements;
}

const backgroundMap: Record<string, string> = {
  default: "bg-[#F7F8FA]",
  primary: "bg-[#0B1F3A]",
  secondary: "bg-[#F5A623]",
  white: "bg-white",
};

const spacingMap: Record<string, string> = {
  sm: "py-8 md:py-12",
  md: "py-12 md:py-16",
  lg: "py-16 md:py-24",
  xl: "py-20 md:py-32",
};

const maxWidthMap: Record<string, string> = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-5xl",
  xl: "max-w-6xl",
  "2xl": "max-w-7xl",
  full: "max-w-full",
};

const Section: React.FC<SectionProps> = ({
  children,
  className = "",
  id,
  background = "default",
  spacing = "lg",
  maxWidth = "xl",
  containerClassName = "",
  as: Tag = "section",
}) => {
  const bgClass = backgroundMap[background] ?? backgroundMap.default;
  const spacingClass = spacingMap[spacing] ?? spacingMap.lg;
  const maxWidthClass = maxWidthMap[maxWidth] ?? maxWidthMap.xl;

  return (
    <Tag
      id={id}
      className={`w-full ${bgClass} ${spacingClass} ${className}`}
    >
      <div
        className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${maxWidthClass} ${containerClassName}`}
      >
        {children}
      </div>
    </Tag>
  );
};

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  inverted?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = "center",
  inverted = false,
}) => {
  const alignClass =
    align === "center"
      ? "text-center items-center"
      : align === "right"
      ? "text-right items-end"
      : "text-left items-start";

  const titleColor = inverted ? "text-white" : "text-[#0B1F3A]";
  const subtitleColor = inverted ? "text-white/75" : "text-[#1A2530]/65";
  const eyebrowColor = "text-[#F5A623]";

  return (
    <div className={`flex flex-col gap-3 mb-10 md:mb-14 ${alignClass}`}>
      {eyebrow && (
        <span
          className={`inline-block font-semibold text-sm uppercase tracking-widest ${eyebrowColor}`}
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-3xl sm:text-4xl md:text-5xl font-bold leading-tight ${titleColor}`}
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-base sm:text-lg max-w-2xl leading-relaxed ${subtitleColor}`}
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`mt-1 h-1 w-14 rounded-full bg-[#F5A623] ${
          align === "center" ? "self-center" : align === "right" ? "self-end" : "self-start"
        }`}
      />
    </div>
  );
};

export default Section;