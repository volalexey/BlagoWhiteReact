import React, {useContext, useState} from "react";
import { CampaignsContext } from "../../Context/CampaignsContext";
import {NavLink} from "react-router-dom";
import "./Style/CampaignItem.css";
import formatDate from "../../Utils/DateFormater";

const CampaignItem = ({campaign, isCampaignRaised}) => {

    const date = formatDate(campaign.createdAt);

    return (
        <li className="div-campaign-item">
            <div className="div-campaign-item-image">
                <img src={campaign.imageUrl} alt="Popa" className="img-campaign-item-image" />
                <div className="div-raised">
                    <div>Зібрано: <span>{campaign.raised}</span></div>
                    <div>Ціль: <span>{campaign.destination}</span></div>
                </div>
            </div>
            <div className="div-campaign-item-info">
                <div className="div-campaign-item-info-top">
                    <div className="div-campaign-category">{campaign.category}</div>
                    <div className="div-campaign-status">{date}</div>
                </div>
                <div className="div-campaign-title">{campaign.name}</div>
                <div className="div-campaign-description">{campaign.description}</div>

                <div className="div-campaign-info-bottom">
                    <NavLink to={`/campaigns/${campaign.id}`} className="btn-campaign-details btn">Детальніше</NavLink>
                    {!isCampaignRaised ? <NavLink to={`/campaigns/donate/${campaign.id}`} className="btn-campaign-donate btn">Підтримати</NavLink>:
                        <div className="div-details-item-closed">Збір завершено</div>}
                </div>
            </div>
        </li>
    )
}
export default CampaignItem;