import { useEffect, useState } from "react";
import { request } from "../../api/axios";

export function Category({ searchCategory, setSearchCategory }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch categories from the API
        const fetchCategories = async () => {
            try {
                const response = await request("GET", "/client-api/categories");
                if (response.status === 200) {
                    const data = response.data.payload.content;
                    setCategories(data); // assuming the response is an array of categories
                } else {
                    throw new Error("Failed to fetch categories");
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const clickOnCategory = (categorySlug) => {
        setSearchCategory(categorySlug); // Set searchCategory to categorySlug for searching
    };

    if (loading) return <div>Loading categories...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <nav className="category">
            <h3 className="category__heading">Danh mục</h3>
            <ul className="category-list">
                {categories.map((category, index) => {
                    const categorySlug = category.categorySlug || "";
                    const categoryName = category.categoryName || "Unknown Category";
                    return (
                        <li
                            key={index}
                            className={`category-item${(searchCategory === categorySlug) ? " category-item--active" : ""}`}
                        >
                            <div
                                className="category-item__link"
                                onClick={() => clickOnCategory(categorySlug)} // search by categorySlug
                            >
                                {categoryName} {/* Display categoryName */}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
