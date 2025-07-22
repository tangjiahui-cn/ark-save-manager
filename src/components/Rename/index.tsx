import React from "react";
import { Input, Popconfirm } from "antd";

interface RenameProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Rename(props: RenameProps) {
  const [keyword, setKeyword] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  return (
    <Popconfirm
      icon={null}
      open={visible}
      title={
        <Input
          style={{ width: 250 }}
          allowClear
          placeholder={"请输入"}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      }
      okText="确定"
      cancelText="取消"
      onCancel={() => setVisible(false)}
      onConfirm={async () => {
        if (!props?.onChange) {
          return;
        }
        const success = await new Promise((resolve, reject) => {
          try {
            resolve(props?.onChange?.(keyword));
          } catch (e) {
            reject(e);
          }
        });
        if (success) {
          setVisible(false);
        }
      }}
    >
      <a
        onClick={() => {
          setKeyword(props?.value);
          setVisible(true);
        }}
      >
        重命名
      </a>
    </Popconfirm>
  );
}
