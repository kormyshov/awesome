import { TaskListStrategy, TaskList, DecoratedListItem } from "./task_list_strategy.ts";
import { Tasks } from "../../types/task/tasks.ts";
import { Projects } from "../../types/project/projects.ts";
import { Contacts } from "../../types/contact/contacts.ts";
import { Area } from "../../types/area/area.ts";
import { TaskStatus } from "../../types/task/task_status.ts";


export class WaitingTaskListStrategy implements TaskListStrategy {
    public prepare_list(tasks: Tasks, projects: Projects, contacts: Contacts, currentArea: Area, currentProjectId: string): TaskList[] {
        const items = tasks
            .filterByStatus(TaskStatus.WAITING)
            .filter(task => task.areaIdEqual(currentArea.getId()))
        ;

        return contacts
            .filterIsActive()
            .map(contact => new TaskList(
                contact.getName(),
                items.filter(task => task.waitingContactIdEqual(contact.getId()))
            ))
            .filter(list => list.isEmpty() === false)
        ;
    }
    
    public decorate_list(list: TaskList): DecoratedListItem[] {
        return list
            .getItems()
            .map(task => new DecoratedListItem(task.getId(), task.getId(), task.getIsChecked(), task.getName(), ''))
            ;
    }

    public link_to_new_task(currentProjectId: string): string {
        return "/tasks/new/" + TaskStatus.WAITING.toLowerCase();
    };
}
