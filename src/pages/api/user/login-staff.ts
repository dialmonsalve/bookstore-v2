import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import { db } from '@/database';
import { Staff } from '@/models';
import { IStaff, TypeRole } from '@/types';
import { jwt } from '@/helpers';

type Data =
  | { message: string }
  | {
    token: string;
    staff: {
      email?: string;
      role: TypeRole[];
      name: string;
      lastName: string;
      phone?: string;
      username:string;
    }
  }


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'POST':

      return loginStaff(req, res)

    default:
      res.status(400).json({ message: 'Bad Request' })
  }
}

const loginStaff = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const { username = '', password = '' } = req.body

  await db.connect();
  const staff = await Staff.findOne({ username });
  await db.disconnect();

  if (!staff) {
    return res.status(401).json({ message: 'Username o contraseña no válidos' })
  }

  if (!bcrypt.compareSync(password, staff.password)) {
    return res.status(401).json({ message: 'Username o contraseña no válidos' })
  }
  const { role, name, email, lastName, phone, _id } = staff as IStaff;

  const token = jwt.signToken(_id!, username);

  return res.status(200).json({
    token,
    staff: {
      email, role, name, lastName, phone, username
    }

  })
}
