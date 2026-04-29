export type UserTable = {
    id: string;
    name: string;
    email: string;
    password: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    date: string;
};

export type UserProfile = {
    fullname: string;
    email: string;
    phone: string;
    address: string;
}

export type SessionPayload = {
    id: string;
    expiresAt: Date;
}