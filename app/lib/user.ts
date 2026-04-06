'use server';

import { getPool } from "@/app/lib/server/db";
import { UserProfile } from "@/app/lib/server/definitions";

import { z } from 'zod';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';

export type State = {
    errors?: {
        username?: string[];
        email?: string[];
        password?:string[];
    };
    message?: string | null;
};

const FormSchema = z.object({
    id: z.string(),
    username: z.string({
        error: 'Full Name is required.'
    }),
    email: z.email({
        error: 'Email is required.'
    }),
    password: z.string().min(6, {
        error: (iss) => {
            iss.minimum;
            iss.inclusive;
            return `Password must have ${iss.minimum} characters or more.`;
        },
    }),
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
        return {
            message: "Database Error. Failed to fetch user.",
        };
    } finally {
        client.release();
    }
}

export async function createAccount(prevState: State, formData: FormData) {
    const validateFields = CreateAccount.safeParse({
        name: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Account.',
        };
    }
    const { username, email, password } = validateFields.data;
    const user = await fetchUserByEmail(email);
    /* Check for dupe account first */
    if (user) {
        return {
            message: 'Account Exists. Failed to Create Account.',
        };
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