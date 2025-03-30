import {useForm} from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';
import { CampaignsContext } from '../../Context/CampaignsContext';
import { useNavigate } from 'react-router-dom';

export const CampaignForm = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit
    } = useForm();

    const {addCampaign} = useContext(CampaignsContext);

    const onSubmit = (values) =>{
        const campaign = {
            name: values.name,
            description: values.description,
            destination: parseInt(values.destination),
            category: values.category,
            createdAt: new Date().toISOString(),
            imageUrl: values.imageUrl,
            socialUrls: values.socialUrls
        }
        addCampaign(campaign);
        console.log(campaign);

        navigate('/campaigns');
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" placeholder='Name' id='name' {...register("name", {required:true})}/>
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea type="text" placeholder='Input some information about campaign...' id='description' {...register("description", {required:true, maxLength:500})}/>
            </div>
            <div>
                <label htmlFor="category" className="form-label"> Group Type </label>
                <select
                    id="category"
                    {...register("category")}
                >
                    <option value={1}>Blabalbla</option>
                    <option value={0}>Blebleble</option>
                </select>
            </div>
            <div>
                <label htmlFor="destination">Destination</label>
                <input type='number' id='destination' {...register("destination", {required:true})}/>
            </div>
            <div>
                <label htmlFor="imageUrl">Image url</label>
                <input type='text' id='Image' {...register("imageUrl", {required:true})}/>
            </div>
            <div>
                <label htmlFor="socialUrls">Social Urls</label>
                <input type='text' id='Images' {...register("socialUrls", {required:true})}/>
            </div>
            <div>
                <button type='submit'>Create Campaign</button>
            </div>
        </form>
    )
}

export default CampaignForm;