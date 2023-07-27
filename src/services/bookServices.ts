import api from "../utils/baseUrl";
import {BookDataType} from "../utils/dataTypes";

class BookService {
    async create(book: BookDataType) {
        return await api.post(`/books`, book);
    }
    async getAll(pageNo: number, pageSize: number, searchQuery: any) {
        return await api.get(`/books?pageNo=${pageNo}&pageSize=${pageSize}&filterValue=${searchQuery}`);
    }

    async getById(id: number) {
        return await api.get(`/books/${id}`);
    }

    async update(id: number, user: BookDataType) {
        return await api.put(`/books/${id}`, user);
    }

    async delete(id: number) {
        return await api.delete(`/books/${id}`);
    }
}

export default new BookService();
