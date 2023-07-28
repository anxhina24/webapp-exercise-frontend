import React, {ChangeEventHandler, useRef, useState} from 'react';
import {Button, Col, Form, Input, Modal, Row} from 'antd';
import GeneralModal, {GeneralModalRef} from '../modals/general';
import BookServices from '../services/bookServices';
import {BookDataType} from '../utils/dataTypes';
import {convertKeysToSnakeCase} from '../utils/snakeCase';
import '../style/style.css';

type FormProps = {
  /**
   * boolean value indicating if the modal is hide or visible
   * Function to close dialog and to handle onClose event
   * Function to handle the action when a new book is added or updated
   * Object for the book to be updated. It is null when a new book is added, and it has BookDataType type when a existing book is updated.
   */
  visible: boolean;
  onClose: () => void;
  onBookAdded: () => void;
  bookObjectToBeUpdated: BookDataType | null;
};

//Form for adding or updating a book.
const AddNewBookForm = ({visible, onClose, onBookAdded, bookObjectToBeUpdated}: FormProps) => {
  //Local state to manage form fields and errors.
  const currentYear = new Date().getFullYear();
  const generalModalRef = useRef<GeneralModalRef>(null);
  const [titleRequired, setTitleRequired] = useState(false);
  const [title, setTitle] = useState(bookObjectToBeUpdated?.title || '');
  const [authorName, setAuthor] = useState(bookObjectToBeUpdated?.author_name || '');
  const [firstPublishYear, setFirstPublishYear] = useState(
    bookObjectToBeUpdated?.first_publish_year || 0,
  );
  const [numberOfPagesMedian, setNumberOfPages] = useState(
    bookObjectToBeUpdated?.number_of_pages_median || 0,
  );
  const [largeCover, setLargeCover] = useState(bookObjectToBeUpdated?.large_cover || '');
  const [mediumCover, setMediumCover] = useState(bookObjectToBeUpdated?.medium_cover || '');
  const [smallCover, setSmallCover] = useState(bookObjectToBeUpdated?.small_cover || '');
  const [authorRequired, setAuthorRequired] = useState(false);
  const [firstPublishYearRequired, setFirstPublishYearRequired] = useState(false);
  const [numberOfPagesRequired, setNumberOfPagesRequired] = useState(false);
  const [largeCoverRequired, setLargeCoverRequired] = useState(false);
  const [mediumCoverRequired, setMediumCoverRequired] = useState(false);
  const [smallCoverRequired, setSmallCoverRequired] = useState(false);

  //Function to handle Save button clink on add/update modal.
  const handleOk = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      //Validate form fields before submitting.
      if (formValidation()) {
        //Convert form data to snake_case and create book object
        const bookObject = convertKeysToSnakeCase({
          title,
          authorName,
          numberOfPagesMedian,
          firstPublishYear,
          covers: {
            largeCover,
            mediumCover,
            smallCover,
          },
        });
        //Call create or update service based on the bookObjectToBeUpdated value
        const result = bookObjectToBeUpdated
          ? await BookServices.update(bookObjectToBeUpdated.id, bookObject)
          : await BookServices.create(bookObject);
        //If is created returned status will be 201, if is updated it will be 200.
        if ([200, 201].includes(result.status)) {
          if (generalModalRef.current) {
            onBookAdded();
            //Dynamic message depending on operation(created or updated)
            generalModalRef.current.openModal(
              `Book ${bookObjectToBeUpdated ? 'updated' : 'created'} Successfully`,
            );
            clearFormData();
          }
        }
      }
    } catch (error) {
      //If an error happen during the API call, show an error message with the general dialog.
      if (generalModalRef.current) {
        generalModalRef.current.openModal('An error occurred! Please try again later.');
      }
    }
  };

  //Function for form field validation
  const formValidation = () => {
    //Check for empty required fields. If any of this required fields is missing, return false and set the state of them. Otherwise, return true.
    if (
      !title ||
      !authorName ||
      !firstPublishYear ||
      !numberOfPagesMedian ||
      !smallCover ||
      !mediumCover ||
      !largeCover
    ) {
      setTitleRequired(!title);
      setAuthorRequired(!authorName);
      setFirstPublishYearRequired(!firstPublishYear);
      setNumberOfPagesRequired(!numberOfPagesMedian);
      setLargeCoverRequired(!largeCover);
      setMediumCoverRequired(!mediumCover);
      setSmallCoverRequired(!smallCover);
      return false;
    }
    return true;
  };

  //Function to clear form data when the book is created.
  const clearFormData = () => {
    setTitle('');
    setAuthor('');
    setFirstPublishYear(0);
    setNumberOfPages(0);
    setLargeCover('');
    setMediumCover('');
    setSmallCover('');
  };
  const handleCancel = async () => {
    onClose();
  };
  const handleTitle: ChangeEventHandler<HTMLInputElement> = (event) => {
    setTitleRequired(false);
    setTitle(event.target.value);
  };
  const handleAuthor: ChangeEventHandler<HTMLInputElement> = (event) => {
    setAuthor(event.target.value);
    setAuthorRequired(false);
  };
  const handleFirstPublishYear: ChangeEventHandler<HTMLInputElement> = (event) => {
    const year = parseInt(event.target.value);
    if (year > currentYear) {
      setFirstPublishYear(currentYear);
    } else {
      setFirstPublishYear(year);
    }
    setFirstPublishYearRequired(false);
  };

  const handleNumberOfPages: ChangeEventHandler<HTMLInputElement> = (event) => {
    setNumberOfPages(parseInt(event.target.value));
    setNumberOfPagesRequired(false);
  };
  const handleLargeCover: ChangeEventHandler<HTMLInputElement> = (event) => {
    setLargeCover(event.target.value);
    setLargeCoverRequired(false);
  };
  const handleMediumCover: ChangeEventHandler<HTMLInputElement> = (event) => {
    setMediumCover(event.target.value);
    setMediumCoverRequired(false);
  };

  const handleSmallCover: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSmallCover(event.target.value);
    setSmallCoverRequired(false);
  };

  //Return JSX from AddNewBookForm component
  return (
    <Modal
      title={<h2 className='customTitle'>Add new Book</h2>}
      open={visible}
      onCancel={handleCancel}
      onOk={handleOk}
      centered
      footer={[
        <Button key={'cancel-button'} onClick={handleCancel}>
          Cancel{' '}
        </Button>,

        <Button key={'create-button'} onClick={handleOk}>
          Save
        </Button>,
      ]}
      width={1000}
      className={'addNewBookModal'}
    >
      <Form>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item
              label='Title'
              validateStatus={titleRequired && title === '' ? 'error' : undefined}
              help={titleRequired && title === '' ? 'This field is required' : undefined}
            >
              <Input required={titleRequired} onChange={handleTitle} value={title} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item
              label='Author Name'
              validateStatus={authorRequired && authorName === '' ? 'error' : undefined}
              help={authorRequired && authorName === '' ? 'This field is required' : undefined}
            >
              <Input required={authorRequired} onChange={handleAuthor} value={authorName} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item
              label='First Publish Year'
              validateStatus={firstPublishYearRequired && !firstPublishYear ? 'error' : undefined}
              help={
                !firstPublishYear && firstPublishYearRequired ? 'This field is required' : undefined
              }
            >
              <Input
                type='number'
                required={firstPublishYearRequired}
                onChange={handleFirstPublishYear}
                value={firstPublishYear}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item
              label='Number of Pages'
              validateStatus={numberOfPagesRequired && !numberOfPagesMedian ? 'error' : undefined}
              help={
                numberOfPagesRequired && !numberOfPagesMedian ? 'This field is required' : undefined
              }
            >
              <Input
                type='number'
                required={numberOfPagesRequired}
                onChange={handleNumberOfPages}
                value={numberOfPagesMedian}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={12}>
            <Form.Item
              label='Small Cover'
              validateStatus={largeCoverRequired && largeCover === '' ? 'error' : undefined}
              help={largeCoverRequired && largeCover === '' ? 'This field is required' : undefined}
            >
              <Input required={largeCoverRequired} onChange={handleLargeCover} value={largeCover} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={12}>
            <Form.Item
              label='Medium Cover'
              validateStatus={mediumCoverRequired && mediumCover === '' ? 'error' : undefined}
              help={
                mediumCoverRequired && mediumCover === '' ? 'This field is required' : undefined
              }
            >
              <Input
                required={mediumCoverRequired}
                onChange={handleMediumCover}
                value={mediumCover}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={12}>
            <Form.Item
              label='Large Cover'
              validateStatus={smallCoverRequired && smallCover === '' ? 'error' : undefined}
              help={smallCoverRequired && smallCover === '' ? 'This field is required' : undefined}
            >
              <Input required={smallCoverRequired} onChange={handleSmallCover} value={smallCover} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <GeneralModal ref={generalModalRef} />
    </Modal>
  );
};

export default AddNewBookForm;
