import { Navbar } from "./navbar/Navbar";
import { Search } from "./search/Search";

export function Header({setSearchText}) {
    return (
        <header className="header">
            <div className="grid wide">
                <Navbar />
                <Search
                    setSearchText = {setSearchText}
                />
            </div>
        </header>
    )
}