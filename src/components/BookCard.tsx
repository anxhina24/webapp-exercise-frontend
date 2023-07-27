import React from 'react';
import {Card, Typography, Button} from 'antd';
import {BookDataType} from '../utils/dataTypes';

const {Title, Text} = Typography;

interface BookCardProps {
  book: BookDataType;
  handleDelete: (bookId: number) => void;
  handleUpdate: (book: BookDataType) => void;
}
const BookCard: React.FC<BookCardProps> = ({book, handleDelete, handleUpdate}) => {
  return (
    <Card
      key={book.id}
      hoverable
      cover={<img height={300} width={200} alt={book.title} src={book.large_cover} />}
      style={{maxWidth: 300, marginBottom: 20, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}
    >
      <div style={{height: 100}}>
        <Title level={5} style={{marginBottom: 0, lineHeight: 1.2}}>
          {book.title}
        </Title>
        <Text type='secondary'>{book.author_name}</Text>
      </div>
      <div style={{marginTop: 12}}>
        <Text style={{fontSize: 14, fontWeight: 'bold'}}>First Publish Year</Text>
        <Text style={{marginLeft: 8}}>{book.first_publish_year}</Text>
      </div>
      <div style={{marginTop: 6}}>
        <Text style={{fontSize: 14, fontWeight: 'bold'}}>Number of Pages</Text>
        <Text type='secondary' style={{marginLeft: 8}}>
          {book.number_of_pages_median}
        </Text>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 12}}>
        <Button type='primary' danger onClick={() => handleDelete(book.id)}>
          Delete
        </Button>
        <Button
          style={{backgroundColor: '#b0c6b1', color: 'white'}}
          onClick={() => handleUpdate(book)}
        >
          Update
        </Button>
      </div>
    </Card>
  );
};

export default BookCard;
