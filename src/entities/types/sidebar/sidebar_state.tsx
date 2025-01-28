import { SidebarStatus } from "./sidebar_status.tsx";


export class SidebarState {

    state: SidebarStatus;

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