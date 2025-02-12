import { TaskRepeatType } from "./task_repeat_type.ts";
import { Weekdays } from "./weekdays.ts";


export class TaskRepeatRule {

    type: TaskRepeatType;
    startDate: string;
    frequencyInterval: number;
    weekdays: Weekdays;

    constructor();
    constructor(type: TaskRepeatType, startDate: string, frequencyInterval: number);
    constructor(type: TaskRepeatType, startDate: string, frequencyInterval: number, weekdays: Weekdays)
    constructor(...args: any[]) {
        if (args.length === 0) {
            this.type = TaskRepeatType.NONE;
            this.startDate = "";
            this.frequencyInterval = 0;
            this.weekdays = new Weekdays();
        }else if (args.length === 3) {
            this.type = args[0];
            this.startDate = args[1];
            this.frequencyInterval = args[2];
            this.weekdays = new Weekdays();
        } else if (args.length === 4) {
            this.type = args[0];
            this.startDate = args[1];
            this.frequencyInterval = args[2];
            this.weekdays = args[3];
        }
    }
    
}
