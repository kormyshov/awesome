import { RRule } from "rrule";

import { Project } from "../project/project.ts";
import { TaskBuilder } from "./task_builder.ts";
import { TaskStatus } from "./task_status.ts";


export class Task {
    
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

    private parentTaskId: string;
    private countOfChildren: number;
    private repeatRule: RRule;

    constructor(builder: TaskBuilder) {
        this.id = builder.getId();
        this.name = builder.getName();
        this.description = builder.getDescription();
        this.isChecked = builder.getIsChecked();
        this.checkedDate = builder.getCheckedDate();
        this.status = builder.getStatus();
        this.deletedDate = builder.getDeletedDate();
        this.projectId = builder.getProjectId();
        this.waitingContactId = builder.getWaitingContactId();
        this.scheduledDate = builder.getScheduledDate();
        this.parentTaskId = builder.getParentTaskId();
        this.countOfChildren = builder.getCountOfChildren();
        this.repeatRule = builder.getRepeatRule();
    }

    public statusEqual(status: TaskStatus): boolean {
        return this.status.toLowerCase() === status.toLowerCase();
    }

    public waitingContactIdEqual(contactId: string | undefined): boolean {
        if (contactId === undefined) {
            return false;
        }
        return this.waitingContactId === contactId;
    }

    public isProjectEmpty(notDeletedProjects: Project[]): boolean {
        return this.projectId === "" || this.projectId === undefined || this.projectId === null || 
               !(notDeletedProjects.map(p => p.getId()).includes(this.projectId));
    }

    public projectIdEqual(projectId: string | undefined): boolean {
        if (projectId === undefined) {
            return false;
        }
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

    public getParentTaskId(): string {
        return this.parentTaskId;
    }

    public getCountOfChildren(): number {
        return this.countOfChildren;
    }

    public getRepeatRule(): RRule {
        return this.repeatRule;
    }

    public getRRuleDtStart(): Date {
        return this.repeatRule.options.dtstart;
    }
}
