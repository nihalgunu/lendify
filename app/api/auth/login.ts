//WORK IN PROGRESS
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../auth/index';
import { usersTable } from '../auth/schema';
import bcrypt from 'bcrypt';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const { email, password } = req.body;

  try {
    const users = await db
      .select()
      .from(usersTable)
      .where(usersTable.email.equals(email))

    if (users.length === 0) {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
      return;
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
      return;
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ success: false, message: 'Error logging in user' });
  }
};
