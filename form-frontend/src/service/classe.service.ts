import Api from "@/api.ts";
import {CreatePath} from "@/dto/CreatePath.ts";


class ClasseService {
    create(data: CreatePath) {
        return Api.post("/classes", data);
    }
    
    getAll() {
        return Api.get("/classes")
    }

    delete(id: string) {
        return Api.delete(`/classes/${id}`)
    }
}

export default new ClasseService();