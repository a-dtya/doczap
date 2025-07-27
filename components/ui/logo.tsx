// components/logo.tsx

import { SVGProps } from "react"

export default function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 150 60"
      xmlns="http://www.w3.org/2000/svg"
      {...props} // allows passing className, etc.
    >
      <g transform="translate(10, 12)">
        <rect x="-2" y="2" width="32" height="32" rx="4" fill="none" stroke="#000000" strokeWidth="1.5" />
        <rect x="2" y="8" width="8" height="16" rx="1.5" fill="#000000" />
        <rect x="8" y="6" width="8" height="16" rx="1.5" fill="#000000" />
        <rect x="14" y="10" width="8" height="16" rx="1.5" fill="#000000" />

        <rect x="3.5" y="11" width="5" height="1" rx="0.5" fill="#ffffff" />
        <rect x="3.5" y="13.5" width="4" height="1" rx="0.5" fill="#ffffff" opacity="0.8" />
        <rect x="3.5" y="16" width="5" height="1" rx="0.5" fill="#ffffff" opacity="0.6" />

        <rect x="9.5" y="9" width="5" height="1" rx="0.5" fill="#ffffff" />
        <rect x="9.5" y="11.5" width="4" height="1" rx="0.5" fill="#ffffff" opacity="0.8" />
        <rect x="9.5" y="14" width="5" height="1" rx="0.5" fill="#ffffff" opacity="0.6" />

        <rect x="15.5" y="13" width="5" height="1" rx="0.5" fill="#ffffff" />
        <rect x="15.5" y="15.5" width="4" height="1" rx="0.5" fill="#ffffff" opacity="0.8" />
        <rect x="15.5" y="18" width="5" height="1" rx="0.5" fill="#ffffff" opacity="0.6" />
      </g>

      <g transform="translate(45, 18)">
        <text
          x="0"
          y="24"
          fontFamily="'SF Pro Display', Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
          fontSize="28"
          fontWeight="600"
          fill="#000000"
          letterSpacing="-0.8px"
        >
          DocZap
        </text>
      </g>
    </svg>
  )
}
