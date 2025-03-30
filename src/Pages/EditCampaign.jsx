import { CampaignProvider } from "../Context/CampaignsContext";
import CampaignForm from "../Components/Campaign/CampaignForm";
import { useParams } from "react-router-dom";

const EditCampaign = () =>{
    const params = useParams();

    return(
        <CampaignProvider>
            <h1>Редагування кампанії</h1>
            <CampaignForm type={params.id}/>
        </CampaignProvider>

    )
}

export {EditCampaign};