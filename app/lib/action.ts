'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { fetchUserByEmail, addUser } from '@/app/lib/user';

const FormSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
    date: z.string(),
});

const CreateAccount = FormSchema.omit({ id: true, date: true });

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
    const id = '2f4890b7-7d08-4cd5-af8b-c36d56d13653';

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

    redirect(`/${id}/profile`);
}