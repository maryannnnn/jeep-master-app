import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Header from "./components/Header";

export default function App() {
    return (
        <BrowserRouter>
            <div className="grid-container">
                <Header/>
                <main>
                    {/*<Route path="/cart/:id?" component={CartScreen}></Route>*/}
                    {/*<Route path="/" component={HomePage} exact></Route>*/}
                </main>


                <footer className="grid-footer">
                    <div className="foot-col">
                        <div className="media">
                            <a target="_blank" href="https://www.facebook.com/%D0%90%D0%BA%D1%81%D0%B5%D1%81%D1%81%D1%83%D0%B0%D1%80%D1%8B-%D0%B8-%D0%B0%D0%B2%D1%82%D0%BE%D0%B7%D0%B0%D0%BF%D1%87%D0%B0%D1%81%D1%82%D0%B8-%D0%B4%D0%BB%D1%8F-%D0%94%D0%B6%D0%B8%D0%BF%D0%BE%D0%B2-Jeep-628106244057934/">
                                <img src="/socialMedia/facebook (1) 2.png" alt=""/>
                            </a>

                            <a target="_blank" href="https://www.instagram.com/jeep_partt/">
                            <img src="/socialMedia/instagram-logo 2.png" alt=""/>
                            </a>

                            <a target="_blank" href="https://ok.ru/group/58581401534513">
                            <img src="/socialMedia/odnoklassniki-logo 2.png" alt=""/>
                            </a>

                            <a target="_blank" href="https://twitter.com/Jeep_part">
                            <img src="/socialMedia/youtube 3.png" alt=""/>
                            </a>

                            <a target="_blank" href="https://vk.com/part_jeep">
                                <img src="/socialMedia/vk.png" alt=""/>
                            </a>
                            
                        </div>

                        <div className="media">

                            <a target="_blank" href="https://www.youtube.com/channel/UCZv_z-n3a---7V3mYcp0rAQ">
                            <img src="/socialMedia/youtube.png" alt=""/>
                            </a>

                            <a target="_blank" href="https://my.mail.ru/my/welcome?back_after_reg=https://my.mail.ru/community/jeep_part/ajax?func_name=visitors.add_visit&xemail=polyak_arseniy@mail.ru">
                            <img src="/socialMedia/Без имени-12.png" alt=""/>
                            </a>

                            <a target="_blank" href="https://flipboard.com/@markpolakk/%D0%B0%D0%BA%D1%81%D0%B5%D1%81%D1%81%D1%83%D0%B0%D1%80%D1%8B-%D0%B8-%D0%B0%D0%B2%D1%82%D0%BE%D0%B7%D0%B0%D0%BF%D1%87%D0%B0%D1%81%D1%82%D0%B8-%D0%B4%D0%BB%D1%8F-%D0%B4%D0%B6%D0%B8%D0%BF%D0%BE%D0%B2-jeep-t7uvqa8ry?inviteToken=http%3A%2F%2Fflip.it%2FnlztV2">
                                <img src="/socialMedia/flipboard (1).png" alt=""/>
                            </a>

                            <a target="_blank" href="https://jeeppars.blogspot.com/">
                            <img src="/socialMedia/blogger-logotype.png" alt=""/>
                            </a>

                            <a target="_blank" href="https://www.liveinternet.ru/users/jeep_part/">
                                <img src="/socialMedia/Без имени-1.png" alt=""/>
                            </a>
                            
                        </div>

                        <div className="Copyright">
                            <a>Copyright © Jeep-Part.ru</a>
                        </div>

                    </div>

                    <div className="community foot-col">
                        <h2>Сообщество</h2>
                        <a>Блог</a>
                        <a>Разработчикам</a>
                        <a>Форум</a>
                    </div>

                    <div className="service foot-col">
                        <h2>Сервис</h2>
                        <a>Способы оплаты</a>
                        <a>Правила оплаты</a>
                        <a>Возврат товара</a>
                        <a>Доставка</a>
                    </div>

                    <div className="support foot-col">
                        <h2>Поддержка</h2>
                        <a>Справочный центр</a>
                        <a>Связаться с нами</a>
                        <a>Конфиденц. и условия</a>
                        <a>Файлы cookie</a>
                        <a>Карта сайта</a>
                    </div>

                </footer>
            </div>
        </BrowserRouter>
    );
}

// export default App;
