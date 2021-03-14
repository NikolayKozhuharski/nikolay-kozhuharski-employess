import React, { Component } from "react";
import DataGrid from "react-data-grid";
import employeeService from "../services/EmployeeService";


class TeamInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      employee1Id: null,
      employee2Id: null,
      projectId: null,
      daysTogether: null,
    };
  }
  processFile = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const arrayWithText = text.split("\r\n");

      const longestCommonPeriodResult = employeeService.findWorkersWithLongestCommonPeriod(
        arrayWithText
      );
      this.setState(longestCommonPeriodResult);
    };
    reader.readAsText(e.target.files[0]);
  };

  render = () => {
    const columns = [
      { key: "id1", name: "Employee ID #1" },
      { key: "id2", name: "Employee ID #2" },
      { key: "ProjectId", name: "ProjectId" },
      {
        key: "days",
        name: "Days worked",
      },
    ];
    const rows = [
      {
        id1: +this.state.employee1Id,
        id2: this.state.employee2Id,
        ProjectId: this.state.projectId,
        days: this.state.daysTogether,
      },
    ];

    return (
      <div>
        <input type="file" onChange={(e) => this.processFile(e)} />
        {this.state.daysTogether ? (
          <div style={{ height: 700, width: "200%" }}>
            <DataGrid rows={rows} columns={columns} />
          </div>
        ) : null}
      </div>
    );
  };
}

export default TeamInfo;
