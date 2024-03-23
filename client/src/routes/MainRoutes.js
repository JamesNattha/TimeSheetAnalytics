import { lazy } from 'react';
import { useNavigate, Routes, Route } from 'react-router';
// project import
import MainLayout from 'layout/MainLayout';
import CommonLayout from 'layout/CommonLayout';
import Loadable from 'components/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

import useAuth from 'hooks/useAuth';
// import TimeSheet from 'pages/time-sheet';

// pages routing
const MaintenanceError500 = Loadable(lazy(() => import('pages/maintenance/500')));
const MaintenanceError403 = Loadable(lazy(() => import('pages/maintenance/403')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// render - time sheet
const TimeSheet = Loadable(lazy(() => import('pages/time-sheet')));
const Reports = Loadable(lazy(() => import('pages/report')));

///// render - Customer and Work

// render - applications
const AppCustomerList = Loadable(lazy(() => import('pages/apps/WorkOnHand/list')));

const Setting = Loadable(lazy(() => import('pages/setting/index')));

const RoleInviteRegister = Loadable(lazy(() => import('sections/apps/setting/role')));
const TableMonday = Loadable(lazy(() => import('pages/table-monday')));
const Customer = Loadable(lazy(() => import('pages/apps/customer_ev2/list')));
const Calendar = Loadable(lazy(() => import('pages/apps/calendar')));
const Monday = Loadable(lazy(() => import('pages/Monday')));
const Work = Loadable(lazy(() => import('pages/apps/work_fetch/list')));

// render - company
const Company = Loadable(lazy(() => import('pages/Company')));
const Departments = Loadable(lazy(() => import('pages/Company/Tab-page/department')));
const Positions = Loadable(lazy(() => import('pages/Company/Tab-page/position')));
const Groups = Loadable(lazy(() => import('pages/Company/Tab-page/group')));

// render - profile
const Profile = Loadable(lazy(() => import('pages/profile/profile')));
const Profit = Loadable(lazy(() => import('pages/profile/material-profile/profile')));
const Myaccount = Loadable(lazy(() => import('pages/profile/material-profile/password')));

//---------------------------------Customer--------------------------------------//
const Client = Loadable(lazy(() => import('pages/apps/Taskplanning/index_client')));
const Project = Loadable(lazy(() => import('pages/apps/Taskplanning/index_project')));
const Personal = Loadable(lazy(() => import('pages/apps/Taskplanning/index_taskplanning')));
const Overall = Loadable(lazy(() => import('pages/apps/Taskplanning/index_taskplanning_overall')));

//-------------------------------------Dashboard----------------------------------///
const Home = Loadable(lazy(() => import('pages/Home')));

//---------------------------------------Report------------------------------------//
const TestReport = Loadable(lazy(() => import('pages/report/material-page/project-report')));

// ==============================|| MAIN ROUTING ||============================== //

const GuardedRoute = ({ allowedRoles, path, element }) => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Replace with your actual user retrieval logic
  if (user && allowedRoles.includes(user.role)) {
    // navigate(path);
    return element;
  } else {
    navigate('/maintenance/403');
  }
};

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: 'sample-page',
          element: <SamplePage />
        },
        {
          path: 'home',
          element: <Home />
        },
        {
          path: 'client',
          // element: <Client />
          element: (
            <GuardedRoute
              allowedRoles={['manager', 'management', 'super_admin']} // Replace with roles that can access this route
              path="/client"
              element={<Client />}
            />
          )
        },
        {
          path: 'project',
          element: (
            <GuardedRoute
              allowedRoles={['manager', 'management', 'super_admin']} // Replace with roles that can access this route
              path="/project"
              element={<Project />}
            />
          )
          // element: <Project />
        },
        {
          path: 'taskplanning',
          children: [
            {
              path: 'personal',
              element: <Personal />
            },
            {
              path: 'overall',
              element: <Overall />
            }
          ]
        },

        {
          path: 'timesheet',
          element: <TimeSheet />
        },
        // {
        //   path: 'test-report',
        //   element: <TestReport />
        // },
        {
          path: 'reports',
          element: <TestReport />
          // element: <Reports />
          // element: (
          //   <GuardedRoute
          //     allowedRoles={['manager', 'management', 'super_admin']} // Replace with roles that can access this route
          //     path="/reports"
          //     element={<Reports />}
          //   />
          // ),

          // children: [
          //   {
          //     path: 'performance',
          //     element: (
          //       <GuardedRoute
          //         allowedRoles={['manager', 'management', 'super_admin']} // Replace with roles that can access this route
          //         path="performance"
          //         element={<TimesheetReport />}
          //       />
          //     )
          //   },
          //   {
          //     path: 'projects',
          //     element: (
          //       <GuardedRoute
          //         allowedRoles={['manager', 'management', 'super_admin']} // Replace with roles that can access this route
          //         path="projects"
          //         element={<ProjectReport />}
          //       />
          //     )
          //   }
          // ]
        },

        {
          path: 'profile',
          element: <Profile />,
          children: [
            {
              path: 'profile',
              element: <Profit />
            },
            {
              path: 'password',
              element: <Myaccount />
            }
          ]
        },
        {
          path: 'company',
          // element: <Company />,
          element: (
            <GuardedRoute
              allowedRoles={['admin', 'super_admin']} // Replace with roles that can access this route
              path="/company"
              element={<Company />}
            />
          ),
          children: [
            {
              path: 'departments',
              // element: <Departments />
              element: (
                <GuardedRoute
                  allowedRoles={['admin', 'super_admin']} // Replace with roles that can access this route
                  path="/departments"
                  element={<Departments />}
                />
              )
            },
            {
              path: 'positions',
              // element: <Positions />
              element: (
                <GuardedRoute
                  allowedRoles={['admin', 'super_admin']} // Replace with roles that can access this route
                  path="/positions"
                  element={<Positions />}
                />
              )
            },
            {
              path: 'groups',
              // element: <Groups />
              element: (
                <GuardedRoute
                  allowedRoles={['admin', 'super_admin']} // Replace with roles that can access this route
                  path="/groups"
                  element={<Groups />}
                />
              )
            }
          ]
        },
        {
          path: 'role-invite-register',
          // element: <RoleInviteRegister />
          element: (
            <GuardedRoute
              allowedRoles={['admin', 'super_admin']} // Replace with roles that can access this route
              path="/role-invite-register"
              element={<RoleInviteRegister />}
            />
          )
        },
        {
          path: 'calendar',
          element: <Calendar />
        },
        {
          path: 'table-monday',
          element: <TableMonday />
        },
        {
          path: 'monday',
          element: <Monday />
        }
      ]
    },
    {
      path: '/maintenance',
      element: <CommonLayout />,
      children: [
        {
          path: '500',
          element: <MaintenanceError500 />
        },
        {
          path: '403',
          element: <MaintenanceError403 />
        }
      ]
    }
  ]
};

export default MainRoutes;
