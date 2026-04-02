import { getPool } from "@/app/lib/server/db";

const defaultUserData = [
    {
        'name': "test test",
        'email': "test@test.com",
        'phone': "(123) 456-7890",
        'address': "123 Main St <br />Anytown, USA 12345",
    },
];
const db = getPool();

export async function fetchUserById(id: string) {
    const client = await db.connect();
    try {
        const res = await client.query(
            "select name, email, phone, address || '<br />' || city || ', ' || state || ' ' || zip as address from users where id = $1", [id]
        );
        return res.rows[0];
    } catch (error) {
        console.log(error);
        throw new Error("Database Error. Failed to fetch user by ID.");
    } finally {
        client.release();
    }
}

export async function fetchUserByEmail(email: string) {
    try {
        await db.connect();
        const res = await db.query('select * from users where email = $1', [email]);
        console.log(res);
        return res.rows;
    } catch (error) {
        throw new Error("Database Error. Failed to fetch user by Email.");
    }
}

export async function addUser() {
    try {
        await db.connect();
    } catch (error) {
        throw new Error("Database Error: Failed to add user.");
    }
}