import Home from "./pages/Home";
import { FocusProvider } from "./context/FocusContext";

export default function App() {
  return (
    <FocusProvider>
      {" "}
      <Home />{" "}
    </FocusProvider>
  );
}
