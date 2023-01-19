import { useRoutes } from 'react-router-dom';
import { ServiceList } from './components/ServiceList/ServiceList';
import { AddServiceAction } from './components/AddServiceAction';
import {EditServiceAction} from './components/EditServiceAction'
import { MainLayout } from './layout'

function App() {

  const routes = useRoutes([
    {
      element: <MainLayout />,
      children: [
        {
          path: '/',
          element: <ServiceList />
        },
        {
          path: '/add',
          element: <AddServiceAction />
        },
        {
          path: '/edit/:id',
          element: <EditServiceAction />
        }
      ]
    }
  ])

  return routes
}

export default App;
