import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
// H.264 in an MP4 is what Instagram and TikTok both accept without re-encoding surprises.
Config.setCodec("h264");
Config.overrideWebpackConfig((config) => config);
