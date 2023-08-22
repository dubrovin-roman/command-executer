import { ICommand } from "../../core/executor/command.types";

export interface IFFmpegInput {
    inputPath: string;
    widthResolution: number;
    heightResolution: number;
    nameFile: string;
}

export interface ICommandWithOutputPath extends ICommand {
    outputPath: string;
}