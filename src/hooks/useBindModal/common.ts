import { BindModalProps } from './RenderModal';
import { ModalProps } from 'antd';

export const antdModal = (props: BindModalProps): ModalProps => {
  return {
    centered: true,
    open: props?.visible,
    onCancel: props?.onCancel,
    onOk: props?.onOk,
    afterClose: props?.afterClose,
  };
};
