import { useNavigate } from "react-router-dom"
import { RiErrorWarningLine } from "react-icons/ri"

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950
                      flex items-center justify-center mb-4">
        <RiErrorWarningLine size={32} className="text-indigo-500" />
      </div>
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
        Page not found
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-xs">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/dashboard")}
        className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm
                   font-medium px-5 py-2.5 rounded-lg transition-colors"
      >
        Back to Dashboard
      </button>
    </div>
  )
}