export function Mobile_search() {
    <div className="header__mobile-search">
        <label htmlFor="select-bar-search">
            <i className="header__mobile-search-icon fas fa-search"></i>
        </label>

        <input type="checkbox" name="" id="select-bar-search" />
                        
        <label htmlFor="select-bar-search" className="header__mobile-search-wrap">
            <label htmlFor="select-bar-search">
                <i className="header__mobile-search-close fas fa-times"></i>
            </label>
            <input type="text" name="" className="header__mobile-search-input" placeholder="Tìm kiếm"/>
            <button className="header__search-btn">
                <i className="header__search-btn-icon fas fa-search"></i>
            </button>
        </label>
    </div>
}