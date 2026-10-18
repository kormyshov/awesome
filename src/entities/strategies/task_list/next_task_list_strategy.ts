import { TaskStatus } from "../../types/task/task_status.ts";
import { Projects } from "../../types/project/projects.ts";
import { Contacts } from "../../types/contact/contacts.ts";
import { BaseTaskListStrategy } from "./base_task_list_strategy.ts";
import { TaskList, DecoratedListItem } from "./task_list_strategy.ts";
import { taskDescriptionToPlainText } from "../../types/task/task_description.ts";


export class NextTaskListStrategy extends BaseTaskListStrategy {
    constructor() {
        super(TaskStatus.NEXT);
    }

    public decorate_list(list: TaskList, projects: Projects, contacts: Contacts): DecoratedListItem[] {
        return list
            .getItems()
            .map(task => new DecoratedListItem(
                task.getId(),
                task.getId(),
                task.getIsChecked(),
                task.getName(),
                taskDescriptionToPlainText(task.getDescription())
            ))
            ;
    }
}
