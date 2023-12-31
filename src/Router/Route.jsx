import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Home from '../pages/Home/Home';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import Login from '../pages/Login/Login';
import DonationRequests from '../pages/DonationRequests/DonationRequests';
import Blog from '../pages/Blog/Blog';
import Fundings from '../pages/Fundings/Fundings';
import Register from '../pages/Register/Register';
import SearchPage from '../pages/SearchPage/SearchPage';
import Dashboard from '../layout/Dashboard';
import DefaultView from '../pages/Dashboard/DefaultView/DefaultView';
import Profile from '../pages/Dashboard/Profile/Profile';
import UpdateProfile from '../pages/Dashboard/Profile/UpdateProfile';
import MyDonationRequests from '../pages/Dashboard/MyDonationRequests/MyDonationRequests';
import CreateDonationReq from '../pages/Dashboard/CreateDonationReq/CreateDonationReq';
import MyDonationRequestsUpdate from '../pages/Dashboard/MyDonationRequests/MyDonationRequestsUpdate';
import DonationDetails from '../pages/Dashboard/MyDonationRequests/DonationDetails';
import AllUsers from '../pages/Dashboard/AllUsers/AllUsers';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import AllDonationRequest from '../pages/Dashboard/AllDonationRequest/AllDonationRequest';
import ContentManagement from '../pages/Dashboard/ContentManagement/ContentManagement';
import AddBlog from '../pages/Dashboard/ContentManagement/AddBlog';

const myRoute = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '',
        element: <Home></Home>,
      },

      {
        path: '/donation-requests',
        element: <DonationRequests></DonationRequests>,
      },

      {
        path: '/blog',
        element: <Blog></Blog>,
      },
      {
        path: '/fundings',
        element: (
          <PrivateRoute>
            <Fundings></Fundings>
          </PrivateRoute>
        ),
      },
      {
        path: '/register',
        element: <Register></Register>,
      },

      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/search-page',
        element: <SearchPage></SearchPage>,
      },
    ],
  },

  //!Dashboard Section

  {
    path: '',
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      //! donor (user) routes
      {
        path: 'dashboard',
        element: <DefaultView></DefaultView>,
      },

      {
        path: '/dashboard/profile',
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
        loader: () => fetch('https://blood-aid-server.vercel.app/users'),
      },

      {
        path: '/dashboard/my-donation-requests',
        element: (
          <PrivateRoute>
            <MyDonationRequests></MyDonationRequests>
          </PrivateRoute>
        ),
        // loader: () =>
        //   fetch(
        //     'https://blood-aid-server.vercel.app/dashboard/create-donation-request'
        //   ),
      },
      {
        path: '/dashboard/my-donation-requests-update/:id',
        element: (
          <PrivateRoute>
            <MyDonationRequestsUpdate></MyDonationRequestsUpdate>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://blood-aid-server.vercel.app/dashboard/my-donation-requests-update/${params.id}`
          ),
      },

      {
        path: '/dashboard/create-donation-request',
        element: (
          <PrivateRoute>
            <CreateDonationReq></CreateDonationReq>
          </PrivateRoute>
        ),
        loader: () => fetch('https://blood-aid-server.vercel.app/users'),
      },

      {
        path: '/dashboard/update-profile/:id',
        element: (
          <PrivateRoute>
            <UpdateProfile></UpdateProfile>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://blood-aid-server.vercel.app/dashboard/update-profile/${params.id}`
          ),
      },
      {
        path: '/dashboard/donation-details/:id',
        element: (
          <PrivateRoute>
            <DonationDetails></DonationDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://blood-aid-server.vercel.app/dashboard/my-donation-requests-update/${params.id}`
          ),
      },

      // {
      //   path: 'cart',
      //   element: <Cart></Cart>,
      // },
      // {
      //   path: 'payment',
      //   element: <Payment></Payment>,
      // },
      // {
      //   path: 'paymentHistory',
      //   element: <PaymentHistory></PaymentHistory>,
      // },

      //! admin only routes

      //all users (admin)
      {
        path: '/dashboard/all-users',
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },

      // all donation reqs (admin)
      {
        path: '/dashboard/all-blood-donation-request',
        element: <AllDonationRequest></AllDonationRequest>,
      },

      // content management page (admin)
      {
        path: '/dashboard/content-management',
        element: <ContentManagement></ContentManagement>,
      },

      // add blog page (admin)
      {
        path: '/dashboard/content-management/add-blog',
        element: <AddBlog></AddBlog>,
      },

      //! volunteer only routes
    ],
  },
]);

export default myRoute;
