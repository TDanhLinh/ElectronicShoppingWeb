export function Category({category, setCategory, categories}) {
    return (
        <nav className="category">
            <h3 className="category__heading">Danh mục</h3>
            <ul className="category-list">
                {
                    categories.map((item, index) => (
                        <li 
                            key={index} 
                            className={"category-item"+((category === item) ? " category-item--active" : "")}
                        >
                            <div
                                className="category-item__link"
                                onClick={()=>setCategory(item)}
                            >
                                {item}
                            </div>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}