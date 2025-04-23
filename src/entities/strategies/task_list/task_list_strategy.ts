import { Task } from "../../types/task/task.ts";
import { Tasks } from "../../types/task/tasks.ts";
import { Projects } from "../../types/project/projects.ts";
import { Contacts } from "../../types/contact/contacts.ts";
import { Area } from "../../types/area/area.ts";


export class TaskList {
    private listName: string;
    private items: Task[];

    constructor(listName: string, items: Task[]) {
        this.listName = listName;
        this.items = items;
    }

    public isEmpty(): boolean {
        return this.items.length === 0;
    }

    public getListName(): string {
        return this.listName;
    }

    public getItems(): Task[] {
        return this.items;
    }
}

export class DecoratedListItem {
    private key: string;
    private id: string;
    private is_checked: boolean;
    private value: string;
    private added_field: string;

    constructor(key: string, id: string, is_checked: boolean, value: string, added_field: string) {
        this.key = key;
        this.id = id;
        this.is_checked = is_checked;
        this.value = value;
        this.added_field = added_field;
    }

    public getKey(): string {
        return this.key;
    }

    public getId(): string {
        return this.id;
    }

    public getIsChecked(): boolean {
        return this.is_checked;
    }

    public getValue(): string {
        return this.value;
    }

    public getAddedField(): string {
        return this.added_field;
    }
}

export interface TaskListStrategy {
    prepare_list(tasks: Tasks, projects: Projects, contacts: Contacts, currentArea: Area, currentProjectId: string): TaskList[];
    decorate_list(list: TaskList, projects: Projects, contacts: Contacts): DecoratedListItem[];
    link_to_new_task(currentProjectId: string): string;
}
