/**
 * ARK 存档管理器
 *
 * @description
 * 功能描述：
 * 1、备份存档
 * 2、使用、部分使用、删除、重命名、复制
 */
import React from "react";
import styles from "./index.module.less";
import ARKBoard from "./components/ARKBoard";
import { ConfigProvider, Menu } from "antd";
import zh_CN from "antd/locale/zh_CN";
import { SettingOutlined } from "@ant-design/icons";

const menuList = [
  { label: "方舟进化", key: "ase", icon: <SettingOutlined /> },
  { label: "方舟飞升", key: "asa", icon: <SettingOutlined /> },
  { label: "设置", key: "settings", icon: <SettingOutlined /> },
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
