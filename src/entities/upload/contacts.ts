import { Contacts } from "../types/contact/contacts.ts";
import { getCommand, getRequestOptions } from "./common.ts";


export const uploadContacts = (state: Contacts = new Contacts()) => {
    fetch(getCommand("set_contacts"), getRequestOptions(state));
}
