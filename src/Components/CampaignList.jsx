import React, {useContext, useState} from "react";
import CampaignItem from "./CampaignItem";
import { CampaignsContext } from "../Context/CampaignsContext";

const CampaignList = () => {
    const { campaigns } = useContext(CampaignsContext);
    return (
        <ul>
            {campaigns.map(campaign => <CampaignItem key={campaign.id} campaign={campaign} />)}
        </ul>
    )
}

export default CampaignList;