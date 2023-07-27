import React, {useImperativeHandle, useState} from 'react';
import {Button, Modal, Row} from 'antd';
import '../style/style.css';

type GeneralModalProps = {
  onClose?: () => void;
};
export interface GeneralModalRef {
  openModal: (message: string) => void;
}
const GeneralModal = React.forwardRef<GeneralModalRef, GeneralModalProps>((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const handleCancel = async () => {
    setVisible(false);
    return Promise.resolve(); // Resolve a promise to fulfill the type requirements
  };
  useImperativeHandle(ref, () => ({
    openModal(message: string) {
      setDialogMessage(message);
      setVisible(true);
    },
  }));
  return (
    <Modal
      open={visible}
      onCancel={handleCancel}
      centered
      footer={[
        <Button key='close-button' onClick={handleCancel}>
          Close
        </Button>,
      ]}
      className='generalModal' // Add the 'generalModal' class name to apply custom styles
    >
      <Row justify='center'>
        <p style={{fontSize: '18px', marginBottom: '20px'}}>{dialogMessage}</p>
      </Row>
    </Modal>
  );
});

export default GeneralModal;
