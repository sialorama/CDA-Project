import {Path} from "@/types/Path.ts";
import {Assessment} from "@/types/Assessment.ts";


export type Former = {
    id: string
    firstname: string
    lastname: string
    email: string
    phone_number?: string
    paths?: Path[]
    assessments?: Assessment[]
}