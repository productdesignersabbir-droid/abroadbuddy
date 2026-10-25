import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Same mark as app/icon.svg, drawn as a PNG for iOS home screens and link previews.
const MARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <path d="M19.5 32H44.5A12.5 12.5 0 1 0 41.58 40.03" fill="none" stroke="#fff" stroke-width="7"/>
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
