import { v4 } from "uuid";
import { Task  } from "./task.ts";
import { TaskStatus } from "./task_status.ts";
import { RepeatedRule } from "./repeated_rule.ts";


export class TaskBuilder {

    private id: string;
    private name: string;
    private description: string;
    private isChecked: boolean;
    private checkedDate: string;
    private status: TaskStatus;
    private deletedDate: string;
    private projectId: string;
    private waitingContactId: string;
    private scheduledDate: string;

    private repeatedRule: RepeatedRule | undefined;

    constructor(name: string, description: string) {
        this.id = v4();
        this.name = name;
        this.description = description;
        this.isChecked = false;
        this.checkedDate = "";
        this.status = TaskStatus.INBOX;
        this.deletedDate = "";
        this.projectId = "";
        this.waitingContactId = "";
        this.scheduledDate = "";

        this.repeatedRule = undefined;
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

    public getIsChecked(): boolean {
        return this.isChecked;
    }

    public getCheckedDate(): string {
        return this.checkedDate;
    }

    public getStatus(): TaskStatus {
        return this.status;
    }

    public getDeletedDate(): string {
        return this.deletedDate;
    }

    public getProjectId(): string {
        return this.projectId;
    }

    public getWaitingContactId(): string {
        return this.waitingContactId;
    }

    public getScheduledDate(): string {
        return this.scheduledDate;
    }

    public getRepeatedRule(): RepeatedRule | undefined {
        return this.repeatedRule;
    }

    public setId(id: string): TaskBuilder {
        this.id = id;
        return this;
    }

    public setName(name: string): TaskBuilder {
        this.name = name;
        return this;
    }

    public setDescription(description: string): TaskBuilder {
        this.description = description;
        return this;
    }

    public setIsChecked(isChecked: boolean): TaskBuilder {
        this.isChecked = isChecked;
        if (isChecked) {
            this.checkedDate = new Date().toISOString();
        } else {
            this.checkedDate = "";
        }
        return this;
    }

    public setCheckedDate(checkedDate: string): TaskBuilder {
        this.checkedDate = checkedDate;
        return this;
    }

    public setStatus(status: TaskStatus): TaskBuilder {
        this.status = status;
        if (status === TaskStatus.DELETED) {
            this.deletedDate = new Date().toISOString();
        }
        return this;
    }

    public setDeletedDate(deletedDate: string): TaskBuilder {
        this.deletedDate = deletedDate;
        return this;
    }

    public setProjectId(projectId: string): TaskBuilder {
        this.projectId = projectId;
        return this;
    }

    public setWaitingContactId(waitingContactId: string): TaskBuilder {
        this.waitingContactId = waitingContactId;
        return this;
    }

    public setScheduledDate(scheduledDate: string): TaskBuilder {
        this.scheduledDate = scheduledDate;
        return this;
    }

    public setRepeatedRule(repeatedRule: RepeatedRule | undefined): TaskBuilder {
        this.repeatedRule = repeatedRule;
        return this;
    }

    public build(): Task {
        return new Task(this);
    }
}