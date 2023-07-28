import api from "../utils/baseUrl";
import {BookDataType} from "../utils/dataTypes";

/**
 * BookService class to interact with the backend API for book-related operations.
 */
class BookService {
    /**
     * Method to create a book
     * @param book The book object to be created
     */
    async create(book: BookDataType) {
        return await api.post(`/books`, book);
    }

    /**
     * Method to get all books, with pagination and filter
     * @param pageNo Page number to be retrieve
     * @param pageSize Number of books fetched for page
     * @param searchQuery Search query for filtering books
     */
    async getAll(pageNo: number, pageSize: number, searchQuery: any) {
        return await api.get(`/books?pageNo=${pageNo}&pageSize=${pageSize}&filterValue=${searchQuery}`);
    }

    /**
     * Method to get single book by ID
     * @param id Unique ID of the book to be retrieved
     */
    async getById(id: number) {
        return await api.get(`/books/${id}`);
    }

    /**
     * Method to update an existing book
     * @param id Unique ID of the book
     * @param user Updated book object
     */
    async update(id: number, user: BookDataType) {
        return await api.put(`/books/${id}`, user);
    }

    /**
     * Method to delete a book
     * @param id Unique ID of the book to delete
     */
    async delete(id: number) {
        return await api.delete(`/books/${id}`);
    }
}

export default new BookService();
