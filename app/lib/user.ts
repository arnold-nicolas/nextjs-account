'use server';

import { getPool } from "@/app/lib/server/db";
import { UserProfile } from "@/app/lib/server/definitions";

import { z } from 'zod';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';

export type State = {
    errors?: {
        fullname?: string[];
        email?: string[];
        password?:string[];
    };
    message?: string | null;
};

const User = z.object({
    id: z.uuid(),
    fullname: z.string().min(3, {
        error: (iss) => {
            iss.minimum;
            return 'Full Name is required.';
        },
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
const CreateAccount = User.omit({ id: true, date: true });

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
        return res.rows[0];
    } catch (error) {
        return {
            message: "Database Error. Failed to fetch user.",
        };
    } finally {
        client.release();
    }
}

export async function createAccount(prevState: State, formData: FormData): Promise<State> {
    const validateFields = CreateAccount.safeParse({
        fullname: formData.get('fullname'),
        email: formData.get('email'),
        password: formData.get('password'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validateFields.success) {
        const err = z.treeifyError(validateFields.error).properties;
        return {
            errors: {
                fullname: err?.fullname?.errors,
                email: err?.email?.errors,
                password:err?.password?.errors,
            },
            message: 'Invalid Data. Failed to Create Account.',
        };
    }
    const { fullname, email, password } = validateFields.data;
    const user = await fetchUserByEmail(email);
    /* Check for dupe account first */
    if (user) {
        return {
            message: 'Account Exists. Failed to Create Account.',
            errors: {},
        };
     }

    const createDate = new Date().toISOString().split('T')[0];
    const hashedPassword = await bcrypt.hash(password, 10);
    let id = '';
    const client = await db.connect();

    try {
        const res = await client.query(
            'insert into users(name, email, password, date) values ($1, $2, $3, $4) returning id',
            [fullname, email, hashedPassword, createDate]
        );
        id = res.rows[0].id;
    } catch (error) {
        console.error(error);
        return {
            errors: {},
            message: 'Failed to Create User.',
        };
    } finally {
        client.release();
    }

    redirect(`/${id}/profile`);
}