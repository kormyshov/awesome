import { Contact } from "./contact.tsx";


export class Contacts {

    items: Map<string, Contact>;

    constructor() {
        this.items = new Map<string, Contact>();
    }

    public filter(predicate: () => boolean): Contact[] {
        return Array.from(this.items.values()).filter(e => predicate.call(e));
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
}