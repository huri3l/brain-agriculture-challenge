import {
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'
import { Layout } from './components/layout'
import { DashboardPage } from './pages/dashboard-page'
import { HomePage } from './pages/home-page'
import { NotFoundPage } from './pages/not-found-page'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route path="/dashboard"
        element={
          <Layout>
            <DashboardPage />
          </Layout>
        }
      />
    </Route>
  )
)
