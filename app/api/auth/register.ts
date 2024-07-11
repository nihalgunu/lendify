import { NextApiRequest, NextApiResponse } from 'next';
import sqlite from 'sqlite';
import { open } from 'sqlite';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { name, email, password } = req.body;

    try {
        const db = await open({
            filename: './database.sqlite',
            driver: sqlite.Database,
        });

        await db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                email TEXT,
                password TEXT
            )
        `);

        await db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', name, email, password);

        await db.close();

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error: any) {
        console.error('Error registering user:', error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
