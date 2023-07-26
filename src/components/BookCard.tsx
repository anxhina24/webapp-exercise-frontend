import React from "react";
import {Card, Typography, Button} from "antd";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {BookDataType} from "../utils/dataTypes";

const { Title } = Typography;

interface BookCardProps {
    book: BookDataType;
    handleDelete: (bookId: number) => void;
    handleUpdate: (book: BookDataType) => void;
}
const BookCard: React.FC<BookCardProps> =({book, handleDelete, handleUpdate}) =>{
    return (
        <Card
            key={book.id}
            hoverable
            cover={<img height={300} width={200} alt={book.title} src={book.large_cover} />}
            style={{ maxHeight: '300px', maxWidth: '200px' }}
        >
            <Title level={5}>{book.title}</Title>({book.author_name})
            {/*<div style={{ marginTop: '6' }}>*/}
            {/*    <Text type="secondary">First publish year {book.first_publish_year}</Text>*/}
            {/*</div>*/}
            {/*<div style={{ marginTop: '6' }}>*/}
            {/*    <Text type="secondary">Number of pages {book.number_of_pages_median}</Text>*/}
            {/*</div>*/}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(book.id)}>Delete</Button>
                <Button type="link" icon={<EditOutlined />} onClick={() => handleUpdate(book)}>Update</Button>
            </div>
        </Card>
    )
}

export default BookCard
