import './App.css';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { Campaigns } from './Pages/Campaigns';
import { AddCampaign } from './Pages/AddCampaign';
import { MainLayout } from './Layouts/MainLayout';
import { Welcome } from './Pages/Welcome';
import { SimpleCampaign } from './Pages/SimpleCampaign';
import { EditCampaign } from './Pages/EditCampaign';
import { AddDonation } from './Pages/AddDonation';
import { RequireAuth } from './Middleware/RequireAuth';
import { UserProvider } from './Context/UserContext';
import { AuthLogin } from './Pages/AuthLogin';
import UserProfile from './Pages/UserProfile';
import { CampaignProvider } from './Context/CampaignsContext';

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<MainLayout />} >
      <Route index element={<Welcome />} />
      <Route path="/campaigns" element={<Campaigns />} />
      <Route path="/campaigns/add" element={<RequireAuth><AddCampaign /></RequireAuth>} />
      <Route path="/campaigns/:id" element={<SimpleCampaign />} />
      <Route path="/campaigns/edit/:id" element={<EditCampaign />} />
      <Route path="/campaigns/donate/:id" element={<RequireAuth><AddDonation /></RequireAuth>} />
      <Route path="/login" element={<AuthLogin type={"login"} />} />
      <Route path="/register" element={<AuthLogin type={"register"} />} />
      <Route path="/profile" element={<RequireAuth><CampaignProvider><UserProfile />
                                          </CampaignProvider></RequireAuth>} />
      </Route>

  ));

  return (
    <UserProvider>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </UserProvider>

  );
}

export default App;
