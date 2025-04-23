import React, { useContext, useState, useEffect } from "react";
import { CampaignsContext } from "../../Context/CampaignsContext";
import { NavLink, useNavigate } from "react-router-dom";
import DonationCampaignList from "../Donation/DonationCampaignList";
import { UserContext } from "../../Context/UserContext";
import "./Style/CampaignDetails.css";
import formatDate from "../../Utils/DateFormater";

const CampaignDetails = ({ id }) => {
    const { getCampaignById, deleteCampaign } = useContext(CampaignsContext);
    const [campaign, setCampaign] = useState({});
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState("");

    const [isCampaignRaised, setIsCampaignRaised] = useState(false);

    const { user } = useContext(UserContext);
    const [isCreator, setIsCreator] = useState(false);

    const navigate = useNavigate();
    console.log(images);

    const handleDelete = async () => {
        await deleteCampaign(id, user.id);
        navigate("/campaigns/");
    }

    const getImages = () => {
        if (!campaign.socialUrls) return;
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
            setIsCampaignRaised(response.raised >= response.destination);
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

    //images & date
    useEffect(() => {
        if (campaign.socialUrls) {
            const images = campaign.socialUrls
                .split(" ")
                .map((url, index) => <img className="img-details-image" key={index} src={url} alt="socialImage" />);
            setImages(images);
        }
        if (campaign) {
            setDate(formatDate(campaign.createdAt));
        }
    }, [campaign]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="div-details">
            <div className="div-details-main-info">
                <img src={campaign.imageUrl} alt="MainImage" className="img-details-main-info" />
                <div className="div-details-main-info-text">
                    <div className="div-details-category">Категорія: {campaign.category}</div>
                    <div className="div-details-name">{campaign.name}</div>

                    <div className="div-details-date">Розпочато: {date}</div>
                    <div className="div-details-creator">Здійснює: {campaign.user.name}</div>

                    <div className="div-details-raised-info">
                        <div className="progress-bar-container">
                            <div
                                className="progress-bar-filled"
                                style={{
                                    width: `${Math.min((campaign.raised / campaign.destination) * 100, 100)}%`
                                }}
                            />
                        </div>
                        <div className="raised-and-destination">
                            <div className="div-details-raised">Зібрано <br />{campaign.raised}</div>
                            <div className="div-details-destination">Ціль <br />{campaign.destination}</div>
                        </div>
                    </div>
                    <div className="div-details-buttons">
                        {!isCampaignRaised ? <NavLink to={`/campaigns/donate/${campaign.id}`} className="btn btn-details-donate">Підтримати</NavLink> :
                            <div className="div-details-closed">Збір завершено</div>} 
                        {isCreator && <button onClick={() => handleDelete()} className="btn btn-details-close">Закрити кампанію</button>}
                        {isCreator && <NavLink to={`/campaigns/edit/${campaign.id}`} className="btn btn-details-edit">Редагувати кампанію</NavLink>}
                    </div>

                </div>
            </div>

            <hr className="hr-details-main" />

            <div className="div-details-description-info">
                <div className="div-details-description">
                    <div className="div-details-text">{campaign.description}</div>
                    {images.length > 0 && <hr className="hr-details-description" />}
                    {images.length > 0 && <div className="div-details-images-container">{images.map((image, index) => (
                        <div key={index} className="div-details-image">{image}</div>
                    ))}</div>
                    }
                </div>
                <div className="div-details-donations">
                    <DonationCampaignList campaignId={campaign.id} />
                </div>
            </div>
        </div>
    )
}
export default CampaignDetails;