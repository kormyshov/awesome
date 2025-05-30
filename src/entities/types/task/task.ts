import { Project } from "../project/project.ts";
import { TaskBuilder } from "./task_builder.ts";
import { TaskStatus } from "./task_status.ts";
import { RepeatedRule } from "./repeated_rule.ts";


export class Task {
    
    private id: string;
    private name: string;
    private description: string;
    private isChecked: boolean;
    private checkedDate: string;
    private status: TaskStatus;
    private deletedDate: string;
    private isFocus: boolean;
    private areaId: string;
    private projectId: string;
    private contextIds: string[];
    private waitingContactId: string;
    private scheduledDate: string;

    private repeatedRule: RepeatedRule | undefined;

    constructor(builder: TaskBuilder) {
        this.id = builder.getId();
        this.name = builder.getName();
        this.description = builder.getDescription();
        this.isChecked = builder.getIsChecked();
        this.checkedDate = builder.getCheckedDate();
        this.status = builder.getStatus();
        this.deletedDate = builder.getDeletedDate();
        this.isFocus = builder.getIsFocus();
        this.areaId = builder.getAreaId();
        this.projectId = builder.getProjectId();
        this.contextIds = builder.getContextIds();
        this.waitingContactId = builder.getWaitingContactId();
        this.scheduledDate = builder.getScheduledDate();
        this.repeatedRule = builder.getRepeatedRule();
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

    public areaIdEqual(areaId: string | undefined): boolean {
        if (areaId === undefined) {
            return false;
        }
        if (areaId === "" || areaId === "all_areas") {
            return true;
        }
        return this.areaId === areaId;
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

    public clearArea(): void {
        this.areaId = "";
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

    public getStatus(ignoreRepeated: boolean = true): TaskStatus {
        if (!ignoreRepeated && this.repeatedRule !== undefined) {
            return TaskStatus.REPEATED;
        }
        return this.status;
    }

    public getDeletedDate(): string {
        return this.deletedDate;
    }

    public getIsFocus(): boolean {
        return this.isFocus;
    }

    public getAreaId(): string {
        return this.areaId;
    }

    public setAreaId(areaId: string): void {
        this.areaId = areaId;
    }

    public getProjectId(): string {
        return this.projectId;
    }

    public getContextIds(): string[] {
        return this.contextIds;
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

    public getRepeatedRuleFreq(): number | undefined {
        if (this.repeatedRule === undefined) {
            return undefined;
        }
        return this.repeatedRule.getFreq();
    }
}
