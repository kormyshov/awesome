import { TaskStatus } from "../../types/task/task_status.ts";
import { Projects } from "../../types/project/projects.ts";
import { Contacts } from "../../types/contact/contacts.ts";
import { BaseTaskListStrategy } from "./base_task_list_strategy.ts";
import { TaskList, DecoratedListItem } from "./task_list_strategy.ts";


export class SomedayTaskListStrategy extends BaseTaskListStrategy {
    constructor() {
        super(TaskStatus.SOMEDAY);
    }

    public decorate_list(list: TaskList, projects: Projects, contacts: Contacts): DecoratedListItem[] {
        return list
            .getItems()
            .map(task => new DecoratedListItem(task.getId(), task.getId(), task.getIsChecked(), task.getName(), task.getDescription()))
            ;
    }
}
