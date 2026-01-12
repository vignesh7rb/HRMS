import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import MainLayout from "./components/layout/mainlayout";

import Attendance from "./pages/attendance/attendance";
import LeaveList from "./pages/leave/leavelist";
import EmployeeDirectory from "./pages/employees/EmployeeDirectory";
import OnboardingForm from "./pages/employees/OnboardingForm";
import ExitFormality from "./pages/employees/exit/ExitFormalities";



/* Lazy imports */
const Dashboard = lazy(() => import("./pages/dashboard/dashboard"));
const EmploymentDetails = lazy(() =>
  import("./pages/employees/EmploymentDetails")
);
const Login = lazy(() => import("./pages/auth/login"));

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>

            {/* Login */}
            <Route path="/" element={<Login />} />

            {/* Dashboard */}
            <Route
              path="/dashboard"
              element={
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              }
            />

            {/* Employee landing */}
            <Route
              path="/employee"
              element={
                <MainLayout>
                  <EmployeeDirectory />
                </MainLayout>
              }
            />

            {/* Employee Directory */}
            <Route
              path="/employee/directory"
              element={
                <MainLayout>
                  <EmployeeDirectory />
                </MainLayout>
              }
            />

            {/* Onboarding Form */}
            <Route
              path="/employee/onboarding"
              element={
                <MainLayout>
                  <OnboardingForm />
                </MainLayout>
              }
            />

            {/* Employment Details */}
            <Route
              path="/employee/employment-details"
              element={
                <MainLayout>
                  <EmploymentDetails />
                </MainLayout>
              }
            />

            {/* Attendance */}
            <Route
              path="/employee/attendance"
              element={
                <MainLayout>
                  <Attendance />
                </MainLayout>
              }
            />

            {/* Leave */}
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
      <ExitFormality /> {/* asset + finance + close employee */}
    </MainLayout>
  }
/>



          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
