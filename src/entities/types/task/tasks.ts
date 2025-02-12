import { Task } from "./task.ts";
import { TaskStatus } from "./task_status.ts";

export class Tasks {

    items: Map<string, Task>;

    constructor();
    constructor(items: Map<string, Task>);
    constructor(...args: any[]) {
        if (args.length === 1) {
            this.items = args[0];
        } else {
            this.items = new Map<string, Task>();
        }
    }

    public add(task: Task): void {
        this.items.set(task.id, task);
    }

    public toString(): string {
        return JSON.stringify(Array.from(this.items.values()));
    }

    public filterByStatus(status: TaskStatus): Task[] {
        return Array.from(this.items.values()).filter(task => task.isStatus(status));
    }

    public filterByWaitingContactId(contactId: string): Task[] {
        return Array.from(this.items.values()).filter(task => task.waitingContactId === contactId);
    }

    public toList(): Task[] {
        return Array.from(this.items.values());
    }
}