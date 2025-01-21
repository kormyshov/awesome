import { ContactActionType } from "../types/contact/contact_action_type.tsx";
import { Contact } from "../types/contact/contact.tsx";
import { ContactStatus } from "../types/contact/contact_status.tsx";


export const addContact = (contactName: string) => {
    return {
        type: ContactActionType.ADD_CONTACT,
        item: new Contact(contactName),
    }
}

export const deleteContact = (contactId: string) => {
    return {
        type: ContactActionType.DELETE_CONTACT,
        item: new Contact(contactId, ContactStatus.DELETED),
    }
}

export const saveContact = (contactId: string, contactName: string) => {
    return {
        type: ContactActionType.SAVE_CONTACT,
        item: new Contact(contactId, contactName, ContactStatus.ACTIVE),
    }
}
