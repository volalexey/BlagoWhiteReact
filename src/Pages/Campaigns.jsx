import { CampaignProvider } from "../Context/CampaignsContext";
import CampaignList from "../Components/CampaignList";

const Campaigns = () => {
    return (
        <CampaignProvider>
            <h1>наші кампанії</h1>
            <CampaignList />
        </CampaignProvider>
    )
}

export {Campaigns};