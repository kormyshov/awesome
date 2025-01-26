import { Task } from "./task.tsx";
import { TaskStatus } from "./task_status.tsx";

export class Tasks {

    items: Map<string, Task>;

    constructor() {
        this.items = new Map<string, Task>();
    }

    public add(task: Task): void {
        this.items.set(task.id, task);
    }

    public toString(): string {
        return JSON.stringify(Array.from(this.items.values()));
    }

    public filterByStatus(status: TaskStatus): Task[] {
        return Array.from(this.items.values()).filter(task => task.statusIs(status));
    }

    public filterByWaitingContactId(contactId: string): Task[] {
        return Array.from(this.items.values()).filter(task => task.waitingContactId === contactId);
    }

    public toList(): Task[] {
        return Array.from(this.items.values());
    }
}