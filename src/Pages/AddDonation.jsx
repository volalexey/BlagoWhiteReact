import { DonationProvider } from "../Context/DonationContext";
import { CampaignProvider } from "../Context/CampaignsContext";
import {DonationForm} from "../Components/Donation/DonationForm";
import { useParams } from "react-router-dom";

const AddDonation = () =>{
    const params = useParams();

    return(
        <CampaignProvider>
            <DonationProvider>
                <DonationForm campaignId={params.id}/>
            </DonationProvider>
        </CampaignProvider>

    )
}

export{AddDonation};