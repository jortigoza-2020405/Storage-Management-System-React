import Home from './src/pages/Home'
import Register from './src/pages/Register'
import Login from './src/pages/Login'
import NotFoundPage from './src/pages/NotFoundPage'
import Inventory from './src/pages/Inventory'
import Provider from ''

export const routes = [
	{
		path: '/',
		element: <Home />
	},
	{
		path: '/register',
		element: <Register />
	},
	{
		path: '/login',
		element: <Login />
	},
	{
		path: '*',
		element: <NotFoundPage />
	},
    {
        path: '/inventory',
        element: <Inventory />
    },
    {
        path: '/Provider',
        element: <Provider />
    }
]
