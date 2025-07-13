import { Route, Routes } from "react-router";
import MainSidebar from "./components/MainSidebar";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import Landing from "./pages/Landing";
import type { UserDetails } from "./types/user";
import ApiClient from "./utils/api";
import Datasets from "./pages/datasets/Datasets";
import Header from "./components/Header";
import Create from "./pages/datasets/Create";

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

  const logout = async () => {
    setUserDetails(null)
    setLoggedIn(null)
    await ApiClient.getInstance().logout()
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <>
      <div className="flex h-screen bg-neutral-950 text-neutral-300 w-full">
        {loggedIn && userDetails ? (
          <>
            <MainSidebar userDetails={userDetails} onLogout={logout}/>
            <div className="flex flex-col h-full w-full">
                <Header />
                <div className="flex-1">
                    <Routes>
                        <Route index element={<Home />} />
                        <Route path="/datasets" element={<Datasets />} />
                        <Route path="/datasets/create" element={<Create />} />
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
