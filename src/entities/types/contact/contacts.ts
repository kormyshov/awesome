import { Contact } from "./contact.ts";


export class Contacts {

    private items: Map<string, Contact>;

    constructor() {
        this.items = new Map<string, Contact>();
    }

    public filterIsActive(): Contact[] {
        return Array.from(this.items.values()).filter(e => e.isActive());
    }

    public set(contact: Contact): void {
        this.items.set(contact.getId(), contact);
    }

    public get(id: string | undefined): Contact {
        if (!id) {
            return new Contact("Unknown contact");
        }
        const contact = this.items.get(id);
        if (contact) {
            return contact;
        } else {
            return new Contact("Unknown contact");
        }
    }

    public setDeleted(contact: Contact): void {
        this.items.get(contact.getId())?.setDeleted();
    }

    public toString(): string {
        return JSON.stringify(Array.from(this.items.values()));
    }

    public add(contact: Contact): void {
        this.items.set(contact.getId(), contact);
    }
}