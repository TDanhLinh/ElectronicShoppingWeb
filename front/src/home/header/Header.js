import { Navbar } from "./navbar/Navbar";
import { Search } from "./search/Search";

export function Header() {
    return (
        <header className="header">
            <div className="grid wide">
                <Navbar />
                <Search />
            </div>
        </header>
    )
}