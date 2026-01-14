import Table from "../../components/Table";

const EmployeeList = () => {
  return (
    <>
      <h1>Employee Directory</h1>
      <Table columns={["ID", "Name", "Department", "Status"]}>
        <tr>
          <td>EMP001</td>
          <td>John Doe</td>
          <td>Engineering</td>
          <td>Active</td>
        </tr>
      </Table>
    </>
  );
};

export default EmployeeList;
