import React from "react";
import NavBar from './components/NavBar'
import {ThemeProvider, useTheme} from './components/ThemeContext';
import AllEntries from './routes/AllEntries'
import NewEntry from './routes/NewEntry'
import EditEntry from './routes/EditEntry'
import { EntryProvider } from './utilities/globalContext'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function AppContent() {
  const { darkMode } = useTheme();

  return (
    <section className={`${darkMode ? 'dark' : ''} min-h-screen bg-white dark:bg-gray-800 text-black dark:text-white`}>
      <Router>
        <EntryProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<AllEntries/>}></Route>
            <Route path="create" element={<NewEntry/>}></Route>
            <Route path="edit/:id" element={<EditEntry/>}></Route>
          </Routes>
        </EntryProvider>
      </Router>
    </section>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
