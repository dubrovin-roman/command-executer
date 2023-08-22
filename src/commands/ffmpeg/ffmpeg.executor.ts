import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { CommandExecutor } from "../../core/executor/command.executor";
import { ICommand } from "../../core/executor/command.types";
import { IStreamLogger } from "../../core/handlers/stream-logger.interface";
import { PromptService } from "../../core/prompt/prompt.service";
import { FFmpegBuilder } from "./ffmpeg.builder";
import { FileService } from "../../core/files/file.service";
import { StreamHandler } from "../../core/handlers/stream.handler";
import { ICommandWithOutputPath, IFFmpegInput } from "./ffmpeg.types";

export class FFmpegExecutor extends CommandExecutor<IFFmpegInput> {
  private promptService: PromptService = new PromptService();
  private fileService: FileService = new FileService();

  constructor(logger: IStreamLogger) {
    super(logger);
  }

  protected async prompt(): Promise<IFFmpegInput> {
    const inputPath = await this.promptService.input<string>(
      "Введите путь до файла",
      "input"
    );
    const widthResolution = await this.promptService.input<number>(
      "Введите ширину картинки",
      "number"
    );
    const heightResolution = await this.promptService.input<number>(
      "Введите высоту картинки",
      "number"
    );
    const nameFile = await this.promptService.input<string>(
      "Введите имя файла",
      "input"
    );
    return { inputPath, widthResolution, heightResolution, nameFile };
  }
  protected bildCommand({
    inputPath,
    widthResolution,
    heightResolution,
    nameFile,
  }: IFFmpegInput): ICommandWithOutputPath {
    const outputPath = this.fileService.getFilePath(inputPath, nameFile, "mp4");
    const args = new FFmpegBuilder()
      .addInputPath(inputPath)
      .addResolution(widthResolution, heightResolution)
      .addOutputPathWithNameFile(outputPath)
      .build();

    return { command: "ffmpeg", args, outputPath };
  }
  protected spawn(
    {command, args, outputPath}: ICommandWithOutputPath
  ): ChildProcessWithoutNullStreams {
    this.fileService.deleteFileIfExist(outputPath);
    return spawn(command, args);
  }
  protected processStream(
    stream: ChildProcessWithoutNullStreams,
    logger: IStreamLogger
  ): void {
    const streamHandler = new StreamHandler(logger);
    streamHandler.processOutput(stream);
  }
}
