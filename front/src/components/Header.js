import {Link} from "react-router-dom";

export default function Header() {
    return (
            <header className="">
                <div className="header-top">
                </div>

                <div className="header-down">
                    <Link className="header-link" to="/" >Главная</Link>
                    <Link className="header-link" to="/">Модели</Link>
                    <Link className="header-link" to="/">Обвес</Link>
                    <Link className="header-link" to="/">Доставка</Link>
                    <Link className="header-link" to="/">Контакты</Link>

                    <div className="search-block">
                        <div className="search-field">
                            <a className="field">Номер детали...</a>
                        </div>

                        <button className="search-button">
                            <a className="">Поиск</a>
                        </button>
                    </div>


                </div>

            </header>
    )


}
