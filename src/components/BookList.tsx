import React, {useEffect, useRef, useState} from 'react';
import BookServices from "../services/bookServices";
import { BookDataType } from "../utils/dataTypes";
import BookCard from "./BookCard";
import {Col, Row, Pagination, Input, Button} from "antd";
import ConfirmationModal, {ConfirmationModalRef} from "../modals/confirmation";
import GeneralModal, {GeneralModalRef} from "../modals/general";
import AddNewBookForm from "./AddNewBookForm";


const BookList: React.FC = () => {
    const itemsPerPage = 6; // Set the number of books to show per page
    const [books, setBooks] = useState<BookDataType[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const confirmationModalRef = useRef<ConfirmationModalRef>(null);
    const generalModalRef = useRef<GeneralModalRef>(null);
    const [showAddNewDialog, setShowNewBookDialog] = useState(false);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await BookServices.getAll(currentPage, itemsPerPage, searchQuery);
                setBooks(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.log("Error fetching books:", error);
            }
        };
        fetchBooks();
    }, [currentPage, searchQuery]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handelNewBook = async () => {
        setShowNewBookDialog(true)
    };
    const handleDelete = (id : number) =>{
        if(confirmationModalRef.current){
            confirmationModalRef.current.openModal( 'Book Deletion', 'Are you sure you want to delete this book? ', id )
        }
    }

    const confirmOperation=(id:number)=>{
        BookServices.delete(id).then(res => {
            if(res.status === 200){
                BookServices.getAll(currentPage, itemsPerPage, searchQuery).then(res=>{
                    if(generalModalRef.current){
                        generalModalRef.current.openModal("Book deleted successfully", 'delete', 'red')
                        setBooks(res.data.content)
                    }
                })
            }
        }).catch((error)=>{
            if(generalModalRef.current){
                generalModalRef.current.openModal('An error occurred. Please try again later', 'error', 'red')
            }
        })
    }
    const handleUpdate = (book : BookDataType) =>{
        console.log(book)
    }

    return (
        <div style={{ padding: '16px', border: '1px solid #ccc', marginBottom: '16px' }}>
            <Row>
                <Col span={20}>
                    <Input.Search
                        placeholder="Search by title or by author"
                        onChange={handleSearch}
                        style={{fontSize: '16px', marginBottom: '40px' }} // Customize width and font size
                    />
                </Col>
                <Col span={4}>
                    <Button onClick={handelNewBook} >Add New Book</Button>
                </Col>
            </Row>
            <Row gutter={[16, 16]} > {/* Set the gutter attribute to add space between columns */}
                {books.map((book) => (
                    <Col key={book.id} xs={24} sm={12} md={8} lg={6} xl={4}>
                        {/* The xs, sm, md, lg, and xl props are used to control the column width based on screen size */}
                        <BookCard
                            book={book}
                            handleDelete={handleDelete}
                            handleUpdate={handleUpdate}/>
                    </Col>
                ))}
            </Row>
            <Pagination
                current={currentPage}
                onChange={handlePageChange}
                total={totalPages * itemsPerPage} // Set the total number of items, not pages
                pageSize={itemsPerPage}
                showSizeChanger={false}
                style={{ marginTop: '300px', textAlign: 'center' }}
            />
            {showAddNewDialog && <AddNewBookForm visible={showAddNewDialog} onClose={() => setShowNewBookDialog(false)}/>
            }
            <ConfirmationModal ref={confirmationModalRef} confirmOperation={confirmOperation}/>
            <GeneralModal ref={generalModalRef} />
        </div>
    );
};

export default BookList;
