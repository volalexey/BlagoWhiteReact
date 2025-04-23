import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { set } from 'react-hook-form';

export const CampaignsContext = createContext();

export const CampaignProvider = ({ children }) => {
    const [campaigns, setCampaigns] = useState([]);

    //add campaign
    const addCampaign = async (campaign) => {
        try{
            const responce = await axios.post('http://localhost:5211/api/campaigns', campaign);
            setCampaigns([...campaigns, responce.data]);
        }
        catch(e){
            console.log(e);
        }
    }

    const getCampaignById = async(id) =>{
        try{
            const response = await axios.get(`http://localhost:5211/api/campaigns/${id}`);
            return response.data;
        }
        catch(e){
            console.log(e);
        }
    }

    //delete campaign
    const deleteCampaign = async (id, userId) => {
        try{
            await axios.post(`http://localhost:5211/api/campaigns/close/${id}?userId=${userId}`);
            setCampaigns(campaigns.filter(campaign => campaign.id !== id));
        }
        catch(e){
            console.log(e);
        }
    }

    //edit campaign
    const editCampaign = async (id, updatedCampaign, userId) => {
        try{
            const response = await axios.put(`http://localhost:5211/api/campaigns/${id}?userId=${userId}`, updatedCampaign);
            setCampaigns(campaigns.map(campaign => campaign.id === id ? response.data : campaign));
        }
        catch(e){
            console.log(e);
        }
    }

    //get campaigns
    const fetchdata = async () =>{
        try{
            const responce = await axios.get('http://localhost:5211/api/campaigns');
            setCampaigns(responce.data);
        }
        catch(e){
            console.log(e);
        }
    }

    //get campaigns by userId
    const fetchCampaignsByUserId = async (userId) => {
        try{
            setCampaigns([]);
            
            const response = await axios.get(`http://localhost:5211/api/campaigns/user/${userId}`);
            setCampaigns(response.data);
        }
        catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        fetchdata();
    }, []);

    return (
        <CampaignsContext.Provider value={{ campaigns, addCampaign, deleteCampaign, getCampaignById, fetchCampaignsByUserId, editCampaign }}>
            {children}
        </CampaignsContext.Provider>

    )
}