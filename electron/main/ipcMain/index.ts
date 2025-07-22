import { ipcMain, dialog } from "electron";
import fs from "fs-extra";
import path from "node:path";

/**
 * 判断是一个存在的目录
 * @param dirPath
 */
function isExistDirectory(dirPath: string): boolean {
  return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
}

/**
 * 选择单个文件目录位置
 */
ipcMain.handle("select-directory-path", async (_, params) => {
  const { multiple } = params;
  return dialog.showOpenDialog({
    properties: ["openDirectory", multiple && "multiSelections"].filter(
      Boolean,
    ),
  });
});

/**
 * 选择单个文件位置
 */
ipcMain.handle("select-file-path", async () => {
  return await dialog.showOpenDialog({
    properties: ["openFile"],
  });
});

/**
 * 复制文件夹下的内容到另一个文件夹
 */
function getNotExistDirPath(dirPath: string): string {
  return fs.existsSync(dirPath)
    ? getNotExistDirPath(`${dirPath}_副本`)
    : dirPath;
}

ipcMain.handle("copy-directory-content-to-directory", async (_, params) => {
  const {
    source,
    target,
    copyWhileExist, // 是否不覆盖（true则创建副本）
  } = params;
  if (!source || !target) {
    return Promise.reject("directory cannot be empty");
  }
  try {
    await fs.copy(
      source,
      copyWhileExist ? getNotExistDirPath(target) : target,
      {
        overwrite: true,
        recursive: true,
      },
    );
    return {
      success: true,
    };
  } catch (error) {
    return Promise.reject(error);
  }
});

/**
 * 获取第一层目录列表
 */
ipcMain.handle("get-directory-list-at-first-level", async (_, params) => {
  const { dirPath } = params;
  if (!dirPath || !fs.statSync(dirPath).isDirectory()) {
    return [];
  }
  const dirNames: string[] = fs.readdirSync(dirPath);
  return dirNames.map((name) => {
    return {
      name,
      path: path.resolve(dirPath, name),
    };
  });
});

/**
 * 删除目录
 */
ipcMain.handle("delete-directory", async (_, params) => {
  const { dirPath } = params;
  if (!isExistDirectory(dirPath)) return;
  return fs.rmdirSync(dirPath, {
    recursive: true,
  });
});

/**
 * 清空目录
 */
ipcMain.handle("empty-directory", async (_, params) => {
  const { dirPath } = params;
  if (!isExistDirectory(dirPath)) return;
  return fs.emptyDirSync(dirPath);
});
