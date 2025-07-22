/**
 * 选择目录位置
 * @param multiple 是否可以多选
 */
export async function selectDirectoryPath(multiple?: boolean): Promise<{
  filePaths: string[];
}> {
  return window.ipcRenderer.invoke("select-directory-path", { multiple });
}

/**
 * 选择文件位置
 * @param multiple 是否可以多选
 */
export async function selectFilePath(multiple?: boolean): Promise<{
  filePaths: string[];
}> {
  return window.ipcRenderer.invoke("select-file-path", { multiple });
}

/**
 * 复制目录
 * @param source 源目录地址
 * @param target 目标目录地址
 * @param copyWhileExist 当目录存在时是否创建副本（默认false。true创建副本，false不创建副本直接覆盖）
 */
export async function copyDirectoryContentToDirectory(
  source: string,
  target: string,
  copyWhileExist?: boolean,
): Promise<{
  success: boolean;
}> {
  return window.ipcRenderer.invoke("copy-directory-content-to-directory", {
    source,
    target,
    copyWhileExist,
  });
}

/**
 * 获取指定目录下第一层目录列表
 * @param dirPath 目录绝对地址
 */
export async function getDirectoryListAtFirstLevel(dirPath: string): Promise<
  {
    name: string; // 文件夹名称
    path: string; // 文件夹绝对路径
  }[]
> {
  return window.ipcRenderer.invoke("get-directory-list-at-first-level", {
    dirPath,
  });
}

/**
 * 删除目录
 * @param dirPath 删除目标目录绝对地址
 */
export async function deleteDirectory(dirPath: string): Promise<void> {
  return window.ipcRenderer.invoke("delete-directory", {
    dirPath,
  });
}

/**
 * 清空目录
 * @param dirPath 清空目标目录绝对地址
 */
export async function emptyDirectory(dirPath: string): Promise<void> {
  return window.ipcRenderer.invoke("empty-directory", {
    dirPath,
  });
}
