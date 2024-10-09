import {Former} from "@/types/Former.ts";

export type Form = {
    id: string,
    title: string,
    description: string,
    isTemplate: boolean,
    content: string,
    former: Former,
    createdAd: number,
    updatedAd: number,
}