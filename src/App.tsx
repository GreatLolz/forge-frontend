import { Route, Routes } from "react-router";
import MainSidebar from "./components/MainSidebar";
import Datasets from "./pages/Datasets";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import Landing from "./pages/Landing";
import axios from "axios";
import type { UserDetails } from "./types/user";
import User from "./components/User";

function App() {
  const api_url = import.meta.env.VITE_API_URL || "/api/v1"

  const [loggedIn, setLoggedIn] = useState<boolean | null>(null)
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null)

  const getUser = () => {
    axios.get(`${api_url}/me`, { withCredentials: true })
      .then((response) => {
        console.log(`Logged in as ${response.data.email}`)
        setLoggedIn(true)
        setUserDetails(response.data)
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
            <User userDetails={userDetails} />
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
