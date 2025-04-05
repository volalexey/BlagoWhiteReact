import React, {useEffect, useContext, useState} from "react";
import { DonationContext } from "../../Context/DonationContext";

const DonationCampaignList = ({campaignId}) => {
    const { getDonationsByCampaignId } = useContext(DonationContext);
    const [donations, setDonations] = useState([]);

    const fetchDonations = async () => {
        const donationsData = await getDonationsByCampaignId(campaignId);
        setDonations(donationsData);console.log(donationsData);
    }
    useEffect(() => {
        fetchDonations();
    }, []);

    if (!donations) {
        return <div>Loading donations...</div>;
    }

    return (
        <div>
            <h2>Donations</h2>
            {donations.length === 0 ? <p>No donations yet.</p>
            :   <ul>
                    {donations.map(donation => (
                    <li key={donation.id}>
                        {donation.name} - {donation.amount} - {donation.message}
                    </li>
                    ))}
                </ul>
            }
        </div>
    )
}
export default DonationCampaignList;