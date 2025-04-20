import { TaskListStrategy, TaskList, DecoratedListItem } from "./task_list_strategy.ts";
import { Tasks } from "../../types/task/tasks.ts";
import { Projects } from "../../types/project/projects.ts";
import { Contacts } from "../../types/contact/contacts.ts";
import { Area } from "../../types/area/area.ts";
import { TaskStatus } from "../../types/task/task_status.ts";


export class ScheduledTaskListStrategy implements TaskListStrategy {
    public prepare_list(tasks: Tasks, projects: Projects, contacts: Contacts, currentArea: Area, currentProjectId: string): TaskList[] {
        const items = tasks
            .filterByStatus(TaskStatus.SCHEDULED)
            .filter(task => task.areaIdEqual(currentArea.getId()))
        ;

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const seven_days = new Date();
        seven_days.setDate(seven_days.getDate() + 7);

        const thirty_days = new Date();
        thirty_days.setDate(thirty_days.getDate() + 30);

        const ninty_days = new Date();
        ninty_days.setDate(ninty_days.getDate() + 90);

        return [
                {
                    name: 'Tomorrow',
                    to: tomorrow.toISOString().substring(0, 10)
                },
                {
                    name: '7 days',
                    from: tomorrow.toISOString().substring(0, 10),
                    to: seven_days.toISOString().substring(0, 10)
                },
                {
                    name: '30 days',
                    from: seven_days.toISOString().substring(0, 10),
                    to: thirty_days.toISOString().substring(0, 10)
                },
                {
                    name: '90 days',
                    from: thirty_days.toISOString().substring(0, 10),
                    to: ninty_days.toISOString().substring(0, 10)
                },
                {
                    name: 'Later',
                    from: ninty_days.toISOString().substring(0, 10)
                }
            ]
            .map(range => new TaskList(
                range.name,
                items.filter(task => 
                    (range.from === undefined || task.getScheduledDate() > range.from) && 
                    (range.to === undefined || task.getScheduledDate() <= range.to)
                )
            ))
            .filter(list => list.isEmpty() === false)
    }

    public decorate_list(list: TaskList): DecoratedListItem[] {
        return list
            .getItems()
            .map(task => new DecoratedListItem(task.getId(), task.getId(), task.getIsChecked(), task.getName(), ''))
            ;
    }
}
