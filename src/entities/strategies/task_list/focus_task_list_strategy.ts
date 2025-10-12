import { TaskListStrategy, TaskList, DecoratedListItem } from "./task_list_strategy.ts";
import { Tasks } from "../../types/task/tasks.ts";
import { Projects } from "../../types/project/projects.ts";
import { Contacts } from "../../types/contact/contacts.ts";
import { Area } from "../../types/area/area.ts";
import { TaskStatus } from "../../types/task/task_status.ts";


export class FocusTaskListStrategy implements TaskListStrategy {
    public prepare_list(tasks: Tasks, projects: Projects, contacts: Contacts, currentArea: Area, currentProjectId: string): TaskList[] {
        const items = tasks
            .filterIsFocus()
            .filter(task => task.areaIdEqual(currentArea.getId()))
        ;

        return ["Next", "Waiting", "Scheduled", "Someday", "Repeated"]
            .map(status => new TaskList(
                status,
                items.filter(task => task.statusEqual(status as TaskStatus))
            ))
            .filter(list => list.isEmpty() === false)
        ;

    }
    
    public decorate_list(list: TaskList, projects: Projects, contacts: Contacts): DecoratedListItem[] {
        return list
            .getItems()
            .map(task => new DecoratedListItem(
                task.getId(), 
                task.getId(), 
                task.getIsChecked(), 
                task.getName(), 
                task.getProjectId() === '' || task.getProjectId() === undefined ? '' : projects.get(task.getProjectId()).getName()
            ))
            ;
    }

    public link_to_new_task(currentProjectId: string): string {
        return "/tasks/new/focus";
    }
}
