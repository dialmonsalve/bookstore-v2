import { Client, Staff } from "@/models";
import { db } from "."
import { IClient, IStaff } from "@/types";
import bcrypt from 'bcryptjs'

export const checkClientEmailPassword = async (validateField: string, password: string) => {

  try {
    if (!validateField || !password) {
      throw new Error('Correo electrónico y contraseña son obligatorios');
    }

    const client = await Client.findOne({ email:validateField });
    if (!client) {
      return null;
    }

    if (!bcrypt.compareSync(password, client.password)) {
      return null
    }
    const { name, image, lastName, phone, _id, } = client as IClient;

    return {
      _id,
      email: validateField.toLowerCase(),
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




export const checkStaffEmailPassword = async (username: string, password: string) => {

  try {
    if (!username || !password) {
      throw new Error('Username y contraseña son obligatorios');
    }

    const staff = await Staff.findOne({ username });
    if (!staff) {
      return null;
    }

    if (!bcrypt.compareSync(password, staff.password)) {
      return null
    }
    const { name, image, lastName, phone, _id, email, role  } = staff as IStaff;

    return {
      _id,
      email: email?.toLowerCase(),
      name, image, lastName, phone, username, role
    }
  } catch (error: any) {
    console.error('Error en autenticación:', error.message);
  }
}