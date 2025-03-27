import './App.css';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { Campaigns } from './Pages/Campaigns';
import { MainLayout } from './Layouts/MainLayout';
import { Welcome } from './Pages/Welcome';

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<MainLayout />} >
      <Route index element={<Welcome />} />
      <Route path="/campaigns" element={<Campaigns />} />
    </Route>
    
  ));

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
