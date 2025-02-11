import { Projects } from "../types/project/projects.tsx";
import { getCommand, getRequestOptions } from "./common.ts";


export const uploadProjects = (state: Projects = new Projects()) => {
    fetch(getCommand("set_projects"), getRequestOptions(state));
}
