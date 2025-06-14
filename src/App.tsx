import { Route, Routes } from "react-router";
import MainSidebar from "./components/MainSidebar";
import Datasets from "./pages/Datasets";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import Landing from "./pages/Landing";
import axios from "axios";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null)

  const getUser = () => {
    axios.get(`/api/v1/me`, { withCredentials: true })
      .then((response) => {
        console.log(`Logged in as ${response.data.email}`)
        setLoggedIn(true)
      })
      .catch(() => {
        console.log('Session invalid, logging out...')
        setLoggedIn(false)
      })
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <>
      <div className="flex h-screen bg-neutral-950 text-neutral-300">
        {loggedIn === true ? (
          <>
            <MainSidebar />
            <div className="flex-1">
              <Routes>
                <Route index element={<Home />} />
                <Route path="/datasets" element={<Datasets />} />
              </Routes>
            </div>
          </>
        ) : loggedIn === false ? (
          <Landing />
        ) : (
          <></>
        )}
      </div>
    </>
  )
}

export default App
