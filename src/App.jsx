import { BrowserRouter, Routes, Route } from "react-router-dom";

import ResetPage from "./domains/auth/pages/ResetPage";
import ChangePasswordPage from "./domains/auth/pages/Change-Password-Page";
import CreateTicketAgentPage from './domains/admin/pages/Create-Ticket-Agent-Page';

import Login from "./domains/auth/components/Login/Login";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/reset-password" element={<ResetPage />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/change-password" element={<ChangePasswordPage />} />
        <Route path="/admin/ticket-agent" element={<CreateTicketAgentPage />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
