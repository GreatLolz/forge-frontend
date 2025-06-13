import { Route, Routes } from "react-router";
import MainSidebar from "./components/MainSidebar";
import Datasets from "./pages/Datasets";
import Home from "./pages/Home";

function App() {

  return (
    <>
      <div className="flex h-screen bg-neutral-950 text-neutral-300">
        <MainSidebar />
        <div className="flex-1">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/datasets" element={<Datasets />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
