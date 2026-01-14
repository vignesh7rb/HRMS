import StatusBadge from "../../components/StatusBadge";
import Table from "../../components/Table";

const ExitRequests = () => {
  return (
    <>
      <h1>Exit Requests</h1>
      <Table columns={["Employee", "Last Working Day", "Status", "Action"]}>
        <tr>
          <td>John Doe</td>
          <td>31 Jan 2026</td>
          <td><StatusBadge status="Pending" /></td>
          <td>View</td>
        </tr>
      </Table>
    </>
  );
};

export default ExitRequests;
