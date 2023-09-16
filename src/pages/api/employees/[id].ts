import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IEmployee } from '@/types';
import { Employee, Transaction } from '@/models';

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
    case 'DELETE':
      return deleteEmployee(req, res)

    default:
      return res.status(400).json({ message: 'Método no existe' })
  }
};

const getEmployee = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();
  const employee = await Employee.findById(id).select('-password -createdAt -updatedAt -__v')
    .lean();
  await db.disconnect();

  if (!employee) {
    return res.status(400).json({ message: `No hay usuario con el id ${id}` })
  }

  res.status(200).json(employee as IEmployee)

}
const deleteEmployee = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const { id } = req.query;

  await db.connect();

  try {
    const employee = await Employee.findById(id);
    
    const hasTransactions = await Transaction.exists({ Employee: employee._id });

    if (hasTransactions) {
      employee.deleted = true;
      await employee.save();
    } else {
      await employee.deleteOne();
    }

    await db.disconnect();

    if (!employee) {
      return res.status(400).json({ message: `No hay usuario con el id ${id}` })
    }

    res.status(200).json({ message: `Usuario con id: ${id} eliminado correctamente` })
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.errors.status.message })
  }
  finally {
    await db.disconnect();
  }

}

const updateEmployee = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const { id } = req.query;
  const { username } = req.body;

  await db.connect();

  try {

    const [employeeToUpdate, existeUsername] = await Promise.all([
      Employee.findById(id),
      Employee.findOne({ username }),
    ]);

    if (!employeeToUpdate) {
      return res.status(400).json({ message: `No existe un usuario con el id ${id}` })
    }

    if (existeUsername && existeUsername._id.toString() !== id) {
      return res.status(400).json({ message: "Usuario ya existe con ese username" })
    }

    const {
      email = employeeToUpdate.email,
      image = employeeToUpdate.image,
      lastName = employeeToUpdate.lastName,
      name = employeeToUpdate.name,
      phone = employeeToUpdate.phone,
      role = employeeToUpdate.role,
    } = req.body;

    const newEmployees = {
      email, image, lastName, name,
      phone, role, username,
    }

    const updateEmployee = await Employee.findByIdAndUpdate(id, newEmployees, { runValidators: true, new: true })
    res.status(200).json(updateEmployee!)

  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.errors.status.message })
  } finally {
    await db.disconnect();
  }
}