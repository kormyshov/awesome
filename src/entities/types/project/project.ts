import { v4 } from "uuid";
import { ProjectStatus } from "./project_status.ts";

export class Project {
    
    private id: string;
    private name: string;
    private description: string;
    private areaId: string;
    private status: ProjectStatus;

    constructor(name: string);
    constructor(name: string, description: string, areaId: string, status: ProjectStatus);
    constructor(id: string, name: string, description: string, areaId: string, status: ProjectStatus);
    constructor(...args: any[]) {
        if (args.length === 5) {
            this.id = args[0];
            this.name = args[1];
            this.description = args[2];
            this.areaId = args[3];
            this.status = args[4];
        } else if (args.length === 4) {
            this.id = v4();
            this.name = args[0];
            this.description = args[1];
            this.areaId = args[2];
            this.status = args[3];
        } else {
            this.id = v4();
            this.name = args[0];
            this.description = "";
            this.areaId = "";
            this.status = ProjectStatus.ACTIVE;
        }
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }

    public getAreaId(): string {
        return this.areaId;
    }

    public getStatus(): ProjectStatus {
        return this.status;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public setAreaId(areaId: string): void {
        this.areaId = areaId;
    }

    public setStatus(status: ProjectStatus): void {
        this.status = status;
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

    public areaIdEqual(areaId: string | undefined): boolean {
        if (areaId === undefined) {
            return false;
        }
        if (areaId === "") {
            return true;
        }
        return this.areaId === areaId;
    }

    public clearArea(): void {
        this.areaId = "";
    }
}
