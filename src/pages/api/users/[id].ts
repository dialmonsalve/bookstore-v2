import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IEmployee } from '@/types';
import { Employee } from '@/models';


type Data =
  | { message: string }
  | IEmployee

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  const { id } = req.query;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: `el id ${id} no es válido` })
  }

  switch (req.method) {
    case 'PUT':
      return updateEmployee(req, res)
    case 'GET':
      return getEmployee(req, res)

    default:
      return res.status(400).json({ message: 'Método no existe' })
  }
};

const updateEmployee = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const { id } = req.query;

  await db.connect();

  const employeeToUpdate = await Employee.findById(id);

  if (!employeeToUpdate) {
    await db.disconnect();
    return res.status(400).json({ message: `No usuario con el id ${id}` })
  }





  const {
    email = employeeToUpdate.email,
    image = employeeToUpdate.image,
    lastName = employeeToUpdate.lastName,
    name = employeeToUpdate.name,
    phone = employeeToUpdate.phone,
    role = employeeToUpdate.role,
    username = employeeToUpdate.username,
  } = req.body;

  const newEmployees = {
    email, image, lastName, name,
    phone, role, username,
  }

  try {

    const updateEmployee = await Employee.findByIdAndUpdate(id, newEmployees, { runValidators: true, new: true })
    res.status(200).json(updateEmployee!)

  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.errors.status.message })
  } finally {
    await db.disconnect();
  }

}
const getEmployee = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();
	const employee = await Employee.findById(id)
	await db.disconnect();

  if (!employee) {
		return res.status(400).json({ message: `No hay usuario con el id ${id}` })
	}

  res.status(200).json(employee)
}