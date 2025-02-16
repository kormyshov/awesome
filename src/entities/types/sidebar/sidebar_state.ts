import { SidebarStatus } from "./sidebar_status.ts";


export class SidebarState {

    private state: SidebarStatus;

    constructor() {
        this.state = SidebarStatus.CLOSE;
    }

    public close() {
        this.state = SidebarStatus.CLOSE;
    }

    public open() {
        this.state = SidebarStatus.OPEN;
    }

    public isOpen() {
        return this.state === SidebarStatus.OPEN;
    }
}