import {Config} from '@remotion/cli/config';

// Teks tajam: frame di-render sebagai JPEG kualitas tinggi, video H.264.
Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(95);
Config.setCodec('h264');
Config.setCrf(16);
Config.setOverwriteOutput(true);
