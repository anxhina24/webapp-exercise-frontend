import React, {useImperativeHandle, useState} from "react";
import {Button, Modal, Row} from "antd";
import {
    PlusCircleOutlined,
    CloseCircleOutlined,DeleteOutlined,
} from '@ant-design/icons';
type GeneralModalProps = {
    onClose?: () => void
}

type Icons = {
    [key: string]: React.ReactNode;
};

const icons: Icons = {
    add: <PlusCircleOutlined />,
    error: <CloseCircleOutlined />,
    delete:<DeleteOutlined/>,
    default: <PlusCircleOutlined />,
};

type IconsColor = {
    [key: string]: string;
};

const iconsColor: IconsColor = {
    add: "green",
    error: "red",
    default: "white",
};

export interface GeneralModalRef{
    openModal: (message:string, icon:string, color:string) => void
}
const GeneralModal = React.forwardRef<GeneralModalRef, GeneralModalProps>((props, ref) => {
    const [visible, setVisible] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [icon, setIcon] = useState('');
    const [color, setColor] = useState('');
    const handleCancel = async () => {
        setVisible(false)
        return Promise.resolve(); // Resolve a promise to fulfill the type requirements
    };
    useImperativeHandle(ref, () => ({
        openModal (message: string, icon: string, color:string) {
            setDialogMessage(message);
            setColor(color);
            setVisible(true);
            setIcon(icon);
        }
    }))
    return <Modal title={<h1 style={{color:'#C8A2C8'}}>{'Book Management Application'}</h1>} open={visible} onCancel={handleCancel}
                  centered footer={[ <Button onClick={handleCancel}>Close</Button>]}
                  style={{textAlign: 'center'}}>
        <Row  style={{marginBottom:'5px', fontSize:'35px', color:iconsColor[color || 'default']}} justify={"center"}>{icons[icon || 'default']}</Row>
        <Row justify={"center"} >
            <p style={{fontSize:'22px'}}>{dialogMessage}</p>
        </Row>


    </Modal>
})

export default GeneralModal
