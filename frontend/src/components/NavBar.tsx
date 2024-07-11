import {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom'
import SettingsDialog from './SettingsDialog';


export default function NavBar(){
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    return(
      <nav className="flex justify-center gap-5">
        <NavLink className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white" to={'/'}>All Entries</NavLink>
        <NavLink className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white" to={'/create'}>New Entry</NavLink>
        <button onClick={() => setIsSettingsOpen(true)} className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white">
        Settings
        </button>
        <SettingsDialog 
                isOpen={isSettingsOpen} 
                onClose={() => setIsSettingsOpen(false)}
        />
      </nav>
    )
}