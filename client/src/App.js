import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Notfound from './pages/Notfound'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import News from './pages/News'
import Dashboard from './pages/Dashboard'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Sidebar from './components/layout/Sidebar'
import Alert from './components/layout/Alert'

// Redux
import { Provider } from 'react-redux'
import store from './store'
import setAuthToken from './utils/setAuthToken'

if (localStorage.token) {
	setAuthToken(localStorage.token)
}

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Navbar />
				<div className="relative min-h-screen flex">
					<Sidebar />
					<div className="flex-1 p-10">
						<main>
							<Alert />
							<Routes>
								<Route path="/" element={<News />} />
								<Route path="/dashboard/:symbol" element={<Dashboard />} />
								<Route path="/*" element={<Notfound />} />
								<Route path="/signup" element={<SignUp />} />
								<Route path="/signin" element={<SignIn />} />
							</Routes>
						</main>
					</div>
				</div>
				<Footer />
			</Router>
		</Provider>
	)
}

export default App
