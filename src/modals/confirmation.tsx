import React, {useImperativeHandle, useState} from 'react';
import {Button, Modal, Row} from 'antd';
import '../style/style.css';

export type ConfirmationModalProps = {
    //Function that will be called when the user confirm the operation. Value is the ID of record
  confirmOperation: (value: number) => void;
};
export interface ConfirmationModalRef {
    //Function to open confirmation modal. This function has a message and ID of record
  openModal: (message: string, id: number) => void;
}
const ConfirmationModal = React.forwardRef<ConfirmationModalRef, ConfirmationModalProps>(
  (props, ref) => {

      //State variable to manage visibility of the modal and the message on it
    const [visible, setVisible] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [itemId, setItemId] = useState(1);

    const handleCancel = async () => {
      setVisible(false);
      return Promise.resolve(); // Resolve a promise to fulfill the type requirements
    };

    //This function is called when the user clicks confirm button on the modal.
      //After confirmation, visibilities will be set to false
    const handleConfirm = async () => {
      await props.confirmOperation(itemId);
      setVisible(false);
    };

    useImperativeHandle(ref, () => ({
        //Open the modal and update the content
      openModal(message: string, itemId: number) {
        setDialogMessage(message);
        setVisible(true);
        setItemId(itemId);
      },
    }));

    return (
      <Modal
        open={visible}
        onCancel={handleCancel}
        centered
        footer={[
          <Button key='close-button' onClick={handleCancel} className='cancel'>
            Cancel
          </Button>,
          <Button key='confirm-button' onClick={handleConfirm}>
            Confirm
          </Button>,
        ]}
        className='confirmationModal' // Add the 'customModal' class name to apply the shared styles
      >
        <Row justify='center'>
          <p style={{fontSize: '18px', marginBottom: '24px'}}>{dialogMessage}</p>
        </Row>
      </Modal>
    );
  },
);

export default ConfirmationModal;
