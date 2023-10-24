import React ,{ lazy, useState, FC } from 'react';

// React Router
import { Navigate, useRoutes  } from 'react-router-dom';

// Lazy Loading
const Container = lazy(() => import('../Containers/Container'));
const ContainerMarketing = lazy(() => import('../Containers/ContainerMarketing'));
const MarketingHome = lazy(() => import('../Pages/MarketingHome/MarketingHome'));
const ApplicationBrowse = lazy(() => import('../Pages/ApplicationBrowse/ApplicationBrowse'));
const BrowseApplicationDetail = lazy(() => import('../Pages/BrowseApplicationDetail/BrowseApplicationDetail'));
const AccountBank = lazy(() => import('../Pages/AccountBank/AccountBank'));
const ActivationRequests = lazy(() => import('../Pages/ActivationRequests/ActivationRequests'));
const ActiveCoupons = lazy(() => import('../Pages/ActiveCoupons/ActiveCoupons'));
const SalesReports = lazy(() => import('../Pages/SalesReports/SalesReports'));
const Error404 = lazy(() => import('../Pages/Error404/Error404'));
const Home = lazy(() => import('../Pages/Home/Home'));
const WhyUs = lazy(() => import('../Pages/WhyUs/WhyUs'));
const Profile = lazy(() => import('../Pages/Profile/Profile'));
const Features = lazy(() => import('../Pages/Features/Features'));
const Pricing = lazy(() => import('../Pages/Pricing/Pricing'));
const New = lazy(() => import('../Pages/NewDesign/New'));
const MarketPlace = lazy(() => import('../Pages/MarketPlace/Marketplace'));
const Login = lazy(() => import('../Pages/Login/login'));
const ProductDetails = lazy(() => import('../Pages/ProductDetails/ProductDetails'));
const Checkout = lazy(() => import('../Pages/CheckOut/Checkout'));
const ProductDetailsSub = lazy(() => import('../Pages/ProductDetailsSubiscrib/ProductDetailsSub'));
const CheckoutDetails = lazy(()=> import('../Pages/CheckOutDetails/CheckOutDetails'));
const SubscriptionsManagement = lazy(()=> import('../Pages/SubscriptionsManagement/SubscriptionsManagement'));

const MasterRoutes: FC  = () => {
    const [Path] = useState('/');
    const IsAuthenticated = !!localStorage.token;
    const checkAuthenticated = (element: React.ReactNode) => {
        return IsAuthenticated ? element : <Navigate to={'/'} replace />;
    };

    return useRoutes([
        {
            path: Path,
            element: <Container />,
            children: [
                { path: Path, element: <Home /> },
                { path: 'why-us', element: <WhyUs /> },
                { path: 'features', element: <Features /> },
                { path: 'pricing', element: <Pricing /> },
                { path: 'new', element: <New /> },
                { path: 'marketplace', element: <MarketPlace /> },
                { path: 'productDetailsSub/:id', element: <ProductDetailsSub /> },
                { path: 'productDetails/:id', element: <ProductDetails /> },
                {
                    path: 'checkOut/:pricingId/:id',
                    element: checkAuthenticated(<Checkout />)
                },
                {
                    path: 'checkoutDetails',
                    element: checkAuthenticated(<CheckoutDetails />)
                },
                {
                    path: 'subscriptionsManagement',
                    element: checkAuthenticated(<SubscriptionsManagement />)
                }
            ]
        },
        {
			path: Path,
            element: <ContainerMarketing />,
			children: [
				{ path: 'marketing-home', element: checkAuthenticated(<MarketingHome />) },
				{ path: 'application-browse', element: checkAuthenticated(<ApplicationBrowse />) },
				{ path: 'browse-application-detail/:id', element: checkAuthenticated(<BrowseApplicationDetail />) },
				{ path: 'sales-reports', element: checkAuthenticated(<SalesReports />) },
				{ path: 'active-coupons', element: checkAuthenticated(<ActiveCoupons />) },
				{ path: 'activation-requests', element: checkAuthenticated(<ActivationRequests />) },
				{ path: 'account-bank', element: checkAuthenticated(<AccountBank />) }
			]
		},
        {
			path: Path + 'login',
			children: [
				{ path: '', element: <Login /> }
			]
		},
        {
			path: Path + 'profile',
			children: [
				{ path: '', element: checkAuthenticated(<Profile />) }
			]
		},
        { path: Path + '*', element: <Error404 /> },
    ])
}

export default MasterRoutes;
