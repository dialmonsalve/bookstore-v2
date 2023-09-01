import { NextApiRequest, NextApiResponse } from 'next';

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
    case 'GET':

      return checkJWT(req, res)

    default:
      res.status(400).json({ message: 'Bad Request' })
  }
}

const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const { token = '' } = req.cookies;

  let userId = '';

  try {
    userId = await jwt.isValidToken(token)
  } catch (error) {
    return res.status(401).json({
      message:'Token no es válido'
    })
  }

  await db.connect();
  const staff = await Staff.findById( userId ).lean();
  await db.disconnect(); 

  if (!staff) {
    return res.status(400).json({ message: 'No existe el usuario con el id' })
  }

  const { role, name, email, lastName, phone, _id, username } = staff as IStaff;

  return res.status(200).json({
    token:jwt.signToken(_id!, username),
    staff: {
      email, role, name, lastName, phone, username
    }

  })
}
