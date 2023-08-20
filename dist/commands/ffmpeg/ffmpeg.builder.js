"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FFmpegBuilder = void 0;
class FFmpegBuilder {
    constructor() {
        this.outputPath = "c:\\defoltName.mp4";
        this.options = new Map();
        this.options.set("-c:v", "libx264");
    }
    addInputPath(inputPath) {
        this.inputPath = inputPath;
        return this;
    }
    addResolution(width, height) {
        this.options.set("-s", `${width}x${height}`);
        return this;
    }
    addOutputPathWithNameFile(outputPath) {
        this.outputPath = outputPath;
        return this;
    }
    build() {
        if (!this.inputPath)
            throw new Error("Вы не указали путь к файлу.");
        const resultOptions = ["-i", this.inputPath];
        this.options.forEach((value, key) => {
            resultOptions.push(key);
            resultOptions.push(value);
        });
        resultOptions.push(this.outputPath);
        return { command: "ffmpeg", args: resultOptions };
    }
}
exports.FFmpegBuilder = FFmpegBuilder;
