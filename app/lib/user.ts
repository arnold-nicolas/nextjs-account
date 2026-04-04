'use server';

import { getPool } from "@/app/lib/server/db";
import { UserProfile } from "@/app/lib/server/definitions";

import { z } from 'zod';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';

const FormSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
    date: z.string(),
});
const CreateAccount = FormSchema.omit({ id: true, date: true });

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
        throw new Error("Database Error. Failed to fetch user.");
    } finally {
        client.release();
    }
}

export async function fetchUserByEmail(email: string) {
    const client = await db.connect();
    try {
        const res = await client.query('select id from users where email = $1', [email]);
        console.log(res);
        return res.rows[0];
    } catch (error) {
        throw new Error("Database Error. Failed to fetch user.");
    } finally {
        client.release();
    }
}

export async function createAccount(formData: FormData) {
    const { name, email, password } = CreateAccount.parse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    });

    const user = await fetchUserByEmail(email);
    /* Check for dupe account first */
    if (user) {
        redirect('/');
    }

    const createDate = new Date().toISOString().split('T')[0];
    const hashedPassword = await bcrypt.hash(password, 10);
    /*
    try {
        await sql`
            insert into user(name, email, password, date)
            values (${name}, ${email}, ${hashedPassword}, ${date})
        `;
    } catch (error) {
        console.error(error);
        return (
            message: 'Database Error: Failed to Create User.',
        );
    } */

    const id = '2f4890b7-7d08-4cd5-af8b-c36d56d13653';
    redirect(`/${id}/profile`);
}