import {Path} from "@/types/Path.ts";

export type CreateCenterDto = {
    name: string,
    address: string,
    phone_number: string,
    path?: Path[]
}