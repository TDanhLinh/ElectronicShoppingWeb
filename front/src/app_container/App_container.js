import { Category } from "./Category";
import { Home_filter } from "./Home_filter";
import { Mobile_category } from "./Mobile_category";

export function App_container() {
    return (
        <div className="app__container">
            <div className="grid wide">
                <div className=" row sm-gutter app__content">
                    <div className="col l-2 m-0 c-0">
                        <Category />
                    </div>
                    <div class="col l-10 m-12 c-12">
                        <Home_filter />
                        <Mobile_category />
                    </div>
                </div>
            </div>
        </div>
    )
}