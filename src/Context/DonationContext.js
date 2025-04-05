import axios from "axios";
import  React, {createContext, useEffect, useState} from "react";

export const DonationContext = createContext();

export const DonationProvider = ({ children }) => {
    const [donations, setDonations] = useState([]);

    const getDonationsByCampaignId = async (id) => {
        try{
            const response = await axios.get(`http://localhost:5211/api/donations/campaign/${id}`);
            return response.data;
        }
        catch(e){
            console.log(e);
        }
    }

    //add donation
    const addDonation = async (donation) => {
        try{
            const response = await axios.post('http://localhost:5211/api/donations', donation);
            setDonations([...donations, response.data]);
        }
        catch(e){
            console.log(e);
        }
    }

    //get all
    const fetchdata = async () => {
        try{
            const response = await axios.get('http://localhost:5211/api/donations');
            setDonations(response.data);
        }
        catch(e){
            console.log(e);
        }
    }
    useEffect(() => {
        fetchdata();
    }, []);

    return (
        <DonationContext.Provider value={{ donations, addDonation, getDonationsByCampaignId }}>
            {children}
        </DonationContext.Provider>
    );
}