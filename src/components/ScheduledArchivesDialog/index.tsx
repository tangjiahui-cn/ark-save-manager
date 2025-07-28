/**
 * 定时备份（弹窗）
 */
import { antdModal, createBindModalHook } from "@/hooks/useBindModal";
import { Form, Modal, Select, Switch } from "antd";
import React from "react";
import { useUpdate } from "@/hooks/useUpdate";

export const useScheduledArchives = createBindModalHook((props) => {
  const [form] = Form.useForm();
  const update = useUpdate();

  function handleOk() {
    // ...
  }

  return (
    <Modal
      {...antdModal(props)}
      title={"定时备份"}
      bodyStyle={{ paddingTop: 12 }}
      okText={"确定"}
      cancelText={"取消"}
      onOk={handleOk}
    >
      <Form form={form}>
        <Form.Item label={"是否开启"} name={"enable"}>
          <Switch onChange={() => update()} />
        </Form.Item>
        {form.getFieldValue("enable") && (
          <Form.Item label={"间隔时间"} name={"delay"}>
            <Select
              placeholder={"请选择"}
              style={{ width: "100%" }}
              options={[
                { label: "5分钟", value: "5" },
                { label: "10分钟", value: "10" },
                { label: "15分钟", value: "15" },
                { label: "30分钟", value: "30" },
                { label: "60分钟", value: "60" },
              ]}
            />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
});
