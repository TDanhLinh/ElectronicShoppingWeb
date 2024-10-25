import { Sort_bar } from "./Sort_bar";
import { Navbar } from "./navbar/Navbar";
import { Search } from "./search/Search";

export function Header() {
    return (
        <header className="header">
            <div className="grid wide">
                <Navbar />
                <Search />
            </div>
            <Sort_bar />
        </header>
    )
}