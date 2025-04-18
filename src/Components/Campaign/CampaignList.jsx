import React, {useContext, useState} from "react";
import CampaignItem from "./CampaignItem";
import { CampaignsContext } from "../../Context/CampaignsContext";
import "./Style/CampaignList.css";

const CampaignList = () => {
    const { campaigns } = useContext(CampaignsContext);
    console.log(campaigns)
    return (
        <ul className="campaign-list">
            {campaigns.map(campaign => <CampaignItem key={campaign.id} campaign={campaign} />)}
        </ul>
    )
}

export default CampaignList;