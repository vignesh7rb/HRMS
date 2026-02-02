import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import store from "./store/store";

/* ================= LAYOUTS ================= */
import MainLayout from "./components/layout/mainlayout";
import HRLayout from "./HR/layout/HRLayout";

/* ================= AUTH ================= */
import Login from "./pages/auth/login";
import ProtectedRoute from "./pages/auth/ProtectedRoute";

/* ================= COMMON ================= */
import MyProfile from "./components/MyProfile/MyProfile";

/* ================= ADMIN ================= */
import Payrolls from "./pages/payroll-admin/Payrolll";
import AssetManagement from "./pages/AssetManagement/AssetManagement";
import AdminExpenseFinance from "./pages/ExpenseFinance/AdminExpenseFinance";
import EmployeeDirectory from "./pages/employees/EmployeeDirectory";
import Attendance from "./pages/attendance/attendance";
import LeaveList from "./pages/leave/leavelist";
import OnboardingForm from "./pages/employees/OnboardingForm";
import ExitFormality from "./pages/employees/exit/ExitFormalities";

/* ================= HR ================= */
import HRDashboard from "./HR/pages/Dashboard/HRDashboard";
import EmployeeListHR from "./HR/pages/EmployeeManagement/EmployeeList";
import LeaveDashboard from "./HR/pages/LeaveManagement/LeaveDashboard";
import AttendanceHR from "./HR/pages/Attendence/Attendence";
import Onboarding from "./HR/pages/Onboarding/Onboarding";
import TaskManagement from "./HR/pages/TaskManagement/TaskManagement";
import ExitRequests from "./HR/pages/ExitManagement/ExitRequests";
import Payroll from "./HR/pages/Payroll/Payroll";
import Reports from "./HR/pages/Reports/Reports";

const Dashboard = lazy(() => import("./pages/dashboard/dashboard"));

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>

            {/* ============ LOGIN ============ */}
            <Route path="/login" element={<Login />} />

            {/* ============ ADMIN PROFILE ============ */}
            <Route
              path="/my-profile"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <MainLayout>
                    <MyProfile />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            {/* ============ ADMIN ============ */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/employees"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <MainLayout>
                    <EmployeeDirectory />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/attendance"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <MainLayout>
                    <Attendance />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/leave"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <MainLayout>
                    <LeaveList />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/onboarding"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <MainLayout>
                    <OnboardingForm />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/exit"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <MainLayout>
                    <ExitFormality />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/payrolll"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <MainLayout>
                    <Payrolls />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/assets"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <MainLayout>
                    <AssetManagement />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/expense"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <MainLayout>
                    <AdminExpenseFinance />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            {/* ============ HR PORTAL ============ */}
            <Route
              path="/hr"
              element={
                <ProtectedRoute allowedRoles={["HR"]}>
                  <HRLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<HRDashboard />} />
              <Route path="employees" element={<EmployeeListHR />} />
              <Route path="leave" element={<LeaveDashboard />} />
              <Route path="attendance" element={<AttendanceHR />} />
              <Route path="onboarding" element={<Onboarding />} />
              <Route path="exit" element={<ExitRequests />} />
              <Route path="tasks" element={<TaskManagement />} />
              <Route path="payroll" element={<Payroll />} />
              <Route path="reports" element={<Reports />} />

              {/* ✅ HR PROFILE (SAME PAGE, HR LAYOUT) */}
              <Route path="my-profile" element={<MyProfile />} />
            </Route>

            {/* ============ FALLBACK ============ */}
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/login" />} />

          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
