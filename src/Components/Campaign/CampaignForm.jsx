import {useForm} from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';
import { CampaignsContext } from '../../Context/CampaignsContext';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

export const CampaignForm = ({type}) => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setValue
    } = useForm();
    const [campaign, setCampaign] = useState({});

    const {user} = useContext(UserContext);
    const {addCampaign, getCampaignById, editCampaign} = useContext(CampaignsContext);

    useEffect(() => {
        fetchCampaign();
    }, [type]);

    const fetchCampaign = async () => {
        if (type !== 'add') {
            const existingCampaign = await getCampaignById(type);
            console.log(existingCampaign);

            if (existingCampaign) {
                setCampaign(existingCampaign);
                
                Object.keys(existingCampaign).forEach(key => {
                    setValue(key, existingCampaign[key]);
                });
            }
        }
    }

    const onSubmit = (values) =>{
        if(type === 'add'){
            console.log("adding campaign");
            handleAdd(values);
        }
        else{
            console.log("editing campaign");
            handleEdit(values);
        }
    }

    const handleAdd = (values) =>{
        const campaign = {
            name: values.name,
            description: values.description,
            destination: parseInt(values.destination),
            category: values.category,
            createdAt: new Date().toISOString(),
            imageUrl: values.imageUrl,
            socialUrls: values.socialUrls,
            creatorId: user.id
        }
        addCampaign(campaign);
        console.log(campaign);

        navigate('/campaigns');
    }

    const handleEdit = (values) => {
        const updatedCampaign = { ...campaign, ...values };
        editCampaign(updatedCampaign.id, updatedCampaign, user.id);
        navigate(`/campaigns/${updatedCampaign.id}`);
    };

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
                    <option value="Blabalbla">Blabalbla</option>
                    <option value="Blebleble">Blebleble</option>
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
                <button type='submit'>{type === 'add' ? "Create Campaign" : "Edit Campaign"}</button>
            </div>
        </form>
    )
}

export default CampaignForm;