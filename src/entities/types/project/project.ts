import { v4 } from "uuid";
import { ProjectStatus } from "./project_status.ts";

export class Project {
    
    id: string;
    name: string;
    description: string;
    status: ProjectStatus;

    constructor(name: string, description: string, status: ProjectStatus);
    constructor(id: string, name: string, description: string, status: ProjectStatus);
    constructor(...args: any[]) {
        if (args.length === 4) {
            this.id = args[0];
            this.name = args[1];
            this.description = args[2];
            this.status = args[3];
        } else {
            this.id = v4();
            this.name = args[0];
            this.description = args[1];
            this.status = args[2];
        }
    }

    public isDeleted(): boolean {
        return this.status === ProjectStatus.DELETED;
    }

    public setDeleted(): void {
        this.status = ProjectStatus.DELETED;
    }

    public isActive(): boolean {
        return this.status === ProjectStatus.ACTIVE;
    }
}
