import { RRule, datetime } from "rrule";

import { Task } from "./task.ts";
import { TaskBuilder } from "./task_builder.ts";
import { TaskStatus } from "./task_status.ts";
import { uploadTasks } from "../../upload/tasks.ts";


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

    public toList(): Task[] {
        return Array.from(this.items.values());
    }

    public buildMinimalTask(name: string, description: string): void {
        const builder = new TaskBuilder(name, description);
        this.set(builder.build());
    }

    public buildCommonTask(
        id: string | undefined,
        name: string,
        description: string,
        isChecked: boolean,
        status: TaskStatus,
        projectId: string,
        waitingContactId: string,
        scheduledDate: string,
        repeatRule: RRule | undefined,
    ): void {
        if (!id) {
            return ;
        }
        this.buildFullTask(
            id, name, description, isChecked, "", status, "", 
            projectId, waitingContactId, scheduledDate, repeatRule
        );
    }

    private next_by_repeated_task(builder: TaskBuilder) {
        const repeatRule = builder.getRepeatRule();
        if (builder.getStatus() === TaskStatus.REPEATED && repeatRule !== undefined) {
            const next_date = repeatRule.after(repeatRule.options.dtstart, true);
            if (next_date !== null) {
                builder.setStatus(TaskStatus.SCHEDULED);
                builder.setScheduledDate(next_date.toISOString().substring(0, 10));
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
        ;

        this.set(child_builder.build());
    }

    private check_for_scheduled_task(builder: TaskBuilder) {
        const scheduledDate = builder.getScheduledDate();
        const repeatRule = builder.getRepeatRule();
        console.log("repeatRule...", repeatRule);

        if (scheduledDate !== "" && scheduledDate <= (new Date().toISOString())) {
            if (repeatRule !== undefined) {
                console.log("scheduledDate...", scheduledDate);
                const tomorrow = new Date(scheduledDate);
                tomorrow.setDate(tomorrow.getDate() + 1);
                console.log("tomorrow...", tomorrow);
                // return;
                const next_date = repeatRule.after(tomorrow, true);
                console.log("next date", next_date);
                if (next_date !== null) {
                    builder.setScheduledDate(next_date.toISOString().substring(0, 10));
                    builder.setIsChecked(false);
                    builder.setRepeatRule(
                        new RRule({
                            ...repeatRule.options,
                            dtstart: next_date
                        })
                    );

                    this.build_child_task(builder);

                } else {
                    builder.setScheduledDate("");
                    builder.setStatus(TaskStatus.NEXT);
                    builder.setRepeatRule(undefined);
                }
            } else {
                builder.setScheduledDate("");
                builder.setStatus(TaskStatus.NEXT);
            }
        }
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
        repeatRule: RRule | undefined,
        needUpload: boolean = true,
    ): void {

        if (repeatRule !== undefined) {
            console.log("repeatRule", repeatRule);
            repeatRule = new RRule({
                freq: repeatRule.options.freq,
                dtstart: new Date(repeatRule.options.dtstart),
                interval: repeatRule.options.interval,
            })
        }

        const builder = new TaskBuilder(name, description);
        builder
            .setId(id)
            .setIsChecked(isChecked)
            .setCheckedDate(checkedDate)
            .setStatus(status)
            .setDeletedDate(deletedDate)
            .setProjectId(projectId)
            .setWaitingContactId(waitingContactId)
            .setScheduledDate(scheduledDate)
            .setRepeatRule(repeatRule)
        ;

        console.log("Builder start", builder);

        this.next_by_repeated_task(builder);
        console.log("Builder after next_by_repeated_task", builder);
        this.check_for_scheduled_task(builder);

        if (builder.getCheckedDate() !== "" && 
            builder.getCheckedDate() < (new Date().toISOString()) && 
            builder.getRepeatRule() === undefined
        ) {
            builder.setStatus(TaskStatus.ARCHIVED);
        }

        console.log("Builder end", builder);

        this.set(builder.build(), needUpload);
    }

}