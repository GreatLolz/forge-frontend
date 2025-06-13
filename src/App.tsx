import MainSidebar from "./components/MainSidebar";
import Datasets from "./pages/Datasets";

function App() {

  return (
    <>
      <div className="flex h-screen w-full bg-neutral-950 text-neutral-300">
        <MainSidebar />
        <Datasets />
      </div>
    </>
  )
}

export default App
