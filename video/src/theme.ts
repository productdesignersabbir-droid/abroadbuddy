import { continueRender, delayRender, staticFile } from "remotion";

export const C = {
  ink: "#0b1220",
  blue: "#1e4fff",
  blueDeep: "#0b2fe8",
  red: "#ff3b47",
  green: "#2f9e6b",
  amber: "#d99a2b",
  paper: "#faf7f3",
  soft: "#f3efe9",
  softer: "#ebe6de",
  line: "#e6e0d6",
  sub: "#64676d",
  white: "#ffffff",
  // Logo colours
  logoBlue: "#1F4FD8",
  logoNavy: "#1B2559",
};

export const F = {
  display: "'Libre Caslon Condensed', Georgia, serif",
  body: "'Stack Sans Headline', system-ui, sans-serif",
  logo: "'Poppins', system-ui, sans-serif",
};

const FONTS: [string, string, FontFaceDescriptors][] = [
  ["Libre Caslon Condensed", "fonts/LibreCaslonCondensed-500-normal.woff2", { weight: "500", style: "normal" }],
  ["Libre Caslon Condensed", "fonts/LibreCaslonCondensed-500-italic.woff2", { weight: "500", style: "italic" }],
  ["Stack Sans Headline", "fonts/StackSansHeadline-latin.woff2", { weight: "200 700" }],
  ["Poppins", "fonts/Poppins-500-latin.woff2", { weight: "500" }],
];

let loaded = false;

/** Load the site fonts before the first frame renders. */
export function loadFonts() {
  if (loaded || typeof document === "undefined") return;
  loaded = true;
  const handle = delayRender("Loading fonts");
  Promise.all(
    FONTS.map(async ([family, file, desc]) => {
      const face = new FontFace(family, `url(${staticFile(file)}) format("woff2")`, desc);
      await face.load();
      (document.fonts as unknown as Set<FontFace>).add(face);
    })
  )
    .then(() => continueRender(handle))
    .catch((err) => {
      console.error(err);
      continueRender(handle);
    });
}
