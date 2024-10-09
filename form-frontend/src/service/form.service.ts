import Api from "@/api.ts";
import {Form} from "@/types/Form.ts";

class FormService {
    getAll() {
        return Api.get("/forms")
    }

    create(form: Form) {
        return Api.post("/forms", form)
    }

    delete(id: string) {
        return Api.delete(`/forms/${id}`);
    }

}

export default new FormService();