import React from "react";
import styles from "./index.module.less";
import {
  Button,
  Input,
  message,
  Modal,
  Select,
  Space,
  Table,
  Tooltip,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ChooseDirectoryLine from "@/components/ChooseDirectoryLine";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useCreateArchivesDialog } from "@/components/CreateArchivesDialog";
import { useScheduledArchives } from "@/components/ScheduledArchivesDialog";

export default () => {
  const columns: ColumnsType<any> = [
    {
      title: "序号",
      width: 70,
      render(_, __, index) {
        return index + 1;
      },
    },
    {
      title: "创建时间",
      width: 170,
      render() {
        return (
          <Tooltip title={"打开备份目录"} placement={"right"}>
            <div
              style={{
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              {dayjs().format("YYYY-MM-DD HH:mm:ss")}
            </div>
          </Tooltip>
        );
      },
    },
    {
      title: "描述",
      render() {
        return <div>一个存档</div>;
      },
    },
    {
      title: "操作",
      width: 250,
      render() {
        return (
          <Space>
            <Button size={"small"}>应用</Button>
            <Button size={"small"}>编辑</Button>
            <Button size={"small"}>复制</Button>
            <Button size={"small"} danger>
              删除
            </Button>
          </Space>
        );
      },
    },
  ];

  // 创建新存档
  const createArchivesDialog = useCreateArchivesDialog({
    onOk() {
      // ...
    },
  });

  // 定时备份设置
  const scheduledArchives = useScheduledArchives({
    onOk() {
      // ...
    },
  });

  function handleClearAll() {
    Modal.confirm({
      title: "提醒",
      centered: true,
      maskClosable: true,
      content: "确定删除全部备份存档?",
      onOk() {
        message.success("清空成功");
        return;
      },
    });
  }

  React.useEffect(() => {
    // scheduledArchives.open();
  }, []);

  return (
    <Space direction={"vertical"} className={styles.arkBoard} size={12}>
      <Space direction={"vertical"} className={styles.arkBoard_block}>
        <ChooseDirectoryLine buttonText={"存档目录"} enableAutoSearch />
        <ChooseDirectoryLine buttonText={"备份目录"} enableAutoSearch />
      </Space>

      <div className={styles.flex_line}>
        <b>备份列表：</b>
        <Space>
          <Button
            type={"primary"}
            icon={<PlusOutlined />}
            onClick={() => createArchivesDialog.open()}
          >
            创建新存档
          </Button>
          <Button onClick={handleClearAll}>清空备份</Button>
          <Button onClick={() => scheduledArchives.open()}>定时备份</Button>
        </Space>
      </div>

      <Table
        size={"small"}
        dataSource={Array(3).fill({})}
        columns={columns}
        pagination={false}
      />

      {createArchivesDialog.children}
      {scheduledArchives.children}
    </Space>
  );
};
