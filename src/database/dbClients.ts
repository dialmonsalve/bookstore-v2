import { Client } from "@/models";
import { db } from "."
import { IClient } from "@/types";

export const oAuthDbClient = async (oAuthEmail: string, oAuthName: string) => {
  await db.connect();
  const client = await Client.findOne({ email: oAuthEmail });

  if (client) {
    await db.disconnect();
    const { _id, name, email, lastName, phone, } = client as IClient
    return { _id, name, email, lastName, phone }
  }

  const newClient = new Client({ email: oAuthEmail, name: oAuthName, password: '@', lastName: '', phone: '', isAccountValidated: true })

  await newClient.save();
  await db.disconnect();

  const { _id, name, lastName, email, phone } = newClient as IClient;

  return { _id, name, lastName, email, phone };

}