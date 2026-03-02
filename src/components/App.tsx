import { Route, Routes } from "react-router";

import { LoginPage } from "@/pages/login-page";
import { TablePage } from "@/pages/table-page";
import { ProtectedRoute } from "@/routes";

export default function App() {
  return (
    <div style={{ width: "100%", height: "100vh", backgroundColor: 'var(--color-background)' }}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<TablePage />} />
        </Route>
      </Routes>
    </div>
  );
}
