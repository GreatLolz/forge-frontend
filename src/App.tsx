import { Route, Routes, useLocation } from "react-router";
import MainSidebar from "./components/MainSidebar";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import Landing from "./pages/Landing";
import type { UserDetails } from "./types/user";
import ApiClient from "./utils/api";
import Datasets from "./pages/Datasets";
import Header from "./components/Header";
import { PAGES } from "./types/app";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null)
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null)
  const location = useLocation()

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
      <div className="flex h-screen bg-neutral-950 text-neutral-300 w-full">
        {loggedIn && userDetails ? (
          <>
            <MainSidebar userDetails={userDetails}/>
            <div className="flex flex-col h-full w-full">
                <Header currentPage={
                    PAGES[location.pathname]
                }/>
                <div className="flex-1">
                    <Routes>
                        <Route index element={<Home />} />
                        <Route path="/datasets" element={<Datasets />} />
                    </Routes>
                </div>
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
