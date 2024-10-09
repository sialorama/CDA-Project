import Api from "@/api.ts";

class FormerService {
    getAll() {
        return Api.get("/users/formers");
    }
    delete(id: string) {
        return Api.delete(`/users/${id}`)
    }
}

export default new FormerService();