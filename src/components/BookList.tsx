import React, {useCallback, useEffect, useRef, useState} from 'react';
import BookServices from '../services/bookServices';
import {BookDataType} from '../utils/dataTypes';
import BookCard from './BookCard';
import {Col, Row, Pagination, Input, Button} from 'antd';
import ConfirmationModal, {ConfirmationModalRef} from '../modals/confirmation';
import GeneralModal, {GeneralModalRef} from '../modals/general';
import AddNewBookForm from './AddNewBookForm';

const BookList: React.FC = () => {
  const itemsPerPage = 5; // Set the number of books to show per page
  const [books, setBooks] = useState<BookDataType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const confirmationModalRef = useRef<ConfirmationModalRef>(null);
  const generalModalRef = useRef<GeneralModalRef>(null);
  const [showAddNewDialog, setShowNewBookDialog] = useState(false);
  const [book, setBook] = useState<BookDataType | null>(null);
  const handleBooksList = useCallback(async () => {
    try {
      const response = await BookServices.getAll(currentPage, itemsPerPage, searchQuery);
      setBooks(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log('Error fetching books:', error);
    }
  }, [currentPage, itemsPerPage, searchQuery]);

  useEffect(() => {
    handleBooksList();
  }, [handleBooksList]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handelNewBook = async () => {
    setShowNewBookDialog(true);
  };
  const handleDelete = (id: number) => {
    if (confirmationModalRef.current) {
      confirmationModalRef.current.openModal(
        'Book Deletion',
        'Are you sure you want to delete this book? ',
        id,
      );
    }
  };

  const confirmOperation = (id: number) => {
    BookServices.delete(id)
      .then((res) => {
        if (res.status === 200) {
          BookServices.getAll(currentPage, itemsPerPage, searchQuery).then((res) => {
            if (generalModalRef.current) {
              generalModalRef.current.openModal('Book deleted successfully');
              setBooks(res.data.content);
            }
          });
        }
      })
      .catch(() => {
        if (generalModalRef.current) {
          generalModalRef.current.openModal('An error occurred. Please try again later');
        }
      });
  };
  const handleUpdate = (book: BookDataType | null) => {
    setShowNewBookDialog(true);
    setBook(book); // Update to 'book' or set to 'null'
  };
  const handleBookAdded = async () => {
    await handleBooksList();
  };

  return (
    <div style={{padding: '16px', border: '1px solid #ccc', marginBottom: '16px'}}>
      <Row gutter={[16, 16]} justify='space-between' align='middle' style={{marginBottom: 20}}>
        <Col xs={24} sm={24} md={18} lg={20} xl={20}>
          <Input.Search
            placeholder='Search by title or by author'
            onChange={handleSearch}
            style={{fontSize: '16px', width: '100%'}}
          />
        </Col>
        <Col xs={24} sm={24} md={6} lg={4} xl={4}>
          <Button
            style={{backgroundColor: '#b0c6b1', color: 'white', width: '100%'}}
            onClick={handelNewBook}
          >
            Add New Book
          </Button>
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify='space-between'>
        {' '}
        {/* Set the gutter attribute to add space between columns */}
        {books.map((book) => (
          <Col key={book.id} xs={24} sm={12} md={8} lg={6} xl={4}>
            {/* The xs, sm, md, lg, and xl props are used to control the column width based on screen size */}
            <BookCard book={book} handleDelete={handleDelete} handleUpdate={handleUpdate} />
          </Col>
        ))}
      </Row>
      <Pagination
        current={currentPage}
        onChange={handlePageChange}
        total={totalPages * itemsPerPage} // Set the total number of items, not pages
        pageSize={itemsPerPage}
        showSizeChanger={false}
        style={{textAlign: 'center'}}
      />
      {showAddNewDialog && (
        <AddNewBookForm
          visible={showAddNewDialog}
          onClose={() => {
            setShowNewBookDialog(false);
            setBook(null);
          }}
          onBookAdded={handleBookAdded}
          bookObjectToBeUpdated={book}
        />
      )}
      <ConfirmationModal ref={confirmationModalRef} confirmOperation={confirmOperation} />
      <GeneralModal ref={generalModalRef} />
    </div>
  );
};

export default BookList;
