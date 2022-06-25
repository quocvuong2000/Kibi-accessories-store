import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme/theme";
import "./app.module.scss";
import AppLayout from "./layout/AppLayout";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppLayout />
    </ThemeProvider>
  );
}

export default App;
