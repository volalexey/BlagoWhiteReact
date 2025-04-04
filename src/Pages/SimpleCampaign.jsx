import { CampaignProvider } from "../Context/CampaignsContext";
import { DonationProvider } from "../Context/DonationContext";
import CampaignDetails from "../Components/Campaign/CampaignDetails";
import { useParams } from "react-router-dom";

const SimpleCampaign = () => {
    const params = useParams();

    return(
        <CampaignProvider>
            <DonationProvider>
                <CampaignDetails id={params.id} />
            </DonationProvider>
        </CampaignProvider>
    )
}
export {SimpleCampaign};