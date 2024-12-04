import React from 'react';
import { FaSearch } from 'react-icons/fa';


const UserFilter = ({ searchQuery, handleSearchChange }) => {
    return (
        <div className="mb-3">
            <div className="input-group">
                <span className="input-group-text">
                    <FaSearch />
                </span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar usuario por nombre, email o teléfono"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                />
            </div>
        </div>
    );
};

export default UserFilter;
