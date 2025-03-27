import React, {useContext, useState} from "react";
import { CampaignsContext } from "../Context/CampaignsContext";
import {NavLink} from "react-router-dom";

const CampaignItem = ({campaign}) => {
    return (
        <li>
            <div>
                <img src={campaign.imageUrl} alt="Popa" />
                <hr />
                <div>
                    <div>{campaign.raised}</div>
                    <div>{campaign.destination}</div>
                </div>
            </div>
            <div>
                <div>
                    <div className="div-campaign-category">{campaign.category}</div>
                    <div className="div-campaign-status">{campaign.createdAt}</div>
                </div>
                <div className="div-campaign-title">{campaign.name}</div>
                <div className="div-campaign-description">{campaign.description}</div>

                <div>
                    <NavLink to={`/campaigns/${campaign.id}`} className="div-btn-details btn">Детальніше</NavLink>
                    <NavLink to={`/campaigns/donate/${campaign.id}`} className="div-btn-donate btn">Підтримати</NavLink>
                </div>
            </div>
        </li>
    )
}
export default CampaignItem;