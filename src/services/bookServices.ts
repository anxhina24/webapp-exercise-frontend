import api from "../utils/baseUrl";

class BookService {
    async create(appointment: {}) {
        return await api.post(`/books`, appointment);
    }
    async getAll(pageNo: number, pageSize: number, searchQuery: any) {
        return await api.get(`/books?pageNo=${pageNo}&pageSize=${pageSize}&filterValue=${searchQuery}`);
    }

    async getById(id: number) {
        return await api.get(`/books/${id}`);
    }

    async update(id: number, user: {}) {
        return await api.patch(`/books/${id}`, user);
    }

    async delete(id: number) {
        return await api.delete(`/books/${id}`);
    }
}

export default new BookService();
