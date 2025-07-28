/**
 * ARK 存档管理器
 *
 * @description
 * 功能描述：
 * 1、手动创建存档
 * 2、定时备份存档
 * 3、备份存档支持操作（切换、删除、重命名、复制）
 */
import React from "react";
import styles from "./index.module.less";
import ARKBoard from "./components/ARKBoard";
import { ConfigProvider, Menu } from "antd";
import zh_CN from "antd/locale/zh_CN";

const menuList = [
  { label: "ARK1", key: "ase" },
  { label: "ARK2", key: "asa" },
  { label: "设置", key: "settings" },
];

export default function App() {
  const [currentMenu, setCurrentMenu] = React.useState("ase");
  return (
    <ConfigProvider locale={zh_CN}>
      <div className={styles.mainWindow}>
        <div className={styles.mainWindow_menu}>
          <Menu
            selectedKeys={[currentMenu]}
            onSelect={({ selectedKeys }) => {
              if (selectedKeys.length) {
                setCurrentMenu(selectedKeys[0]);
              }
            }}
            style={{ userSelect: "none", borderRightColor: "transparent" }}
            items={menuList}
          />
        </div>
        <div className={styles.mainWindow_body}>
          <ARKBoard />
        </div>
      </div>
    </ConfigProvider>
  );
}
