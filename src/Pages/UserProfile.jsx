import { React, useContext, useEffect, useState } from 'react';
import './Style/UserProfile.css';
import { UserContext } from '../Context/UserContext';
import { CampaignsContext } from '../Context/CampaignsContext';
import AchievementCircle from '../Components/Profile/AchievementCircle';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const UserProfile = () => {

    const { user, Logout, StoreUser } = useContext(UserContext);

    const { deleteCampaign } = useContext(CampaignsContext);
    const [campaigns, setCampaigns] = useState([]);

    const [achievements, setAchievements] = useState([]);


    // Get user from local storage
    const userFromStorage = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (!user) {
            console.log('User not found');
            return;
        }


        axios.get(`http://localhost:5211/api/campaigns/user/${user.id}`)
            .then(response => {
                setCampaigns(response.data);
            })
            .catch(error => {
                console.error('Error fetching campaigns:', error);
            });


        axios.get(`http://localhost:5211/api/users/achievements/${user.id}`)
            .then(response => {
                setAchievements(response.data);
            })
            .catch(error => {
                console.error('Error fetching achievements:', error);
            });


    }, [user]);



    const handleDelete = async (campaign) => {
        await deleteCampaign(campaign.id, user.id);
        window.location.reload();
    }

    const saveChanges = async (e) => {

        e.preventDefault();

        axios.put(`http://localhost:5211/api/users/${user.id}`, {
            email: document.getElementById('email').value,
            name: document.getElementById('name').value,
            password: document.getElementById('password').value 
                !== user.password 
                || document.getElementById('password').value === "" 
                ? document.getElementById('password').value 
                : user.password,
        })
        .then(response => {
            
            console.log('User updated successfully:', response.data);
            
            StoreUser(response.data);
            window.location.reload();
        })
        .catch(error => {
            console.error('Error updating user:', error);
        });
    }

    return (
        <div className="user-profile-container">
            <div className="user-profile-settings-and-campaigns">
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
                            <button type="submit" className='control-button save'>Зберегти</button>
                            <button className='control-button sign-out' onClick={Logout}>Вийти</button>
                        </div>
                    </form>

                </div>

                <div className="user-profile-campaigns">
                    <h1>Campaigns</h1>
                    <div className="campaigns-list">
                        {campaigns && campaigns.length > 0 && campaigns.map(campaign => {

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
                                    <div className="campaign-name-desc-and-buttons">
                                        <h3>{campaign.name}</h3>
                                        <p>{campaign.description}</p>
                                        <div className="buttons">

                                            <NavLink to={`/campaigns/edit/${campaign.id}`} className="btn btn-details-edit">Редагувати</NavLink>
                                            <button className='control-button delete' onClick={() => handleDelete(campaign)}>Закрити</button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>


            <div className="user-profile-achievements">
                <h1>Досягнення</h1>
                <div className="achievements-list">

                    {achievements && achievements.map((achievement, index) => {

                        const progress = achievement.currentValue / achievement.achievement.destination;

                        return (
                            <div key={index} className='achievement-item'>
                                <div className="achievement-name-and-desc">
                                    <h3>{achievement.achievement.name}
                                        <span className='achievement-value'> {achievement.currentValue}/{achievement.achievement.destination}</span>
                                        {progress >= 1 && <span className='achievement-completed'> ВИКОНАНО!</span>}
                                    </h3>
                                    <p>{achievement.achievement.description}</p>
                                </div>
                                <AchievementCircle progress={progress} />
                            </div>
                        )
                    })}

                </div>
            </div>
        </div>);
}

export default UserProfile;