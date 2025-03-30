import React, {useContext, useState, useEffect} from "react";
import { CampaignsContext } from "../../Context/CampaignsContext";
import {NavLink, useNavigate} from "react-router-dom";

const CampaignDetails = ({id}) =>{
    const {getCampaugnById, deleteCampaign} = useContext(CampaignsContext);
    const [campaign, setCampaign] = useState({});
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const handleDelete = async () => {
        await deleteCampaign(id);
        navigate("/campaigns");
    }

    const getImages = () =>{
        const images = campaign.socialUrls.split(" ").map(image => <img key={image.id} src={image.imageUrl} alt="Popa" />);
        setImages(images);
    }

    const fetchCampaign = async () => {
        const response = await getCampaugnById(id);
        setCampaign(response);
        setLoading(false);
    }

    useEffect(() => {
        fetchCampaign();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div>
                <img src={campaign.imageUrl} alt="Popa" />
                <div>
                    <div>{campaign.category}</div>
                    <div>{campaign.name}</div>

                    <div>
                        <div>{campaign.raised}</div>
                        <div>{campaign.destination}</div>
                    </div>
                    <NavLink to={`/campaigns/donate/${campaign.id}`} className="btn">Підтримати</NavLink>
                    <button onClick={() => handleDelete()}>Закрити кампанію</button>
                    <NavLink to={`/campaigns/edit/${campaign.id}`} className="btn">Редагувати кампанію</NavLink>
                </div>
            </div>
            
            <div>
                <div>{campaign.description}</div>
                {images.length > 0 && <div>{images}</div>}
            </div>
        </div>
    )
}
export default CampaignDetails;