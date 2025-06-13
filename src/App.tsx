import { Route, Routes } from "react-router";
import MainSidebar from "./components/MainSidebar";
import Datasets from "./pages/Datasets";

function App() {

  return (
    <>
      <div className="flex h-screen w-full bg-neutral-950 text-neutral-300">
        <MainSidebar />
        <Routes>
          <Route index element={<></>} />
          <Route path="/datasets" element={<Datasets />} />
        </Routes>
      </div>
    </>
  )
}

export default App
