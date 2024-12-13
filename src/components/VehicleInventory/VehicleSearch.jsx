import React from 'react';

const VehicleSearch = ({ searchQuery, handleSearchChange }) => {
    return (
        <div className="mb-4">
            <input
                type="text"
                className="form-control vehicle-search-input"
                placeholder="Buscar vehículos..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
            />
        </div>
    );
};

export default VehicleSearch;
