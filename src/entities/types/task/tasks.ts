import { Task } from "./task.ts";
import { TaskBuilder } from "./task_builder.ts";
import { TaskStatus } from "./task_status.ts";
import { uploadTasks } from "../../upload/tasks.ts";

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

    private set(task: Task, needUpload: boolean = true): void {
        this.items.set(task.getId(), task);
        if (needUpload) {
            uploadTasks(this);
        }
    }

    public toString(): string {
        return JSON.stringify(Array.from(this.items.values()));
    }

    public filterByStatus(status: TaskStatus): Task[] {
        return Array.from(this.items.values()).filter(task => task.statusEqual(status));
    }

    public filterByWaitingContactId(contactId: string): Task[] {
        return Array.from(this.items.values()).filter(task => task.waitingContactIdEqual(contactId));
    }

    public toList(): Task[] {
        return Array.from(this.items.values());
    }

    public buildMinimalTask(name: string, description: string): void {
        const builder = new TaskBuilder(name, description);
        this.set(builder.build());
    }

    public buildCommonTask(
        id: string,
        name: string,
        description: string,
        isChecked: boolean,
        status: TaskStatus,
        projectId: string,
        waitingContactId: string,
        scheduledDate: string,
    ): void {
        const builder = new TaskBuilder(name, description);
        this.set(builder
            .setId(id)
            .setIsChecked(isChecked)
            .setStatus(status)
            .setProjectId(projectId)
            .setWaitingContactId(waitingContactId)
            .setScheduledDate(scheduledDate)
            .build()
        );
    }

    public buildFullTask(
        id: string,
        name: string,
        description: string,
        isChecked: boolean,
        checkedDate: string,
        status: TaskStatus,
        deletedDate: string,
        projectId: string,
        waitingContactId: string,
        scheduledDate: string,
    ): void {
        const builder = new TaskBuilder(name, description);
        this.set(builder
            .setId(id)
            .setIsChecked(isChecked)
            .setCheckedDate(checkedDate)
            .setStatus(status)
            .setDeletedDate(deletedDate)
            .setProjectId(projectId)
            .setWaitingContactId(waitingContactId)
            .setScheduledDate(scheduledDate)
            .build(),
            false
        );
    }

}