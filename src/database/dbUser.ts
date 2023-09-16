import { Client, Employee } from "@/models";
import { db } from "."
import { IClient, IEmployee, TypeRole } from "@/types";
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

const findUser = async (validateField: string, isEmployee: boolean) => {

  if (isEmployee) {
    return await Employee.findOne({ username: validateField });
  } else {
    return await Client.findOne({ email: validateField });
  }
};

export async function checkEmailPassword(validateField: string, password: string, isEmployee: boolean = false) {

  try {

    if (!validateField || !password) {
      throw new Error('Las credenciales son obligatorias');
    }

    const user = await findUser(validateField, isEmployee);

    if (!user) {
      return null;
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return null;
    }

    const { name, image, lastName, _id, email, role, username } = user as IEmployee;

    const responseObject: ResponseObject = {
      _id,
      email: email?.toLowerCase(),
      name,
      image,
      lastName,
    };
    if (username) {
      responseObject.username = validateField.toLocaleLowerCase();
      responseObject.role = role;
    }

    return responseObject;

  } catch (error: any) {
    console.error('Error en autenticación:', error.message);
  }
};

export async function oAuthDbClient(oAuthEmail: string, oAuthName: string, oAuthImage: string) {

  await db.connect();
  const client = await Client.findOne({ email: oAuthEmail });

  if (client) {
    await db.disconnect();
    const { _id, name, email, lastName, image } = client as IClient
    return { _id, name, email, lastName, image }
  }

  const newClient = new Client({
    email: oAuthEmail,
    name: oAuthName,
    image: oAuthImage,
    isAccountValidated: true,
    password: '@',
    lastName: '',
  })

  await newClient.save();
  await db.disconnect();

  const { _id, name, lastName, email, image } = newClient as IClient;

  return { _id, name, lastName, email, image };
}
