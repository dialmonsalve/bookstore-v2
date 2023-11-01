import { useRouter } from "next/router";

import { useEmployeesStore, useFormStore, useUIStore } from "@/stores";

import { useEmployeeOperations } from "../cache/tanstak-query.plugin/entities/useEmployeeOperations";
import { httpEmployeePlugin } from '../http/axios.plugin/entities/httpEmployeePlugin';
import { httpAuthPlugin } from '../http/axios.plugin/entities/httpAuthPlugin';

export const useCreateEmployee = () =>
  useEmployeeOperations().mutationCreate({
    useUIStore,
    useEmployeesStore,
    useFormStore,
    registerUser: httpAuthPlugin().registerUser,
    useRouter,
  });

export const useDeleteEmployee = () =>
  useEmployeeOperations().mutationDelete({
    useUIStore,
    deleteEmployee: httpEmployeePlugin().remove,
  });

export const useUpdateEmployee = () =>
  useEmployeeOperations().mutationUpdate({
    useUIStore,
    useFormStore,
    updateEmployee: httpEmployeePlugin().update,
    useRouter,
  });

export const useGetAllEmployees = () =>
  useEmployeeOperations().queryGetAll({
    useEmployeesStore,
    useUIStore,
    getEmployees: httpEmployeePlugin().get,
  });

export const useGetEmployeeById = (employeeId: string) =>
  useEmployeeOperations().queryGetById({
    employeeId,
    getEmployeeById: httpEmployeePlugin().getById,
    useEmployeesStore
  });
