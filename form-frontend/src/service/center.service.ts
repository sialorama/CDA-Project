import Api from "@/api.ts";
import {CreateCenterDto} from "@/dto/CreateCenter.ts";

class CenterService {
    getAll(){
        return Api.get("/centers");
    }
    create(data: CreateCenterDto){
        return Api.post("/centers", data);
    }

    delete(id: string) {
        return Api.delete(`/centers/${id}`);
    }
    getOne(id: string) {
        return Api.get(`/centers/details/${id}`);
    }
}

export default new CenterService();