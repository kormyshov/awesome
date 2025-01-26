import { v4 } from "uuid";
import { TaskStatus } from "./task_status.tsx";

export class Task {
    
    id: string;
    name: string;
    description: string;
    isChecked: boolean;
    status: TaskStatus;
    projectId: string;
    waitingContactId: string;

    constructor(name: string, description: string);
    constructor(name: string, description: string, isChecked: boolean, status: TaskStatus, projectId: string, waitingContactId: string);
    constructor(id: string, name: string, description: string, isChecked: boolean, status: TaskStatus, projectId: string, waitingContactId: string);
    constructor(...args: any[]) {
        if (args.length === 7) {
            this.id = args[0];
            this.name = args[1];
            this.description = args[2];
            this.isChecked = args[3];
            this.status = args[4];
            this.projectId = args[5];
            this.waitingContactId = args[6];
        } else if (args.length === 6) {
            this.id = v4();
            this.name = args[0];
            this.description = args[1];
            this.isChecked = args[2];
            this.status = args[3];
            this.projectId = args[4];
            this.waitingContactId = args[5];
        } else if (args.length === 2) {
            this.id = v4();
            this.name = args[0];
            this.description = args[1];
            this.isChecked = false;
            this.status = TaskStatus.INBOX;
            this.projectId = "";
            this.waitingContactId = "";
        }
    }

    public statusIs(status: TaskStatus): boolean {
        return this.status.toLowerCase() === status.toLowerCase();
    }

    public hasntProject(): boolean {
        return this.projectId === "" || this.projectId === undefined || this.projectId === null;
    }

    public isProject(projectId: string): boolean {
        return this.projectId === projectId;
    }

    public setDeleted(): void {
        this.status = TaskStatus.DELETED;
    }

    public toInbox(): void {
        this.status = TaskStatus.INBOX;
    }
}
