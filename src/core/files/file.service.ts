import { promises } from "fs";
import { dirname, isAbsolute, join } from "path";

export class FileService {
  private async isFileExist(path: string) {
    try {
      await promises.stat(path);
      return true;
    } catch {
      return false;
    }
  }

  public getFilePath(path: string, name: string, ext: string): string {
    if (!isAbsolute(path)) {
      path = join(__dirname + "/" + path);
    }
    return join(dirname(path) + "/" + name + "." + ext);
  }

  public async deleteFileIfExist(path: string) {
    if (await this.isFileExist(path)) {
      promises.unlink(path);
    }
  }
}
