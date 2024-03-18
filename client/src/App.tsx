import "./App.css";
import { AuthenticationRoutes, GuardedRoutes, Header } from "./components";
import {
  Settings,
  Signup,
  Signin,
  About,
  Home,
  VerifyToken,
  NotFound,
  Listings,
  CreateListing,
} from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route element={<AuthenticationRoutes />}>
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<Signin />} />
        </Route>
        <Route path="/verify-account" element={<VerifyToken />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route element={<GuardedRoutes />}>
          <Route path="/settings" element={<Settings />} />
          <Route path="/listings">
            <Route path="" element={<Listings />} />
            <Route path="new" element={<CreateListing />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
