import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const CampaignsContext = createContext();

export const CampaignProvider = ({ children }) => {
    const [campaigns, setCampaigns] = useState([]);

    const addCpampaign = async (campaign) => {
        try{
            const responce = await axios.post('http://localhost:5211/api/campaigns', campaign);
            setCampaigns([...campaigns, responce.data]);
        }
        catch(e){
            console.log(e);
        }
    }

    const deleteCampaign = async (id) => {
        try{
            await axios.delete(`http://localhost:5211/api/campaigns/${id}`);
            setCampaigns(campaigns.filter(campaign => campaign.id !== id));
        }
        catch(e){
            console.log(e);
        }
    }

    const fetchdata = async () =>{
        try{
            const responce = await axios.get('http://localhost:5211/api/campaigns');
            setCampaigns(responce.data);
        }
        catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        fetchdata();
    }, []);

    return (
        <CampaignsContext.Provider value={{ campaigns, addCpampaign, deleteCampaign }}>
            {children}
        </CampaignsContext.Provider>

    )
}