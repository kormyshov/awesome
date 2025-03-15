import { Area } from "./area.ts";


export class Areas {

    private items: Map<string, Area>;

    constructor() {
        this.items = new Map<string, Area>();
    }

    public filterIsNotDeleted(): Area[] {
        return Array.from(this.items.values()).filter(e => !e.isDeleted());
    }

    public filterIsActive(): Area[] {
        return Array.from(this.items.values()).filter(e => e.isActive());
    }

    public set(area: Area): void {
        this.items.set(area.getId(), area);
    }

    public get(id: string | undefined): Area {
        if (!id) {
            return new Area("Unknown area");
        }
        const area = this.items.get(id);
        if (area) {
            return area;
        } else {
            return new Area("Unknown area");
        }
    }

    public setDeleted(area: Area): void {
        this.items.get(area.getId())?.setDeleted();
    }

    public toString(): string {
        return JSON.stringify(Array.from(this.items.values()));
    }

    public add(area: Area): void {
        this.items.set(area.getId(), area);
    }
}
