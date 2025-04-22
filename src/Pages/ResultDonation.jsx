import { CampaignProvider } from "../Context/CampaignsContext";
import { DonationProvider } from "../Context/DonationContext";
import { DonationResult } from "../Components/Donation/DonationResult";

const ResultDonation = () => {
    return (
        <DonationProvider>
            <CampaignProvider>
                <DonationResult />
            </CampaignProvider>
        </DonationProvider>
    );
}

export { ResultDonation };