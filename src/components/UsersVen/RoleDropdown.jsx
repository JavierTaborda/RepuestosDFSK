import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getDataRoles } from '../../services/UserService';
import Spinner from '../forms/Spinner';

const RoleDropdown = ({ selectedRole, handleRoleChange }) => {
    const [roles, setRoles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [roleActual, setroleActual] = useState('');

    useEffect(() => {
        const fetchRoles = async () => {

            if (roles.length > 0) return;
            setIsLoading(true);
            try {
                const response = await getDataRoles();
                setRoles(response);

                const selected = response.find((r) => r.idRol === selectedRole);
                if (selected) {
                    setroleActual(selected.rolName);
                }
            } catch (error) {
                toast.error('Error al cargar roles: ' + error.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchRoles();
    }, [handleRoleChange]);

    return (
        <div className="mb-3">
            <label htmlFor="idRol" className="form-label">Rol: {roleActual}</label>
            {isLoading ? (
                <div className="d-flex justify-content-center">
                    <Spinner />
                </div>
            ) : (
                <select
                    className="form-select"
                    id="idRol"
                    name="idRol"
                    value={selectedRole}
                    onChange={handleRoleChange}
                    required
                >
                    <option value="">Seleccione un rol</option>
                    {roles.map((role) => (
                        <option key={role.idRol} value={role.idRol}>
                            {role.rolName}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
};

export default RoleDropdown;
