import NavLinks from '@/app/ui/dashboard/nav-links';
import { PowerIcon, StarIcon } from '@heroicons/react/24/outline'; 


export default function HeadNav() {
  return (
    <div className="flex h-full items-center justify-between px-2 py-2 md:px-2">
      <div className="flex items-center space-x-4"> 
        <img src="/logo.svg" alt="Logo" className="w-12 h-12 rounded-full bg-blue-600" /> 
        <NavLinks /> 
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input type="text" placeholder="Search" className="pl-8 pr-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300" />
          <StarIcon className="absolute top-1/2 left-2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
        <form>
          <button className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-50 text-gray-700 hover:bg-sky-100 hover:text-blue-600">
            <PowerIcon className="w-6" />
          </button>
        </form>
      </div>
    </div>
  );
}
