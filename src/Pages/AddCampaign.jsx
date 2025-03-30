import { CampaignProvider } from "../Context/CampaignsContext";
import CampaignForm from "../Components/Campaign/CampaignForm";

const AddCampaign = () =>{
    return(
        <CampaignProvider>
            <h1>Додавання кампаній</h1>
            <CampaignForm/>
        </CampaignProvider>

    )
}

export {AddCampaign};