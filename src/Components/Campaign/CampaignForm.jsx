import { useForm } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';
import { CampaignsContext } from '../../Context/CampaignsContext';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import './Style/CampaignForm.css';

export const CampaignForm = ({ type }) => {
    const navigate = useNavigate();
    const { register, handleSubmit, setValue } = useForm();
    const [campaign, setCampaign] = useState({});

    const { user } = useContext(UserContext);
    const { addCampaign, getCampaignById, editCampaign } = useContext(CampaignsContext);

    useEffect(() => {
        fetchCampaign();
    }, [type]);

    const fetchCampaign = async () => {
        if (type !== 'add') {
            const existingCampaign = await getCampaignById(type);
            if (existingCampaign) {
                setCampaign(existingCampaign);
                Object.keys(existingCampaign).forEach(key => {
                    setValue(key, existingCampaign[key]);
                });
            }
        }
    };

    const onSubmit = (values) => {
        if (type === 'add') {
            handleAdd(values);
        } else {
            handleEdit(values);
        }
    };

    const handleAdd = (values) => {
        const campaign = {
            name: values.name,
            description: values.description,
            destination: parseInt(values.destination),
            category: values.category,
            createdAt: new Date().toISOString(),
            imageUrl: values.imageUrl,
            socialUrls: values.socialUrls,
            creatorId: user.id
        };
        addCampaign(campaign);
        navigate('/campaigns');
    };

    const handleEdit = (values) => {
        const updatedCampaign = { ...campaign, ...values };
        editCampaign(updatedCampaign.id, updatedCampaign, user.id);
        navigate(`/campaigns/${updatedCampaign.id}`);
    };

    return (
        <div className="div-campaign-form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="div-campaign-form-container">
                    <h1>{type === 'add' ? "Створити кампанію" : "Редагувати кампанію"}</h1>
                    <hr />
                    <div>
                        <label htmlFor="name">Назва</label>
                        <input className="input-campaign" type="text" id="name" placeholder="Name" {...register("name", { required: true })} />
                    </div>
                    <div>
                        <label htmlFor="description">Опис</label>
                        <textarea className="input-campaign" id="description" placeholder="Input some information..." {...register("description", { required: true, maxLength: 500 })}></textarea>
                    </div>
                    <div>
                        <label htmlFor="category">Категорія</label>
                        <select className="input-campaign" id="category" {...register("category")}>
                            <option value="Тварини">Тварини</option>
                            <option value="Ветерани">Ветерани</option>
                            <option value="Діти">Діти</option>
                            <option value="Ліки">Ліки</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="destination">Ціль</label>
                        <input className="input-campaign" type="number" id="destination" {...register("destination", { required: true })} />
                    </div>
                    <div>
                        <label htmlFor="imageUrl">Image URL</label>
                        <input className="input-campaign" type="text" id="imageUrl" {...register("imageUrl", { required: true })} />
                    </div>
                    <div>
                        <label htmlFor="socialUrls">Social URLs</label>
                        <input className="input-campaign" type="text" id="socialUrls" {...register("socialUrls", { required: true })} />
                    </div>
                    <hr />
                    <button className="btn btn-campaign-submit" type="submit">
                        {type === 'add' ? "Створити" : "Оновити"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CampaignForm;
