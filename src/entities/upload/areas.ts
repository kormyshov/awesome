import { Areas } from "../types/area/areas.ts";
import { getCommand, getRequestOptions } from "./common.ts";


export const uploadAreas = (state: Areas = new Areas()) => {
    fetch(getCommand("set_areas"), getRequestOptions(state));
}
