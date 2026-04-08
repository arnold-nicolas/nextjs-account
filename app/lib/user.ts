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

/**
 * This TypeScript function fetches user information by ID from a database and returns the user's name,
 * email, phone, and formatted address.
 *
 * @param {string} id - fetches user data from a database based on the provided `id`.
 * The function connects to the database, queries the user information based on the `id`.
 *
 * @returns an object with the properties `name`, `email`, and `address`.
 * The `address` property is a concatenated string of the `address`, `city`, `state`, and `zip` fields
 * from the database, separated by `<br />` and `,`.
 */
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

/**
 * The function fetches a user's ID from the database based on their email address.
 *
 * @param {string} email - retrieves a user's ID from the database based on their email address.
 *
 * @returns either the user object with the `id` property if the user with the specified email is
 * found in the database, or an object with a `message` property indicating a database error if
 * there was an issue fetching the user.
 */
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

/**
 * The function `createAccount` handles the creation of a new user account by validating form data,
 * checking for duplicate accounts, hashing the password, and inserting user details into a database.
 *
 * @param {State} prevState - represents the previous state of the application or the state before the
 * account creation process.
 * @param {FormData} formData - contains user input data from a form submission. It is used to extract
 * values for the `fullname`, `email`, and `password` fields needed to create a new user account.
 *
 * @returns a Promise that resolves to a `State` object. The `State` object contains either validation
 * errors and a message if the form validation fails, or a success message if the account creation is
 * successful. If a user with the same email already exists, it returns a message indicating that the
 * account creation failed. If there is an error during the database operation, it returns an error
 * message.
 */
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