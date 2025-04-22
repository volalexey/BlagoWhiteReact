import { React, useContext, useEffect, useState } from 'react';
import './Style/UserProfile.css';
import { UserContext } from '../Context/UserContext';
import { CampaignsContext } from '../Context/CampaignsContext';
import axios from 'axios';

const UserProfile = () => {

    const { user, Logout } = useContext(UserContext);
    const { deleteCampaign } = useContext(CampaignsContext);
    const [campaigns, setCampaigns] = useState([]);


    useEffect(() => {

        if (!user) {
            console.log('User not found');
        }
        axios.get(`http://localhost:5211/api/campaigns/user/${user.id}`)
            .then(response => {
                setCampaigns(response.data);
            })
            .catch(error => {
                console.error('Error fetching campaigns:', error);
            });
    }, [])


    const handleDelete = async (campaign) => {
        await deleteCampaign(campaign.id, user.id);
        window.location.reload();
    }

    const saveChanges = async (e) => {

    }

    return (
        <div className="user-profile-container">

            <div className="user-profile-settings">

                <h1>Профіль</h1>

                <form onSubmit={saveChanges}>
                    <div className="inputs">
                        <div className='input-group'>
                            <label htmlFor="email">Електронна пошта:</label>
                            <input type="email" id="email" defaultValue={user?.email} />

                            <label htmlFor="name">Ім'я:</label>
                            <input type="text" id="name" defaultValue={user?.name} />

                            <label htmlFor="password">Новий пароль:</label>
                            <input type="password" id="password" />
                        </div>
                    </div>
                    <div className="control-buttons">
                        <button type="submit" className='control-button save'>Save changes</button>
                        <button className='control-button sign-out' onClick={Logout}>Sign out</button>
                    </div>
                </form>

            </div>

            <div className="user-profile-campaigns">
                <h1>Campaigns</h1>
                <div className="campaigns-list">
                    {campaigns && campaigns.map(campaign => {
                        // Calculate progress percentage
                        const progress = Math.min(
                            Math.round((campaign.raised / campaign.destination) * 100),
                            100
                        );

                        return (
                            <div key={campaign.id} className="campaign-item">
                                <div className="campaign-image-and-slider">


                                    <img src={campaign.imageUrl} alt="Campaign" />
                                    <div className="progress-bar">
                                        <div
                                            className="progress-fill"
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                    <div className="raised-and-destination">
                                        <p>{campaign.raised}</p>
                                        <p>{campaign.destination}</p>
                                    </div>
                                </div>
                                <div className="campaign-content">
                                    <h2>{campaign.name}</h2>
                                    <p>{campaign.description}</p>
                                    <div className="funding-details">
                                        <button onClick={() => handleDelete(campaign)} className="btn btn-details-close">Закрити кампанію</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>);
}

export default UserProfile;