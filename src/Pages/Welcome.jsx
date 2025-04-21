import React from 'react';
import { NavLink } from 'react-router-dom';
import './Style/Welcome.css';

const Welcome = () => {
    return (
        <div className="welcome-container">

            <div class="page">
                <div class="grid">
                    <div class="cell"><img src="/img/slider 1.png" /></div>
                    <div class="cell"><img src="/img/Kaver_dlia_saitu_dobro_1680kh470_05_Ve0HSg9.jpeg.620x329_q85_box-666,0,1553,470_crop_detail 1.png" /></div>
                    <div class="cell"><img src="/img/foto.jpeg.620x329_q85_box-0,11,840,456_crop_detail 1.png" /></div>
                    <div class="cell"><img src="/img/1_page_24.jpg.620x329_q85_box-0,0,1826,970_crop_detail 1.png" /></div>
                </div>
                <div class="overlay">
                    <div class="logo">
                        <div class="logo-small">Благо</div>
                        <div class="logo-big">Дій</div>
                    </div>
                </div>
            </div>

            <div className="who-we-are">
                <h2 className='question'>Хто ми?</h2>
                <div className="columns">
                    <p>Ми, фонд зборів “БлагоДій”,<br /> допомагаємо всім,<br /> хто цього потребує.</p>
                    <p>Наш фонд зібрав вже більше <br />10 млн. гривень на допомогу ЗСУ</p>
                    <p>Створюйте кампанії,<br />залучайте донорів та <br />долайте фінансові перешкоди <br />разом з нами!</p>
                </div>


            </div>
            <NavLink to="/campaigns" className="btn to-campaigns">Перейти до кампаній</NavLink>

            <div className="options">
                <div class="item top-left">Допомога<br />дітям</div>
                <div class="item top-right">Підтримка<br />ветеранів</div>

                <div class="center">Дій</div>

                <div class="item bottom-left">Придбання<br />ліків</div>
                <div class="item bottom-right">Забезпечення<br />переселенців</div>

            </div>


            <div className="agitation">
                <div className="piece">
                    <h2>Маленьких <br />донатів не буває!</h2>
                    <p>Навіть 5-10 гривень  <br />вже допоможуть</p>

                </div>
                <div className="piece">
                    <h2>Швидко та <br />
                        анонімно</h2>
                    <p>Всього два кліки відділяє вас від <br /> доброї справи</p>
                </div>
            </div>
        </div>
    );
}

export { Welcome };