import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import { db } from '@/database';
import { Staff } from '@/models';
import { IStaff, ResponseObject } from '@/types';

import { Client } from '@/models';
import { IClient } from '@/types';
import { isValidEmail } from '@/helpers';

type Data =
  | { message: string }
  | ResponseObject

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'POST':

      return registerUser(req, res)

    default:
      res.status(400).json({ message: 'Bad Request' })
  }
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const {
    email = '',
    password = '',
    name = '',
    lastName = '',
    phone = '',
    role,
    username,
    image = ''
  } = req.body as IStaff

  const TOTAL_LETTERS = username ? 4 : 8
  try {

    if (password.length < TOTAL_LETTERS) {
      return res.status(400).json({
        message: 'La contraseña debe tener mínimo 8 caracteres'
      })
    }

    if (name.length < 2) {
      return res.status(400).json({
        message: 'El nombre debe tener mínimo 2 caracteres'
      })
    }

    await db.connect();

    let user;

    if (username) {
      user = await Staff.findOne({ username });
      if (user) {
        return res.status(400).json({ message: 'Usuario ya existe' });
      }

      const newStaff = new Staff({
        email: email.toLowerCase(),
        password: bcrypt.hashSync(password),
        role, name, lastName, phone, username, image
      })

      await newStaff.save({ validateBeforeSave: true })

      const { _id } = newStaff as IStaff;

      return res.status(200).json({
        _id, email, image, lastName, name, phone, role, username
      })

    } else {

      if (!isValidEmail(email)) {
        return res.status(400).json({
          message: 'El correo no es válido'
        })
      }

      user = await Client.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'Usuario ya existe' });
      }
      const newClient = new Client({
        email: email.toLowerCase(),
        password: bcrypt.hashSync(password),
        name, lastName, phone, image
      })

      await newClient.save({ validateBeforeSave: true })

      const { _id } = newClient as IClient;

      return res.status(200).json({
        _id, email, image, lastName, name, phone

      })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Revisar logs del servidor'
    })
  }
}

