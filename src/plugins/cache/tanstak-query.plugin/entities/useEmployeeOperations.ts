import {
  useMutationCreateEmployee,
  useMutationDeleteEmployee,
  useQueryGetEmployees,
  useQueryGetEmployeeById,
  useMutationUpdateEmployee,
} from "../hooks/employee";
import {
  GetEmployeeById,
  GetEmployees,
  CreateEmployee,
  DeleteEmployee,
  UpdateEmployee,
} from "../interfaces/tanstak-query.employees";

export const useEmployeeOperations = () => {
  function queryGetAll(ActionEmployees: GetEmployees) {
    const queryEmployees = useQueryGetEmployees(ActionEmployees);

    return {
      getAll: queryEmployees.data?.employees,
      IsEmployeeLoading: queryEmployees.isLoading,
      totalEmployees: queryEmployees.data?.totalEmployees,
      isFetching: queryEmployees.isFetching,
    };
  }

  function queryGetById({ employeeId, getEmployeeById }: GetEmployeeById) {
    const getEmployee = useQueryGetEmployeeById({ employeeId, getEmployeeById });

    return {
      getById: getEmployee?.data,
      IsEmployeeLoading: getEmployee?.isLoading,
    };
  }

  function mutationCreate(actionEmployee: CreateEmployee) {
    const createEmployee = useMutationCreateEmployee(actionEmployee);

    return {
      create: createEmployee.mutate,
      IsCreateLoading: createEmployee.isLoading,
    };
  }

  function mutationUpdate(actionEmployee: UpdateEmployee) {
    const updateEmployee = useMutationUpdateEmployee(actionEmployee);

    return {
      update: updateEmployee.mutate,
      IsUpdateLoading: updateEmployee.isLoading,
    };
  }

  function mutationDelete(actionEmployee: DeleteEmployee) {
    const deleteEmployee = useMutationDeleteEmployee(actionEmployee);

    return {
      delete: deleteEmployee.mutate,
      IsDeleteLoading: deleteEmployee.isLoading,
    };
  }

  return {
    queryGetAll,
    queryGetById,
    mutationCreate,
    mutationDelete,
    mutationUpdate,
  };
};
