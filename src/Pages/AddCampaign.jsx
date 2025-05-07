import { CampaignProvider } from "../Context/CampaignsContext";
import CampaignForm from "../Components/Campaign/CampaignForm";

const AddCampaign = () =>{
    return(
        <CampaignProvider>
            <CampaignForm type={'add'}/>
        </CampaignProvider>

    )
}

export {AddCampaign};