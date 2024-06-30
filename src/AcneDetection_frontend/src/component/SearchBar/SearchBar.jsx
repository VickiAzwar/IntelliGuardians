import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { DataAcne } from '../Data/Data_Acne';
import searchStyle from './Search.module.css';

const SearchBar = () => {
    const [activeSearch, setActiveSearch] = useState([]);

    const handleSearch = (e) => {
        if (e.target.value === '') {
            setActiveSearch([]);
            return;
        }
        setActiveSearch(
            DataAcne.filter(data => 
                data.name.toLowerCase().includes(e.target.value.toLowerCase())
            ).slice(0, 8)
        );
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
                    {activeSearch.map((data) => (
                        <Link key={data.id} to={`/category/${data.id}`} className={searchStyle.listItem}>
                            <span>{data.name}</span>
                        </Link>
                    ))}
                </div>
            )}
        </form>
    );
};

export default SearchBar;
