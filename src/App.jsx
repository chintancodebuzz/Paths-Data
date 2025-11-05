// src/App.jsx
import "./styles/global.css";
import "./styles/layout.css";
import "./styles/common.css";
import "./styles/buttons.css";
import "./styles/forms.css";
import "./styles/tables.css";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <div className="layouts">
      <AppRoutes />
    </div>
  );
}
