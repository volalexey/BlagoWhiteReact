import { CampaignProvider } from "../Context/CampaignsContext";
import CampaignForm from "../Components/Campaign/CampaignForm";
import { useParams } from "react-router-dom";

const EditCampaign = () =>{
    const params = useParams();

    return(
        <CampaignProvider>
            <CampaignForm type={params.id}/>
        </CampaignProvider>

    )
}

export {EditCampaign};