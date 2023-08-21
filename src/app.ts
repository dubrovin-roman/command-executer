import { FFmpegExecutor } from "./commands/ffmpeg/ffmpeg.executor";
import { ConsoleLogger } from "./out/console-logger/console-logger";

export class App {
  async run() {
    const ffmpegExecuter = new FFmpegExecutor(ConsoleLogger.getInstance());
    ffmpegExecuter.execute();
  }
}

const app = new App();
app.run();
