import moment from "moment";
import Info from "./Info";
import WorkingRecord from "./WorkingRecord";

class EmployeeService {
  areOverlapping(employee1, employee2) {
    if (employee2.startDate < employee1.startDate) {
      return employee2.finishDate > employee1.startDate;
    } else {
      return employee2.startDate < employee1.finishDate;
    }
  }
  findAmountOfCommonDays(employee1, employee2) {
    const employee1StartDate = employee1.startDate;
    const dayFormat = "YYYY-MM-DD";
    const employee1FinishDate =
      employee1.finishDate === " null"
        ? moment(new Date()).format(dayFormat)
        : employee1.finishDate;
    const employee2StartDate = employee2.startDate;
    const employee2FinishDate =
      employee2.finishDate === " null"
        ? moment(new Date()).format(dayFormat)
        : employee2.finishDate;

    let start;
    let end;
    let daysTogether;
    if (employee1StartDate >= employee2StartDate) {
      start = new Date(employee1StartDate);
    } else {
      start = new Date(employee2StartDate);
    }
    if (employee2FinishDate > employee1FinishDate) {
      end = new Date(employee1FinishDate);
    } else {
      end = new Date(employee2FinishDate);
    }

    const diffTime = Math.abs(end - start);
    daysTogether = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const team = new Info(
      employee1.employeeId,
      employee2.employeeId,
      employee1.projectId,
      daysTogether
    );
    return team;
  }

  findWorkersWithLongestCommonPeriod(employeesRecords) {
    const allList = employeesRecords.slice();
    let mostLongTeam = null;
    for (let i = 0; i < allList.length; i++) {
      const currentEmployeeArray = allList[i].split(",");
      const currentEmployee = new WorkingRecord(
        currentEmployeeArray[0],
        currentEmployeeArray[1],
        currentEmployeeArray[2],
        currentEmployeeArray[3]
      );

      for (let j = i + 1; j < allList.length; j++) {
        const anotherEmployeeArray = allList[j].split(",");
        const anotherEmployee = new WorkingRecord(
          anotherEmployeeArray[0],
          anotherEmployeeArray[1],
          anotherEmployeeArray[2],
          anotherEmployeeArray[3]
        );

        if (
          currentEmployee.projectId === anotherEmployee.projectId &&
          employeeService.areOverlapping(currentEmployee, anotherEmployee)
        ) {
          let currentTeam = this.findAmountOfCommonDays(
            currentEmployee,
            anotherEmployee
          );
          if (mostLongTeam === null) {
            mostLongTeam = currentTeam;
          }
          if (mostLongTeam.daysTogether < currentTeam.daysTogether) {
            mostLongTeam = currentTeam;
          } else {
            continue;
          }
        }
      }
    }

    return mostLongTeam;
  }
}

const employeeService = new EmployeeService();

export default employeeService;
