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

    //liqPay checkout method
    const checkoutDonation = async (donationAmount, campaignId, message) => {
        try{
            const response = await axios.post('http://localhost:5211/api/pay', {
                amount : donationAmount,
                campaignId : campaignId,
                message : message
            });

            const {data, signature} = response.data;

            const form = document.createElement('form');
            form.setAttribute('method', 'POST');
            form.setAttribute('action', 'https://www.liqpay.ua/api/3/checkout');

            const inputData = document.createElement('input');
            inputData.setAttribute('type', 'hidden');
            inputData.setAttribute('name', 'data');
            inputData.setAttribute('value', data);

            const inputSignature = document.createElement('input');
            inputSignature.setAttribute('type', 'hidden');
            inputSignature.setAttribute('name', 'signature');
            inputSignature.setAttribute('value', signature);

            form.appendChild(inputData);
            form.appendChild(inputSignature);
            document.body.appendChild(form);
            form.submit();
        }
        catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        fetchdata();
    }, []);

    return (
        <DonationContext.Provider value={{ donations, addDonation, getDonationsByCampaignId, checkoutDonation }}>
            {children}
        </DonationContext.Provider>
    );
}