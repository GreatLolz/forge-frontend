import { Route, Routes } from "react-router";
import MainSidebar from "./components/MainSidebar";
import Datasets from "./pages/Datasets";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import Landing from "./pages/Landing";
import type { UserDetails } from "./types/user";
import User from "./components/User";
import ApiClient from "./utils/api";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null)
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null)

  const getUser = async () => {
    try {
      const user = await ApiClient.getInstance().getUser()
      setUserDetails(user)
      setLoggedIn(true)
    } catch (error) {
      console.error(error)
      setLoggedIn(false)
    }
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
