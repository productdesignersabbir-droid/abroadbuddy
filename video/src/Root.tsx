import { Composition } from "remotion";
import { LaunchVideo } from "./LaunchVideo";
import { loadFonts } from "./theme";
import { FPS, TOTAL_FRAMES } from "./timeline";

loadFonts();

export function Root() {
  return <Composition id="LaunchVideo" component={LaunchVideo} fps={FPS} width={1920} height={1080} durationInFrames={TOTAL_FRAMES} />;
}
