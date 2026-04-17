import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const Text = () => {
  return (
    <div>
      Testing a text to see if everything works
    </div>
  )
}

const AppRouter = () => {
  const location = useLocation();
  const getSubRouteKey = () => {
    if (location.pathname.startsWith('/dashboard/settings')) {
      return '/dashboard/settings'; 
    }
    return location.pathname;
  };
  return (
    <AnimatePresence mode="wait" initial={false}>
    <Routes location={location} key={getSubRouteKey()}>
        <Route index element={<Text/>} />
    </Routes>
    </AnimatePresence>
  )
}
export default AppRouter