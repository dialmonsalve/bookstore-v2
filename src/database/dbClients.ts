import { Client } from "@/models";
import { db } from "."
import { IClient } from "@/types";
import bcrypt from 'bcryptjs'


export const checkUserEmailPassword = async (email: string, password: string) => {

  try {
    if (!email || !password) {
      throw new Error('Correo electrónico y contraseña son obligatorios');
    }

    const client = await Client.findOne({ email });
    if (!client) {
      return null;
    }

    if (!bcrypt.compareSync(password, client.password)) {
      return null
    }
    const { name, image, lastName, phone, _id, } = client as IClient;

    return {
      _id,
      email: email.toLowerCase(),
      name, image, lastName, phone
    }
  } catch (error: any) {
    console.error('Error en autenticación:', error.message);
  }
}

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