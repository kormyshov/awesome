import { Project } from "./project.ts";

export class Projects {

    private items: Map<string, Project>;

    constructor() {
        this.items = new Map<string, Project>();
    }

    public get(id: string | undefined): Project {
        if (!id) {
            return new Project("Unknown project");
        }
        const project = this.items.get(id);
        if (project) {
            return project;
        } else {
            return new Project("Unknown contact");
        }
    }

    public add(project: Project): void {
        this.items.set(project.getId(), project);
    }

    public filterIsNotDeleted(): Project[] {
        return Array.from(this.items.values()).filter(e => !e.isDeleted());
    }

    public filterByAreaId(areaId: string | undefined): Project[] {
        return Array.from(this.items.values()).filter(project => project.areaIdEqual(areaId));
    }

    public toString(): string {
        return JSON.stringify(Array.from(this.items.values()));
    }
}