import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { DonationContext } from "../../Context/DonationContext";
import { CampaignsContext } from "../../Context/CampaignsContext";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../Context/UserContext';
import "./Style/DonationForm.css";

export const DonationForm = ({ campaignId }) => {
    const navigate = useNavigate();
    const { register, handleSubmit, watch } = useForm();
    const [campaign, setCampaign] = useState({});
    const { addDonation, checkoutDonation } = useContext(DonationContext);
    const { getCampaignById } = useContext(CampaignsContext);
    const { user } = useContext(UserContext);

    const fetchCampaign = async () => {
        if (campaignId) {
            const existingCampaign = await getCampaignById(campaignId);
            setCampaign(existingCampaign);
        }
    }

    useEffect(() => {
        fetchCampaign();
    }, [campaignId]);

    if (!campaign) {
        return <div>Loading...</div>;
    }
    return (
        <div className="donation-form-container">
            <div className="donation-header">
                <h1>Підтримка</h1>
                <h2>{campaign.name}</h2>
            </div>

            <form>
                <div className="donation-form-input">
                    <label htmlFor="amount">Кошти</label>
                    <input type="number" {...register("amount")} />
                </div>
                <div>
                    <label htmlFor="message">Повідомлення</label>
                    <input type="text" {...register("message")} />
                </div>
                <button type="button" className="btn btn-donation-form" onClick={() => checkoutDonation(watch("amount") || 100, campaignId, watch("message") || " ") }>Підтримати збір</button>
            </form>
        </div>

    );
}
