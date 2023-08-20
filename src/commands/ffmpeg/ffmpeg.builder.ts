import { ICommand } from "../../core/executor/command.types";

export class FFmpegBuilder {
  private inputPath: string;
  private outputPath: string = "c:\\defoltName.mp4";
  private options: Map<string, string> = new Map();

  constructor() {
    this.options.set("-c:v", "libx264");
  }

  public addInputPath(inputPath: string) {
    this.inputPath = inputPath;
    return this;
  }

  public addResolution(width: number, height: number) {
    this.options.set("-s", `${width}x${height}`);
    return this;
  }

  public addOutputPathWithNameFile(outputPath: string) {
    this.outputPath = outputPath;
    return this;
  }

  public build(): ICommand {
    if (!this.inputPath) throw new Error("Вы не указали путь к файлу.");
    const resultOptions: string[] = ["-i", this.inputPath];
    this.options.forEach((value, key) => {
      resultOptions.push(key);
      resultOptions.push(value);
    });
    resultOptions.push(this.outputPath);
    return { command: "ffmpeg", args: resultOptions };
  }
}
