import { CampaignProvider } from "../Context/CampaignsContext";
import CampaignList from "../Components/Campaign/CampaignList";
import "./Style/Campaigns.css";

const Campaigns = () => {
    return (
        <CampaignProvider >
            <div className="div-campaigns">
                <h1>наші кампанії</h1>
                <CampaignList />
            </div>
        </CampaignProvider>
    )
}

export {Campaigns};