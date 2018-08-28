export interface Staff {
    id?: string;
    names?: string;
    nick?: string;
    gender?: string;
    dob?: Date;
    contact?: Contact;
    created?: any;
    lastUpdate?: any;
}
  
interface Contact {
    phone?: string;
    otherPhones?: string;
    email?: string;
    address?: string;
}