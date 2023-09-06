import { Client, Staff } from "@/models";
import { db } from "."
import { IClient, IStaff, TypeRole } from "@/types";
import bcrypt from 'bcryptjs';

interface ResponseObject {
  _id?: string,
  email?: string,
  name?: string,
  image?: string,
  lastName?: string,
  phone?: string,
  role?: TypeRole[],
  username?: string
}

const findUser = async (validateField: string, isStaff: boolean) => {

  if (isStaff) {
    return await Staff.findOne({ username: validateField });
  } else {
    return await Client.findOne({ email: validateField });
  }
};

export const checkEmailPassword = async (validateField: string, password: string, isStaff: boolean = false) => {

  try {

    if (!validateField || !password) {
      throw new Error('Las credenciales son obligatorias');
    }

    const user = await findUser(validateField, isStaff);

    if (!user) {
      return null;
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return null;
    }

    const { name, image, lastName, phone, _id, email, role, username } = user as IStaff;

    const responseObject:ResponseObject = {
      _id,
      email: email?.toLowerCase(),
      name,
      image,
      lastName,
      phone,
      role,
    };
    if (username) {
      responseObject.username = validateField.toLocaleLowerCase();
    }

    return responseObject;

  } catch (error: any) {
    console.error('Error en autenticación:', error.message);
  }
};


export const oAuthDbClient = async (oAuthEmail: string, oAuthName: string, oAuthImage: string) => {

  await db.connect();
  const client = await Client.findOne({ email: oAuthEmail });

  if (client) {
    await db.disconnect();
    const { _id, name, email, lastName, phone, image } = client as IClient
    return { _id, name, email, lastName, phone, image }
  }

  const newClient = new Client({
    email: oAuthEmail,
    name: oAuthName,
    image: oAuthImage,
    isAccountValidated: true,
    password: '@',
    lastName: '',
    phone: '',
  })

  await newClient.save();
  await db.disconnect();

  const { _id, name, lastName, email, phone, image } = newClient as IClient;

  return { _id, name, lastName, email, phone, image };
}
