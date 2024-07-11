import { useTheme } from './ThemeContext';

type SettingsDialogProps = {
    isOpen: boolean;
    onClose: () => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ isOpen, onClose }) => {
    const { darkMode, toggleDarkMode } = useTheme();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded-lg shadow-xl max-w-sm w-full relative">
                <h2 className="text-2xl font-bold mb-4">Settings</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Customize your experience with these settings. Changes will be applied immediately.
                </p>
                
                <div className="space-y-4">
                    <button 
                        className="w-full p-3 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded transition duration-300"
                        onClick={toggleDarkMode}
                    >
                        <h3 className="font-semibold">{darkMode ? 'Light' : 'Dark'} Mode</h3>
                        <p className="text-sm">Toggle {darkMode ? 'light' : 'dark'} mode on/off</p>
                    </button>
                </div>
                
                <button 
                    onClick={onClose}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default SettingsDialog;