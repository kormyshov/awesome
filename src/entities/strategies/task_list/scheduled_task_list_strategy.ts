import { TaskStatus } from "../../types/task/task_status.ts";
import { BaseTaskListStrategy } from "./base_task_list_strategy.ts";


export class ScheduledTaskListStrategy extends BaseTaskListStrategy {
    constructor() {
        super(TaskStatus.SCHEDULED);
    }
}
