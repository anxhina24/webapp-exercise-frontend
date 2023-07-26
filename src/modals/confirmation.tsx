import React, { useImperativeHandle, useState } from 'react';
import {Button, Modal, Row} from 'antd';

export type ConfirmationModalProps ={
    confirmOperation: (value: number) => void;
}
export interface ConfirmationModalRef{
    openModal: (message:string, title:string, id: number) => void
}
const ConfirmationModal = React.forwardRef<ConfirmationModalRef, ConfirmationModalProps>((props, ref) => {
    const [visible, setVisible] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [dialogTitle, setDialogTitle] = useState('');
    const [itemId, setItemId] = useState(1);

    const handleCancel = async () => {
        setVisible(false)
        return Promise.resolve(); // Resolve a promise to fulfill the type requirements
    };

    const handleConfirm = async () => {
        await props.confirmOperation(itemId); // Await the confirmOperation function to return a promise
        setVisible(false);
    };

    useImperativeHandle(ref, () => ({
        openModal (title: string, message: string, itemId: number) {
            setDialogMessage(message);
            setDialogTitle(title);
            setVisible(true);
            setItemId(itemId)
        }
    }))

    return (
        <div>
            <Modal
                title={<h1 style={{ color: '#C8A2C8' }}>{dialogTitle}</h1>}
                open={visible}
                onCancel={handleCancel}
                centered
                footer={[
                    <Button
                        key="close-button"
                        onClick={handleCancel}
                        className="cancel"
                    >Cancel</Button>,
                    <Button
                        key="confirm-button"
                        onClick={handleConfirm}
                        className=""
                    >Confirm</Button>
                ]}
                style={{ textAlign: 'center' }}
            >

                <Row justify="center">
                    <p style={{ fontSize: '22px' }}>{dialogMessage}</p>
                </Row>
            </Modal>
        </div>
    );
});

export default ConfirmationModal;
