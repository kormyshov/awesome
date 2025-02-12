import { v4 } from "uuid";
import { ContactStatus } from "./contact_status.ts";


export class Contact {
    
    id: string;
    name: string;
    status: ContactStatus;

    constructor(name: string);                                      // definition 1
    constructor(id: string, status: ContactStatus);                 // definition 2
    constructor(id: string, name: string, status: ContactStatus);   // definition 3
    constructor(...args: any[]) {
        if (args.length === 1) {                                    // use definition 1
            this.id = v4();
            this.name = args[0];
            this.status = ContactStatus.ACTIVE;
        } else if (args.length === 2) {                             // use definition 2
            this.id = args[0];
            this.name = args[1];
            this.status = ContactStatus.DELETED;
        } else {                                                    // use definition 3
            this.id = args[0];
            this.name = args[1];
            this.status = args[2];
        }
    }

    public isActive(): boolean {
        return this.status === ContactStatus.ACTIVE;
    }

    public setDeleted(): void {
        this.status = ContactStatus.DELETED;
    }
}