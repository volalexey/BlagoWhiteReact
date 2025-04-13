import React, {useContext, useState, useEffect} from "react";
import { CampaignsContext } from "../../Context/CampaignsContext";
import {NavLink, useNavigate} from "react-router-dom";
import DonationCampaignList from "../Donation/DonationCampaignList";
import { UserContext } from "../../Context/UserContext";
import { set } from "react-hook-form";

const CampaignDetails = ({id}) =>{
    const {getCampaignById, deleteCampaign} = useContext(CampaignsContext);
    const [campaign, setCampaign] = useState({});
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    const {user} = useContext(UserContext);
    const [isCreator, setIsCreator] = useState(false);

    const navigate = useNavigate();

    const handleDelete = async () => {
        await deleteCampaign(id, user.id);
        navigate("/campaigns/");
    }

    const getImages = () =>{
        if(!campaign.socialUrls) return;
        const images = campaign.socialUrls.split(" ").map(image => <img key={image.id} src={image.imageUrl} alt="Popa" />);
        setImages(images);
    }

    const fetchCampaign = async () => {
        const response = await getCampaignById(id);
        setCampaign(response);
        setLoading(false);
    }

    //campaign
    useEffect(() => {
        const fetchData = async () => {
            const response = await getCampaignById(id);
            setCampaign(response);
            setLoading(false);
        };
    
        fetchData();
    }, [id]);
    
    //is creator
    useEffect(() => {
        if (campaign && user && campaign.creatorId) {
            setIsCreator(user.id === campaign.creatorId);
        }
    }, [campaign, user]);
    
    //images
    useEffect(() => {
        if (campaign.socialUrls) {
            const images = campaign.socialUrls
                .split(" ")
                .map((url, index) => <img key={index} src={url} alt="Popa" />);
            setImages(images);
        }
    }, [campaign]);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div>
                <img src={campaign.imageUrl} alt="Popa" />
                <div>
                    <div>{campaign.category}</div>
                    <div>{campaign.name}</div>

                    <div>Здійснює: {campaign.user.name}</div>

                    <div>
                        <div>Зібрано {campaign.raised}</div>
                        <div>Ціль {campaign.destination}</div>
                    </div>
                    <NavLink to={`/campaigns/donate/${campaign.id}`} className="btn">Підтримати</NavLink>
                    {isCreator && <button onClick={() => handleDelete()}>Закрити кампанію</button>}
                    {isCreator && <NavLink to={`/campaigns/edit/${campaign.id}`} className="btn">Редагувати кампанію</NavLink>}
                    
                </div>
            </div>
            
            <div>
                <div>
                    <div>{campaign.description}</div>
                    {images.length > 0 && <div>{images}</div>}
                </div>
                <div>
                    <DonationCampaignList campaignId={campaign.id} />
                </div>
            </div>
        </div>
    )
}
export default CampaignDetails;