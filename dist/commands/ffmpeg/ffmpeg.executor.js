"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FFmpegExecutor = void 0;
const child_process_1 = require("child_process");
const command_executor_1 = require("../../core/executor/command.executor");
const prompt_service_1 = require("../../core/prompt/prompt.service");
const ffmpeg_builder_1 = require("./ffmpeg.builder");
const file_service_1 = require("../../core/files/file.service");
const stream_handler_1 = require("../../core/handlers/stream.handler");
class FFmpegExecutor extends command_executor_1.CommandExecutor {
    constructor(logger) {
        super(logger);
        this.promptService = new prompt_service_1.PromptService();
        this.fileService = new file_service_1.FileService();
    }
    prompt() {
        return __awaiter(this, void 0, void 0, function* () {
            const inputPath = yield this.promptService.input("Введите путь до файла", "input");
            const widthResolution = yield this.promptService.input("Введите ширину картинки", "number");
            const heightResolution = yield this.promptService.input("Введите высоту картинки", "number");
            const nameFile = yield this.promptService.input("Введите имя файла", "input");
            return { inputPath, widthResolution, heightResolution, nameFile };
        });
    }
    bildCommand({ inputPath, widthResolution, heightResolution, nameFile, }) {
        const outputPath = this.fileService.getFilePath(inputPath, nameFile, "mp4");
        const args = new ffmpeg_builder_1.FFmpegBuilder()
            .addInputPath(inputPath)
            .addResolution(widthResolution, heightResolution)
            .addOutputPathWithNameFile(outputPath)
            .build();
        return { command: "ffmpeg", args, outputPath };
    }
    spawn({ command, args, outputPath }) {
        this.fileService.deleteFileIfExist(outputPath);
        return (0, child_process_1.spawn)(command, args);
    }
    processStream(stream, logger) {
        const streamHandler = new stream_handler_1.StreamHandler(logger);
        streamHandler.processOutput(stream);
    }
}
exports.FFmpegExecutor = FFmpegExecutor;
