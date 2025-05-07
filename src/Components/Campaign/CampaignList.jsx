import React, {useContext, useState} from "react";
import CampaignItem from "./CampaignItem";
import { CampaignsContext } from "../../Context/CampaignsContext";
import "./Style/CampaignList.css";

const CampaignList = () => {
    const { campaigns } = useContext(CampaignsContext);
    console.log(campaigns)
    return (
        <ul className="campaign-list">
            <h1 className="h1-title">Наші кампанії</h1>
            {campaigns.map(campaign => <CampaignItem key={campaign.id} campaign={campaign} isCampaignRaised={campaign.raised >= campaign.destination} />)}
        </ul>
    )
}

export default CampaignList;