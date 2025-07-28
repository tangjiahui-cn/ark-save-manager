/**
 * 创建新存档（弹窗）
 */
import React from "react";
import { Form, Input, message, Modal } from "antd";
import { antdModal, createBindModalHook } from "@/hooks/useBindModal";
import dayjs from "dayjs";

export const useCreateArchivesDialog = createBindModalHook((props) => {
  const [form] = Form.useForm();

  function handleOk() {
    message.success("创建成功");
    props?.onOk?.();
  }

  React.useEffect(() => {
    if (props?.visible) {
      form.setFieldsValue({
        gmtCreate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      });
    }
  }, [props?.visible]);

  return (
    <Modal
      {...antdModal(props)}
      title={"创建新存档"}
      bodyStyle={{ paddingTop: 12 }}
      okText={"确定"}
      cancelText={"取消"}
      onOk={handleOk}
    >
      <Form form={form}>
        <Form.Item name={"description"}>
          <Input.TextArea
            placeholder={"请输入描述（最多250个）"}
            maxLength={250}
            allowClear
            autoSize={{
              minRows: 4,
              maxRows: 4,
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
});
