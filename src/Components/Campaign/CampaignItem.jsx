import React, {useContext, useState} from "react";
import { CampaignsContext } from "../../Context/CampaignsContext";
import {NavLink} from "react-router-dom";
import "./Style/CampaignItem.css";

const CampaignItem = ({campaign}) => {
    return (
        <li className="div-campaign-item">
            <div className="div-campaign-image">
                <img src={campaign.imageUrl} alt="Popa" className="img-campaign-image" />
                <hr className="hr-image-raised"/>
                <div className="div-raised">
                    <div>{campaign.raised}</div>
                    <div>{campaign.destination}</div>
                </div>
            </div>
            <div className="div-campaign-info">
                <div className="div-campaign-info-top">
                    <div className="div-campaign-category">{campaign.category}</div>
                    <div className="div-campaign-status">{campaign.createdAt}</div>
                </div>
                <div className="div-campaign-title">{campaign.name}</div>
                <div className="div-campaign-description">{campaign.description}</div>

                <div className="div-campaign-info-bottom">
                    <NavLink to={`/campaigns/${campaign.id}`} className="btn-campaign-details btn">Детальніше</NavLink>
                    <NavLink to={`/campaigns/donate/${campaign.id}`} className="btn-campaign-donate btn">Підтримати</NavLink>
                </div>
            </div>
        </li>
    )
}
export default CampaignItem;