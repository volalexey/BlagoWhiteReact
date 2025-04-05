import './App.css';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { Campaigns } from './Pages/Campaigns';
import { AddCampaign } from './Pages/AddCampaign';
import { MainLayout } from './Layouts/MainLayout';
import { Welcome } from './Pages/Welcome';
import {SimpleCampaign} from './Pages/SimpleCampaign';
import { EditCampaign } from './Pages/EditCampaign';
import { AddDonation } from './Pages/AddDonation';


function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<MainLayout />} >
      <Route index element={<Welcome />} />
      <Route path="/campaigns" element={<Campaigns />} />
      <Route path="/campaigns/add" element={<AddCampaign />} />
      <Route path="/campaigns/:id" element={<SimpleCampaign />} />
      <Route path="/campaigns/edit/:id" element={<EditCampaign />} />
      <Route path="/campaigns/donate/:id" element={<AddDonation />} />
    </Route>
    
  ));

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
