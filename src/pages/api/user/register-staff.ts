import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import { db } from '@/database';
import { Staff } from '@/models';
import { IStaff, TypeRole } from '@/types';
import { isValidEmail, jwt } from '@/helpers';


type Data =
  | { message: string }
  | {
    token: string;
    staff: {
      newStaff: IStaff
    }
  }


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'POST':

      return registerStaff(req, res)

    default:
      res.status(400).json({ message: 'Bad Request' })
  }
}

const registerStaff = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const {
    email = '',
    password = '',
    name = '',
    lastName = '',
    phone = '',
    role = '',
    username
  } = req.body as IStaff


  if (password.length < 8) {
    return res.status(400).json({
      message: 'La contraseña debe tener mínimo 8 caracteres'
    })
  }

  if (name.length < 2) {
    return res.status(400).json({
      message: 'El nombre debe tener mínimo 2 caracteres'
    })
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      message: 'El correo no es válido'
    })
  }

  await db.connect();
  const staff = await Staff.findOne({ username });
  await db.disconnect();

  if (staff) {
    return res.status(400).json({ message: 'Username ya existe' });
  }

  const newStaff = new Staff({
    email: email.toLowerCase(),
    password: bcrypt.hashSync(password),
    role, name, lastName, phone, username
  })


  try {
    await newStaff.save({ validateBeforeSave: true })

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: 'Revisar logs del servidor'
    })
  }
  const { _id } = newStaff as IStaff;

  const token = jwt.signToken(_id!, email);

  return res.status(200).json({
    token,
    staff: {
      newStaff
    }

  })
}
