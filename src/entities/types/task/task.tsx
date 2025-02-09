import { v4 } from "uuid";
import { TaskStatus } from "./task_status.tsx";

export class Task {
    
    id: string;
    name: string;
    description: string;
    isChecked: boolean;
    checkedDate: string;
    status: TaskStatus;
    deletedDate: string;
    projectId: string;
    waitingContactId: string;
    scheduledDate: string;

    constructor(name: string, description: string);
    // constructor(name: string, description: string, isChecked: boolean, status: TaskStatus, projectId: string, waitingContactId: string);
    constructor(
        id: string, 
        name: string, 
        description: string, 
        isChecked: boolean, 
        checkedDate: string,
        status: TaskStatus, 
        deletedDate: string,
        projectId: string, 
        waitingContactId: string,
        scheduledDate: string
    );
    constructor(...args: any[]) {
        if (args.length === 10) {
            this.id = args[0];
            this.name = args[1];
            this.description = args[2];
            this.isChecked = args[3];
            this.checkedDate = args[4];
            this.status = args[5];
            this.deletedDate = args[6];
            this.projectId = args[7];
            this.waitingContactId = args[8];
            this.scheduledDate = args[9];

            if (this.scheduledDate !== "" && this.scheduledDate <= (new Date().toISOString())) {
                this.scheduledDate = "";
                this.status = TaskStatus.NEXT;
            }
            if (this.checkedDate !== "" && this.checkedDate < (new Date().toISOString())) {
                this.status = TaskStatus.ARCHIVED;
            }
        } else if (args.length === 2) {
            this.id = v4();
            this.name = args[0];
            this.description = args[1];
            this.isChecked = false;
            this.checkedDate = "";
            this.status = TaskStatus.INBOX;
            this.deletedDate = "";
            this.projectId = "";
            this.waitingContactId = "";
            this.scheduledDate = "";
        }
    }

    public isStatus(status: TaskStatus): boolean {
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
        this.deletedDate = new Date().toISOString();
    }

    public toInbox(): void {
        this.status = TaskStatus.INBOX;
    }

    public setIsChecked(isChecked: boolean): void {
        this.isChecked = isChecked;
        if (isChecked) {
            this.checkedDate = new Date().toISOString();
        } else {
            this.checkedDate = "";
        }
    }
}
