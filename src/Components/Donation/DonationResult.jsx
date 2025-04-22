import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DonationContext } from "../../Context/DonationContext";
import { UserContext } from "../../Context/UserContext";
import { useContext } from "react";

export const DonationResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { addDonation } = useContext(DonationContext);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const status = queryParams.get("status");
        const amount = queryParams.get("amount");
        const message = queryParams.get("message");
        const campaignId = queryParams.get("campaignId");

        if (status === "success" && campaignId && amount && user) {
            console.log("nen")
            const donation = {
                name: user.name,
                campaignId: parseInt(campaignId),
                amount: parseInt(amount),
                message: message,
                email: user.email,
                userId: user.id
            };
            addDonation(donation);
            navigate(`/campaigns/${campaignId}`);
        }
    }, [user])
}