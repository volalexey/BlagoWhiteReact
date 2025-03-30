import { CampaignProvider } from "../Context/CampaignsContext";
import CampaignDetails from "../Components/Campaign/CampaignDetails";
import { useParams } from "react-router-dom";

const SimpleCampaign = () => {
    const params = useParams();

    return(
        <CampaignProvider>
            <CampaignDetails id={params.id} />
        </CampaignProvider>
    )
}
export {SimpleCampaign};