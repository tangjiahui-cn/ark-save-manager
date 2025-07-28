import { Button, Tooltip } from "antd";
import React from "react";
import styles from "./index.module.less";
import { useLoadingText } from "@/hooks/useLoadingText";
import { LoadingOutlined } from "@ant-design/icons";

interface ChooseDirectoryLineProps {
  // 选择文本
  buttonText?: string;
  // 是否启用全局搜索
  enableAutoSearch?: boolean;
}

export default function ChooseDirectoryLine(props: ChooseDirectoryLineProps) {
  const { buttonText = "选择目录", enableAutoSearch } = props;
  const { loadingText, setLoading } = useLoadingText();

  // 选择目录
  function handleOpenDirectory() {
    // ...
    const input = document.createElement("input");
    input.type = "file";
    input.click();
  }

  // 自动搜索目录
  function handleAutoSearch() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }

  return (
    <div className={styles.chooseDirectoryLine}>
      <Tooltip title={`选择${buttonText}`} placement={"right"}>
        <Button style={{ borderRadius: 0 }} onClick={handleOpenDirectory}>
          {buttonText}
        </Button>
      </Tooltip>
      <div className={styles.chooseDirectoryLine_text}>{loadingText}</div>

      {/* 自动搜索目录 */}
      {enableAutoSearch && (
        <Tooltip title={`自动搜索目录`} placement={"left"}>
          <Button
            style={{ borderRadius: 0, marginLeft: -1, width: 36 }}
            onClick={handleAutoSearch}
          >
            {loadingText ? <LoadingOutlined /> : "A"}
          </Button>
        </Tooltip>
      )}
    </div>
  );
}
