
const defaultUserData = [
    {
        'name': "test test",
        'email': "test@test.com",
        'phone': "(123) 456-7890",
        'address': "123 Main St <br />Anytown, USA 12345",
    },
];

export async function fetchUserById(id: string) {
    try {
        return defaultUserData[0];
    } catch (error) {
        throw new Error("Database Error. Failed to fetch user.");
    }
}

export async function fetchUserByEmail(email: string) {
    try {
        return;
    } catch (error) {
        throw new Error("Database Error. Failed to fetch user.");
    }
    
}