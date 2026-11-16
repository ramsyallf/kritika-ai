"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";

interface KritikaLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  withText?: boolean;
  textClassName?: string;
}

export function KritikaLogoIcon({
  size = 28,
  className,
}: {
  size?: number;
  className?: string;
}) {
  const rawId = useId();
  const id = rawId.replace(/[^a-zA-Z0-9]/g, "");

  const p0 = `p0_${id}`;
  const p1 = `p1_${id}`;
  const p2 = `p2_${id}`;
  const p3 = `p3_${id}`;
  const f0 = `f0_${id}`;
  const f1 = `f1_${id}`;
  const f2 = `f2_${id}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0 select-none", className)}
      aria-label="Logo KRITIKA-AI"
    >
      <rect width="200" height="200" rx="36" fill={`url(#${p0})`} />

      <g filter={`url(#${f0})`}>
        <path
          d="M108.16 40.4403L40 142.473V75.1115C40 67.1866 45.4394 61.4014 51.04 54.804C56.6406 48.2067 65.7232 41.4309 69.4216 40.4403C73.12 39.4497 108.16 40.4403 108.16 40.4403Z"
          fill={`url(#${p1})`}
        />
      </g>

      <g filter={`url(#${f1})`}>
        <path
          d="M121.704 112.708H70.72L156.841 40.7407C158.09 39.6976 160 40.5761 160 42.1933V82.8726C160 83.7119 159.626 84.5086 158.979 85.0503L129.14 110.014C127.061 111.754 124.426 112.708 121.704 112.708Z"
          fill={`url(#${p2})`}
        />
      </g>

      <g filter={`url(#${f2})`}>
        <path
          d="M104.957 113.175C92.0544 110.78 74.0799 111.758 70.7199 112.708L63.9242 119.436C63.1718 120.181 63.1748 121.389 63.9308 122.131L95.5142 153.095C100.026 157.519 106.1 159.985 112.419 159.958L157.499 159.765C159.201 159.757 160.06 157.749 158.848 156.565C148.427 146.391 115.745 115.178 104.957 113.175Z"
          fill={`url(#${p3})`}
        />
      </g>

      <defs>
        <filter
          id={f0}
          x="40"
          y="40"
          width="68.16"
          height="104.47"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
        </filter>

        <filter
          id={f1}
          x="66.72"
          y="38.29"
          width="97.28"
          height="80.42"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>

        <filter
          id={f2}
          x="63.36"
          y="111.68"
          width="96.05"
          height="52.28"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
        </filter>

        <linearGradient
          id={p0}
          x1="100"
          y1="0"
          x2="100"
          y2="200"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1A2E4E" />
          <stop offset="1" stopColor="#0D1527" />
        </linearGradient>

        <linearGradient
          id={p1}
          x1="74.08"
          y1="40"
          x2="38.06"
          y2="136.8"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#7C869A" />
        </linearGradient>

        <linearGradient
          id={p2}
          x1="160"
          y1="38.1"
          x2="71.47"
          y2="114.06"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#7C869A" />
        </linearGradient>

        <linearGradient
          id={p3}
          x1="40"
          y1="82"
          x2="159.33"
          y2="160.76"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#7C869A" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function KritikaLogo({
  size = 28,
  withText = false,
  textClassName,
  className,
  ...props
}: KritikaLogoProps) {
  return (
    <div className={cn("inline-flex items-center gap-2.5", className)} {...props}>
      <KritikaLogoIcon size={size} />
      {withText && (
        <span
          className={cn(
            "font-semibold tracking-[-0.03em] text-[#0B1B36]",
            textClassName || "text-[15px]"
          )}
        >
          KRITIKA AI
        </span>
      )}
    </div>
  );
}
