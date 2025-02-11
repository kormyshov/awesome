import { Contacts } from "../types/contact/contacts.tsx";
import { getCommand, getRequestOptions } from "./common.ts";


export const uploadContacts = (state: Contacts = new Contacts()) => {
    fetch(getCommand("set_contacts"), getRequestOptions(state));
}
