import { ImageResponse } from "next/og";
import { PLANE_PATH } from "@/components/Logo";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Same mark as app/icon.svg, drawn as a PNG for iOS home screens.
const MARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect x="15" y="27" width="7" height="24" rx="1.5" fill="#fff"/>
  <path d="M15 29 Q 31 21 45 18 L45.5 21 Q 32 25 22 31.5 Z" fill="#fff"/>
  <path d="${PLANE_PATH}" transform="translate(51 17) rotate(-14) scale(0.72)" fill="#fff"/>
</svg>`;

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#1F4FD8" }}>
        <img src={`data:image/svg+xml;utf8,${encodeURIComponent(MARK)}`} width={180} height={180} alt="" />
      </div>
    ),
    size
  );
}
