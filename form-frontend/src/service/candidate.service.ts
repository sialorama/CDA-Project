import Api from "@/api.ts";

class CandidateService {
    getAll() {
        return Api.get("/users/candidates")
    }
    delete(id: string) {
        return Api.delete(`/users/${id}`)
    }
}
export default new CandidateService();