import React, {useEffect, useContext, useState} from "react";
import { DonationContext } from "../../Context/DonationContext";
import "./Style/DonationCampaignList.css";

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
        <div className="donation-campaign-list">
            <h2>Останні донати</h2>
            {donations.length === 0 ? <p>No donations yet.</p>
            :   <ul className="ul-donation-list">
                    {donations.map(donation => (
                    <li key={donation.id} className="li-donation-list">
                        <div> <b>{donation.name} -</b> {donation.amount}</div>
                        <div>
                            {donation.message}
                        </div>
                    </li>
                    ))}
                </ul>
            }
        </div>
    )
}
export default DonationCampaignList;