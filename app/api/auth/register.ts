import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../auth/index';
import { usersTable } from '../auth/schema';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await db.insert(usersTable).values({
      name,
      email,
      password: hashedPassword,
    }).run();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ success: false, message: 'Error registering user' });
  }
};
