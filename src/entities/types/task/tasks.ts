import { RRule } from "rrule";
import dayjs from 'dayjs';

import { Task } from "./task.ts";
import { TaskBuilder } from "./task_builder.ts";
import { TaskStatus } from "./task_status.ts";
import { uploadTasks } from "../../upload/tasks.ts";
import { RepeatedRule } from "./repeated_rule.ts";


export class Tasks {

    private items: Map<string, Task>;

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

    public get(id: string | undefined): Task {
        if (!id) {
            return (new TaskBuilder("Unknown task", "")).build();
        }
        const task = this.items.get(id);
        if (task) {
            return task;
        } else {
            return (new TaskBuilder("Unknown task", "")).build();
        }
    }

    public getItems(): Map<string, Task> {
        return this.items;
    }

    public toString(): string {
        return JSON.stringify(Array.from(this.items.values()));
    }

    public filterByStatus(status: TaskStatus): Task[] {
        return Array.from(this.items.values()).filter(task => task.statusEqual(status));
    }

    public filterByWaitingContactId(contactId: string | undefined): Task[] {
        return Array.from(this.items.values()).filter(task => task.waitingContactIdEqual(contactId));
    }

    public filterByAreaId(areaId: string | undefined): Task[] {
        return Array.from(this.items.values()).filter(task => task.areaIdEqual(areaId));
    }

    public toList(): Task[] {
        return Array.from(this.items.values());
    }

    public buildCommonTask(
        id: string | undefined,
        name: string,
        description: string,
        isChecked: boolean,
        status: TaskStatus,
        areaId: string,
        projectId: string,
        waitingContactId: string,
        scheduledDate: string,
        repeatedRule: RepeatedRule | undefined,
    ): void {
        if (!id) {
            return ;
        }
        this.buildFullTask(
            id, name, description, isChecked, "", status, "", areaId,
            projectId, waitingContactId, scheduledDate, repeatedRule
        );
    }

    public buildNewTask(
        name: string,
        description: string,
        isChecked: boolean,
        status: TaskStatus,
        areaId: string,
        projectId: string,
        waitingContactId: string,
        scheduledDate: string,
        repeatedRule: RepeatedRule | undefined,
    ): void {
        this.buildFullTask(
            undefined, name, description, isChecked, "", status, "", areaId,
            projectId, waitingContactId, scheduledDate, repeatedRule
        );
    }

    private next_by_repeated_task(builder: TaskBuilder) {
        const repeatedRule = builder.getRepeatedRule();
        if (builder.getStatus() === TaskStatus.REPEATED && repeatedRule !== undefined) {
            const rrule = new RRule({
                freq: repeatedRule.getFreq(),
                dtstart: repeatedRule.getDtstart().toDate(),
                interval: repeatedRule.getInterval(),
                byweekday: repeatedRule.getByweekday(),
                bymonthday: repeatedRule.getBymonthday(),
                bymonth: repeatedRule.getBymonth(),
            });
            const next_date = rrule.after(repeatedRule.getDtstart().toDate(), true);
            if (next_date !== null) {
                builder.setStatus(TaskStatus.SCHEDULED);
                builder.setScheduledDate(next_date.toISOString().substring(0, 10));
                repeatedRule.setDtstart(dayjs(next_date));
                builder.setRepeatedRule(repeatedRule);
            } else {
                builder.setStatus(TaskStatus.NEXT);
            }
        }
    }

    private build_child_task(builder: TaskBuilder) {
        const child_builder = new TaskBuilder(builder.getName(), builder.getDescription());
        child_builder
            .setIsChecked(builder.getIsChecked())
            .setCheckedDate(builder.getCheckedDate())
            .setStatus(TaskStatus.NEXT)
            .setProjectId(builder.getProjectId())
            .setAreaId(builder.getAreaId())
        ;

        this.set(child_builder.build(), false);
    }

    private check_for_scheduled_task(builder: TaskBuilder) {
        const scheduledDate = builder.getScheduledDate();
        const repeatedRule = builder.getRepeatedRule();

        if (scheduledDate !== "" && scheduledDate <= (new Date().toISOString())) {
            if (repeatedRule !== undefined) {
                const tomorrow = new Date(scheduledDate);
                tomorrow.setDate(tomorrow.getDate() + 1);
                const rrule = new RRule({
                    freq: repeatedRule.getFreq(),
                    dtstart: repeatedRule.getDtstart().toDate(),
                    interval: repeatedRule.getInterval(),
                    byweekday: repeatedRule.getByweekday(),
                    bymonthday: repeatedRule.getBymonthday(),
                    bymonth: repeatedRule.getBymonth(),
                });
                const next_date = rrule.after(tomorrow, true);
                if (next_date !== null) {
                    this.build_child_task(builder);

                    builder.setScheduledDate(next_date.toISOString().substring(0, 10));
                    builder.setIsChecked(false);
                    repeatedRule.setDtstart(dayjs(next_date));
                    builder.setRepeatedRule(repeatedRule);
                } else {
                    builder.setScheduledDate("");
                    builder.setStatus(TaskStatus.NEXT);
                    builder.setRepeatedRule(undefined);
                }
            } else {
                builder.setScheduledDate("");
                builder.setStatus(TaskStatus.NEXT);
            }
        }
    }

    public buildFullTask(
        id: string | undefined,
        name: string,
        description: string,
        isChecked: boolean,
        checkedDate: string,
        status: TaskStatus,
        deletedDate: string,
        areaId: string,
        projectId: string,
        waitingContactId: string,
        scheduledDate: string,
        repeatedRule: RepeatedRule | undefined,
        needUpload: boolean = true,
    ): void {

        const builder = new TaskBuilder(name, description);

        if (id !== undefined) {
            builder.setId(id);
        }

        builder
            .setIsChecked(isChecked)
            .setCheckedDate(checkedDate)
            .setStatus(status)
            .setDeletedDate(deletedDate)
            .setAreaId(areaId)
            .setProjectId(projectId)
            .setWaitingContactId(waitingContactId)
            .setScheduledDate(scheduledDate)
            .setRepeatedRule(repeatedRule)
        ;

        this.next_by_repeated_task(builder);
        this.check_for_scheduled_task(builder);

        if (builder.getCheckedDate() !== "" && 
            builder.getCheckedDate().substring(0, 10) < (new Date().toISOString()).substring(0, 10) && 
            builder.getRepeatedRule() === undefined
        ) {
            builder.setStatus(TaskStatus.ARCHIVED);
        }

        this.set(builder.build(), needUpload);
    }

}