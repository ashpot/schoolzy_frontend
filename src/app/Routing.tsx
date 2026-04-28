import { LandingPage } from "@/features/landing";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router";
import { AuthLayout, PublicLayout } from "./layouts";
import { SigninPage, SignupPage } from "@/features/auth";


const AppRouter = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        {/* public */}
        <Route path="/" element={<PublicLayout />}>
            <Route index element={<LandingPage/>}/>
        </Route>

      <Route element={<AuthLayout />}>
          <Route path="signup" element={<SignupPage/>}/>
          <Route path="signin" element={<SigninPage/>}/>
      </Route>
        
    </Routes>
    </AnimatePresence>
  )
}
export default AppRouter