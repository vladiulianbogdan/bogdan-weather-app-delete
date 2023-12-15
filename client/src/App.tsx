import { Route, Routes, Outlet, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import WeatherApp from "./pages/WeatherApp";
import NotFound from "./pages/NotFound";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider } from "@material-tailwind/react";

function App() {
  const { pathname } = useLocation();

  return (
    <ThemeProvider>
      <AnimatePresence>
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex h-full justify-center items-center">
                <div className="max-h-[48rem] max-w-6xl h-full w-full p-14">
                  <motion.div
                    key={pathname}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
                    className="h-full w-full"
                  >
                    <Outlet />
                  </motion.div>
                </div>
              </div>
            }
          >
            <Route index element={<Home />} />
            <Route path="app/:location?" element={<WeatherApp />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;
