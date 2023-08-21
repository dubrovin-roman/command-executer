import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { CommandExecutor } from "../../core/executor/command.executor";
import { ICommand } from "../../core/executor/command.types";
import { IStreamLogger } from "../../core/handlers/stream-logger.interface";
import { PromptService } from "../../core/prompt/prompt.service";
import { FFmpegBuilder } from "./ffmpeg.builder";
import { FileService } from "../../core/files/file.service";
import { StreamHandler } from "../../core/handlers/stream.handler";

export class FFmpegExecutor extends CommandExecutor<string[]> {
  private promptService: PromptService = new PromptService();
  private fileService: FileService = new FileService();

  constructor(logger: IStreamLogger) {
    super(logger);
  }

  protected async prompt(): Promise<string[]> {
    const inputFile = await this.promptService.input<string>(
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
    const outputPath = await this.promptService.input<string>(
      "Введите путь до дериктории куда будет положен результат конвертации",
      "input"
    );
    const nameFile = await this.promptService.input<string>(
      "Введите имя файла",
      "input"
    );
    const ext = await this.promptService.input<string>(
      "Введите расширение файла",
      "input"
    );
    const outputPathWithName = this.fileService.getFilePath(
      outputPath,
      nameFile,
      ext
    );
    const inputData = new FFmpegBuilder()
      .addInputPath(inputFile)
      .addResolution(widthResolution, heightResolution)
      .addOutputPathWithNameFile(outputPathWithName)
      .build();
    return inputData;
  }
  protected bildCommand(input: string[]): ICommand {
    return { command: "ffmpeg", args: input };
  }
  protected spawn(command: ICommand): ChildProcessWithoutNullStreams {
    this.fileService.deleteFileIfExist(command.args[command.args.length - 1]);
    return spawn(command.command, command.args);
  }
  protected processStream(
    stream: ChildProcessWithoutNullStreams,
    logger: IStreamLogger
  ): void {
    const streamHandler = new StreamHandler(logger);
    streamHandler.processOutput(stream);
  }
}
