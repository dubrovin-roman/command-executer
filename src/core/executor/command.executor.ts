import { ChildProcessWithoutNullStreams } from "child_process";
import { IStreamLogger } from "../handlers/stream-logger.interface";
import { ICommand } from "./command.types";

export abstract class CommandExecutor<Input> {
  constructor(private logger: IStreamLogger) {}
  public async execute() {
    const inputData = await this.prompt();
    const command = this.bildCommand(inputData);
    const stream = this.spawn(command);
    this.processStream(stream, this.logger);
  }

  protected abstract prompt(): Promise<Input>;
  protected abstract bildCommand(input: Input): ICommand;
  protected abstract spawn(command: ICommand): ChildProcessWithoutNullStreams;
  protected abstract processStream(
    stream: ChildProcessWithoutNullStreams,
    logger: IStreamLogger
  ): void;
}
