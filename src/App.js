import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Import BrowserRouter directly
import { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import MainLayout from './components/layout/mainlayout';
import EmployeeDirectory from "./pages/employees/EmployeeDirectory";



const Dashboard = lazy(() => import("./pages/dashboard/dashboard"));
const OnBoardingForm = lazy(() => import("./pages/employees/employeedetail"));

const Login = lazy(() => import("./pages/auth/login"));

function App() {
  return (
    <Provider store={store}>
      <div className="">
        <BrowserRouter> {/* Use BrowserRouter here instead of Router */}
          <Suspense fallback={<div className="">Loading...</div>}>
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

  {/* Employee Directory */}
  <Route
    path="/employee/directory"
    element={
      <MainLayout>
        <EmployeeDirectory />
      </MainLayout>
    }
  />

  {/* Employee Onboarding */}
  <Route
    path="/employee/onboarding"
    element={
      <MainLayout>
        <OnBoardingForm />
      </MainLayout>
    }
  />

</Routes>

          </Suspense>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;