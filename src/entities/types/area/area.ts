import { v4 } from "uuid";
import { AreaStatus } from "./area_status.ts";


export class Area {
    
    private id: string;
    private name: string;
    private status: AreaStatus;

    constructor(name: string);                                      // definition 1
    constructor(id: string, status: AreaStatus);                    // definition 2
    constructor(id: string, name: string, status: AreaStatus);      // definition 3
    constructor(...args: any[]) {
        if (args.length === 1) {                                    // use definition 1
            this.id = v4();
            this.name = args[0];
            this.status = AreaStatus.ACTIVE;
        } else if (args.length === 2) {                             // use definition 2
            this.id = args[0];
            this.name = args[1];
            this.status = AreaStatus.DELETED;
        } else {                                                    // use definition 3
            this.id = args[0];
            this.name = args[1];
            this.status = args[2];
        }
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getStatus(): AreaStatus {
        return this.status;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public isActive(): boolean {
        return this.status === AreaStatus.ACTIVE;
    }

    public isDeleted(): boolean {
        return this.status === AreaStatus.DELETED;
    }

    public setDeleted(): void {
        this.status = AreaStatus.DELETED;
    }
}