import React, {useState} from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import { Words } from '../Data/Data.jsx'
import  searchStyle from './Search.module.css'


const SearchBar = () => {
    const [activeSearch, setActiveSearch] = useState([]);

    const handleSearch = (e) => {
        if (e.target.value === '') {
            setActiveSearch([]);
            return;
        }
        setActiveSearch(Words.filter(w => w.toLowerCase().includes(e.target.value.toLowerCase())).slice(0, 8));
    };

    return (
        <form className={searchStyle.searchbar}>
            
            <input
                type="search"
                placeholder='Search Category'
                className={searchStyle.inputSearch}
                onChange={handleSearch}
            />
            <button type="button" className={searchStyle.btnSearch}>
                <AiOutlineSearch />
            </button>
           
            {activeSearch.length > 0 && (
                <div className={searchStyle.listSearch}>
                    {activeSearch.map((s, index) => (
                        <span key={index}>{s}</span>
                    ))}
                </div>
            )}
        </form>
    );
};
export default SearchBar;


// import './Search.css'

// export default function SearchBar() {
//     return(
//         <div className="navbar navbar-dark bg-dark">
//             <h2 className="navbar-brand">Animated Search</h2>
//             <form className="w-75 text-end">
//                 <input type="text" className="border" placeholder="Search..." />
//             </form>
//         </div>
//     )
// }
