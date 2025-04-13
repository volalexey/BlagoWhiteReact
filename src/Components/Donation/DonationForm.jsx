import {  useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { DonationContext } from "../../Context/DonationContext";
import { CampaignsContext } from "../../Context/CampaignsContext";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../Context/UserContext';

export const DonationForm= ({campaignId}) =>{
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [campaign, setCampaign] = useState({});
    const { addDonation } = useContext(DonationContext);
    const { getCampaignById } = useContext(CampaignsContext);
    const {user} = useContext(UserContext);

    const onSubmit = (values) => {
        handleAdd(values);
    }

    const fetchCampaign = async () => {
        if (campaignId) {
            const existingCampaign = await getCampaignById(campaignId);
            setCampaign(existingCampaign);
        }
    }

    useEffect(() => {
        fetchCampaign();
    }, [campaignId]);

    const handleAdd = (values) => {
        const donation = {
            name: user.name,
            campaignId: parseInt(campaign.id),
            amount: parseInt(values.amount),
            message: values.message,
            email: user.email,
            userId: user.id
        }
        addDonation(donation);
        console.log(donation);

        navigate(`/campaigns/${campaign.id}`);
    }

    if(!campaign) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <div>
                <h1>Donation</h1>
                <h2>{campaign.name}</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
            <div >
                <label htmlFor="amount">Amount</label>
                <input type="number" {...register("amount")} />
            </div>
            <div>
                <label htmlFor="message">Message</label>
                <input type="text" {...register("message")}  />
            </div>
            <button type="submit">Donate</button>
        </form>
        </div>
        
    );
}
