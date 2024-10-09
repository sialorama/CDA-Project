import {Path} from "@/types/Path.ts";

export type Center = {
    id: string,
    name: string,
    address: string,
    phone_number: string,
    path?: Path[]
}