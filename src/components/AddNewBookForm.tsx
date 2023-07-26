import React, {useRef} from 'react';
import {Button, Col, Form, Input, Modal, Row} from "antd";
import GeneralModal, {GeneralModalRef} from "../modals/general";
import BookServices from "../services/bookServices";

type FormProps = {
    visible: boolean;
    onClose: () => void;
};

const AddNewBookForm = ({visible, onClose}: FormProps) => {
    const generalModalRef = useRef<GeneralModalRef>(null);

    const handleOk = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const result = await BookServices.create({});
            if(result.status === 201){
                if(generalModalRef.current){
                    generalModalRef.current.openModal('Book created Successfully', 'add', 'red')
                }
                clearFormData();
            }

        } catch (error) {
            if(generalModalRef.current){
                generalModalRef.current.openModal('An error occurred! Please try again later.', 'error', 'red')
            }
        }
    };

    const clearFormData = () =>{

    }

    const handleCancel = async (event: React.FormEvent) => {
        onClose();
    };

    return (
        <Modal
            title={<h2 className="customTitle">Add new Book</h2>}
            open={visible}
            onCancel={handleCancel}
            onOk={handleOk}
            centered
            footer={[
                <Button key={'cancel-button'} onClick={handleCancel}>Cancel </Button>,

                <Button key={'create-button'} onClick={handleOk} >Save</Button>
            ]}
            width={1000}
            className={'customModal'}
        >
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Form.Item label="Title" name="title">
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Form.Item label="Author Name" name="authorName">
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} >
                    <Form.Item label="First Publish Year" name="firstPublishYear" >
                        <Input type="number"/>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Form.Item label="Number of Pages" name="numberOfPages">
                        <Input  type="number"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Form.Item label="Small Cover" name="small_cover">
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Form.Item label="Medium Cover" name="Medium_cover">
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Form.Item label="Large Cover" name="large_cover">
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <GeneralModal ref={generalModalRef}/>
        </Modal>
    );
};

export default AddNewBookForm;
