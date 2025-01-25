import { Project } from "./project.tsx";

export class Projects {

    items: Map<string, Project>;

    constructor() {
        this.items = new Map<string, Project>();
    }

    public add(project: Project): void {
        this.items.set(project.id, project);
    }

    public filterIsNotDeleted(): Project[] {
        return Array.from(this.items.values()).filter(e => !e.isDeleted());
    }

    public toString(): string {
        return JSON.stringify(Array.from(this.items.values()));
    }
}