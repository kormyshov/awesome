import { v4 } from 'uuid';


export const initContacts = (contacts) => {
    return {
        type: "INIT_CONTACTS",
        items: contacts,
    }
}

export const addContact = (contactName) => {
    return {
        type: "ADD_CONTACT",
        item: {
            id: v4(contactName),
            contactName: contactName,
            contactStatus: "ACTIVE",
        },
    }
}

export const deleteContact = (contactId, contactName) => {
    return {
        type: "DELETE_CONTACT",
        id: contactId,
        item: {
            id: contactId,
            contactName: contactName,
            contactStatus: "DELETED",
        },
    }
}

export const saveContact = (contactId, contactName) => {
    return {
        type: "SAVE_CONTACT",
        item: {
            id: contactId,
            contactName: contactName,
            contactStatus: "ACTIVE",
        },
    }
}
