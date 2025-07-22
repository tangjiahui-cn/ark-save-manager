import { Button, Empty, message, Popconfirm, Space, Switch } from "antd";
import React from "react";
import * as invoke from "@/ipcRenderer/invoke";
import dayjs from "dayjs";
import path from "path-browserify";
import { useRequest } from "ahooks";

interface ArchivesData {
  key: string; // 唯一key
  dirname: string; // 目录名称
  dirPath: string; // 目录地址
}

function App() {
  // 配置信息
  const [config, setConfig] = React.useState({
    sourceDir: "",
    saveDir: "",
    deleteConfirm: false,
  });

  // 存档列表
  const [archivesList, setArchivesList] = React.useState<ArchivesData[]>([]);

  // 保存存档
  const { refresh: handleSave, loading: saveLoading } = useRequest(
    async () => {
      await checkDir();
      // 创建备份存档存储目录
      const dirname = `${dayjs().format("YYYYMMDD_HHmmss")}_ARK`;
      const saveDirPath = path.resolve(config.saveDir, dirname);
      await invoke.copyDirectoryContentToDirectory(
        config.sourceDir,
        saveDirPath,
        true,
      );
      await refreshArchivesList();
      message.success("保存成功");
    },
    {
      manual: true,
    },
  );

  function handleChangeConfig(value: Partial<typeof config>) {
    const updateConfig = {
      ...config,
      ...value,
    };
    setConfig(updateConfig);
    window.localStorage.setItem("config", JSON.stringify(updateConfig));
  }

  async function handleSelectSourceDir() {
    const { filePaths } = await invoke.selectDirectoryPath();
    const dirPath = filePaths[0];
    if (!dirPath) return;
    handleChangeConfig({
      sourceDir: dirPath,
    });
  }

  async function handleSelectSaveDir() {
    const { filePaths } = await invoke.selectDirectoryPath(true);
    const dirPath = filePaths[0];
    if (!dirPath) return;
    handleChangeConfig({
      saveDir: dirPath,
    });
    refreshArchivesList(dirPath);
  }

  // 刷新存档列表
  async function refreshArchivesList(dirPath: string = config.saveDir) {
    if (!dirPath) return;
    const dirList = await invoke.getDirectoryListAtFirstLevel(dirPath);
    setArchivesList(
      dirList.map((dir) => {
        return {
          key: dir.name,
          dirname: dir.name,
          dirPath: dir.path,
        };
      }),
    );
  }

  // 检查目录
  async function checkDir() {
    if (!config.sourceDir) {
      message.warn("请选择存档目录");
      return Promise.reject();
    }
    if (!config.saveDir) {
      message.warn("请选择保存目录");
      return Promise.reject();
    }
    return;
  }

  async function handleUse(archives: ArchivesData) {
    await checkDir();
    const { dirPath } = archives;
    // 创建备份存档存储目录
    await invoke.copyDirectoryContentToDirectory(dirPath, config.sourceDir);
    await refreshArchivesList();
    message.success("使用成功");
  }

  async function handleDelete(archives: ArchivesData) {
    await invoke.deleteDirectory(archives.dirPath);
    refreshArchivesList();
  }

  async function handleRefresh() {
    await checkDir();
    await refreshArchivesList();
    message.success("刷新成功");
  }

  async function handleDeleteAll() {
    await checkDir();
    await invoke.emptyDirectory(config.saveDir);
    await refreshArchivesList();
    message.success("删除成功");
  }

  // 读取配置
  React.useEffect(() => {
    try {
      if (localStorage.getItem("config")) {
        const config = JSON.parse(localStorage.getItem("config") || "");
        setConfig(config);

        // 刷新我的存档列表
        if (config.saveDir) {
          refreshArchivesList(config.saveDir);
        }
      }
    } catch (e) {}
  }, []);

  return (
    <div>
      <Space style={{ padding: 12, width: "100%" }} direction={"vertical"}>
        {/* 操作按钮组 */}
        <Space direction={"vertical"} style={{ width: "100%" }}>
          <div style={{ display: "flex", gap: 12 }}>
            <Button type={"primary"} onClick={handleSelectSourceDir}>
              选择存档目录
            </Button>
            <div style={{ lineHeight: "32px" }}>{config.sourceDir || "-"}</div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <Button type={"primary"} onClick={handleSelectSaveDir}>
              选择保存目录
            </Button>
            <div style={{ lineHeight: "32px" }}>{config.saveDir || "-"}</div>
          </div>
        </Space>
        {/* 展示我的存档列表 */}
        <Space style={{ width: "100%" }} direction={"vertical"}>
          <Space>
            <Button
              onClick={handleSave}
              type={"primary"}
              style={{ width: 120 }}
              disabled={saveLoading}
            >
              保存
            </Button>
            <Button onClick={handleRefresh}>刷新</Button>
            <Popconfirm
              title={"确定删除全部存档？"}
              onConfirm={() => handleDeleteAll()}
              okText="删除"
              okType={"danger"}
              cancelText="取消"
            >
              <Button>全部删除</Button>
            </Popconfirm>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "6px 12px",
                border: "1px solid #e8e8e8",
              }}
            >
              <span style={{ marginRight: 8 }}>删除二次提醒</span>
              <Switch
                checked={config.deleteConfirm}
                onClick={(deleteConfirm) =>
                  handleChangeConfig({ deleteConfirm })
                }
              />
            </div>
          </Space>
        </Space>
        <Space
          style={{ width: "100%", border: "1px solid #e8e8e8", padding: 12 }}
          direction={"vertical"}
        >
          <b>我的存档</b>
          {!archivesList.length && (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={"暂无数据"}
            />
          )}
          {archivesList.map((archives) => {
            return (
              <Space key={archives.key} size={12}>
                <span>{archives.dirname}</span>
                <a onClick={() => handleUse(archives)}>使用</a>
                {config.deleteConfirm ? (
                  <Popconfirm
                    title="是否删除这个存档"
                    onConfirm={() => handleDelete(archives)}
                    okText="删除"
                    okType={"danger"}
                    cancelText="取消"
                  >
                    <a>删除</a>
                  </Popconfirm>
                ) : (
                  <a onClick={() => handleDelete(archives)}>删除</a>
                )}
              </Space>
            );
          })}
        </Space>
      </Space>
    </div>
  );
}

export default App;
