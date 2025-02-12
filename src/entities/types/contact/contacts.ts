import { Contact } from "./contact.ts";


export class Contacts {

    items: Map<string, Contact>;

    constructor() {
        this.items = new Map<string, Contact>();
    }

    public filterIsActive(): Contact[] {
        return Array.from(this.items.values()).filter(e => e.isActive());
    }

    public set(contact: Contact): void {
        this.items.set(contact.id, contact);
    }

    public setDeleted(contact: Contact): void {
        this.items.get(contact.id)?.setDeleted();
    }

    public toString(): string {
        return JSON.stringify(Array.from(this.items.values()));
    }

    public add(contact: Contact): void {
        this.items.set(contact.id, contact);
    }
}