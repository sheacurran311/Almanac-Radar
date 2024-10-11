import React from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { HomeIcon, UserGroupIcon, GiftIcon, MegaphoneIcon, ChartBarIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { tenantId } = useParams<{ tenantId: string }>();

  const navigation: NavItem[] = [
    { name: 'Dashboard', href: `/dashboard/${tenantId}`, icon: HomeIcon },
    { name: 'Customers', href: `/dashboard/${tenantId}/customers`, icon: UserGroupIcon },
    { name: 'Rewards', href: `/dashboard/${tenantId}/rewards`, icon: GiftIcon },
    { name: 'Campaigns', href: `/dashboard/${tenantId}/campaigns`, icon: MegaphoneIcon },
    { name: 'Analytics', href: `/dashboard/${tenantId}/analytics`, icon: ChartBarIcon },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-indigo-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300"
                  alt="Your Company"
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`${
                        location.pathname === item.href
                          ? 'bg-indigo-700 text-white'
                          : 'text-white hover:bg-indigo-500 hover:bg-opacity-75'
                      } rounded-md px-3 py-2 text-sm font-medium`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  onClick={handleLogout}
                  className="rounded-full bg-indigo-600 p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                >
                  <span className="sr-only">Logout</span>
                  <UserCircleIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
};

export default Layout;