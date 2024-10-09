import {Path} from "@/types/Path.ts";

export type Candidate = {
    id: string
    firstname: string
    lastname: string
    email: string
    phone_number?: string
    path?: Path
}
