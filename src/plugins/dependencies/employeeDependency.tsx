import { useEmployeesStore, useFormStore, useUIStore } from "@/stores";
import { useEmployeeOperations } from "../cache/tanstak-query.plugin/entities/useEmployeeOperations";

import { apiEmployee, userAuth } from "@/api";
import { useRouter } from "next/router";

export const useCreateEmployee = () =>
  useEmployeeOperations().mutationCreate({
    useUIStore,
    useEmployeesStore,
    useFormStore,
    registerUser: userAuth.registerUser,
    useRouter,
  });

export const useDeleteEmployee = () =>
  useEmployeeOperations().mutationDelete({
    useUIStore,
    deleteEmployee: apiEmployee.deleteEmployee,
  });

export const useUpdateEmployee = () =>
  useEmployeeOperations().mutationUpdate({
    useUIStore,
    useFormStore,
    updateEmployee: apiEmployee.updateEmployee,
    useRouter,
  });

export const useGetAllEmployees = () =>
  useEmployeeOperations().queryGetAll({
    useEmployeesStore,
    useUIStore,
    getEmployees: apiEmployee.getEmployees,
  });

export const useGetEmployeeById = (employeeId: string) =>
  useEmployeeOperations().queryGetById({
    employeeId,
    getEmployeeById: apiEmployee.getEmployeeById,
  });
