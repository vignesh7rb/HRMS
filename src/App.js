import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import MainLayout from "./components/layout/mainlayout";

import HRLayout from "./HR/layout/HRLayout";

/* ================= EMPLOYEE PAGES ================= */
import Attendance from "./pages/attendance/attendance";
import LeaveList from "./pages/leave/leavelist";
import EmployeeDirectory from "./pages/employees/EmployeeDirectory";
import OnboardingForm from "./pages/employees/OnboardingForm";
import ExitFormality from "./pages/employees/exit/ExitFormalities";




/* ================= HR PAGES ================= */


import HRDashboard from "./HR/pages/Dashboard/HRDashboard";
import EmployeeListHR from "./HR/pages/EmployeeManagement/EmployeeList";
import LeaveDashboard from "./HR/pages/LeaveManagement/LeaveDashboard";
import AttendanceHR from "./HR/pages/Attendence/Attendence";
import Onboarding from "./HR/pages/Onboarding/Onboarding";
import TaskManagement from "./HR/pages/TaskManagement/TaskManagement";
import ExitRequests from "./HR/pages/ExitManagement/ExitRequests";
import Payroll from "./HR/pages/Payroll/Payroll";
import Reports from "./HR/pages/Reports/Reports";

/* ================= LAZY LOADED PAGES ================= */
const Dashboard = lazy(() => import("./pages/dashboard/dashboard"));
const EmploymentDetails = lazy(() =>
  import("./pages/employees/EmploymentDetails")
);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>

            {/* ================= ADMIN ROUTES ================= */}
            <Route
              path="/dashboard"
              element={
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              }
            />

            {/* ================= EMPLOYEE ROUTES ================= */}
            <Route
              path="/employee"
              element={
                <MainLayout>
                  <EmployeeDirectory />
                </MainLayout>
              }
            />

            <Route
              path="/employee/directory"
              element={
                <MainLayout>
                  <EmployeeDirectory />
                </MainLayout>
              }
            />

            <Route
              path="/employee/onboarding"
              element={
                <MainLayout>
                  <OnboardingForm />
                </MainLayout>
              }
            />

            <Route
              path="/employee/employment-details"
              element={
                <MainLayout>
                  <EmploymentDetails />
                </MainLayout>
              }
            />

            <Route
              path="/employee/attendance"
              element={
                <MainLayout>
                  <Attendance />
                </MainLayout>
              }
            />

            <Route
              path="/employee/leave"
              element={
                <MainLayout>
                  <LeaveList />
                </MainLayout>
              }
            />

            <Route
              path="/employee/exit"
              element={
                <MainLayout>
                  <ExitFormality />
                </MainLayout>
              }
            />

            {/* ================= HR ROUTES ================= */}
<Route path="/hr" element={<HRLayout />}>
  <Route path="dashboard" element={<HRDashboard />} />
  <Route path="employees" element={<EmployeeListHR />} />
  <Route path="leave" element={<LeaveDashboard />} />
  <Route path="attendance" element={<AttendanceHR />} />
  <Route path="onboarding" element={<Onboarding />} />
  <Route path="exit" element={<ExitRequests />} />
  <Route path="tasks" element={<TaskManagement/>}/>
  <Route path="payroll" element={<Payroll />} />
  <Route path="reports" element={<Reports />} />
</Route>


          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
