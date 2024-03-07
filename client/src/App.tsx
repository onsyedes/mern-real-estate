import "./App.css";
import { GuardedRoutes, Header } from "./components";
import {
  Profile,
  Signup,
  Signin,
  About,
  Home,
  VerifyToken,
  NotFound,
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
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/verify-account" element={<VerifyToken />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route element={<GuardedRoutes />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
