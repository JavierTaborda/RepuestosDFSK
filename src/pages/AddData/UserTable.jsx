import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getUsersEdit, putUserData } from '../../services/UserService';
import RoleDropdown from '../../components/UsersVen/RoleDropdown';
import UserFilter from '../../components/UsersVen/UserFilter';
import { FaEdit, FaUser, FaEnvelope, FaPhone, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Spinner from '../../components/forms/Spinner';


const UserTable = () => {
 

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editFormData, setEditFormData] = useState({
        idUsuario: '',
        username: '',
        nombre: '',
        email: '',
        telefono: '',
        idRol: '',
        estatus: true,
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [newpass, setNewPass] = useState('');
    const [newpass2, setNewPass2] = useState('');

    useEffect(() => {
        
        
        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                const response = await getUsersEdit();
                setUsers(response);
            } catch (error) {
                toast.error('Error al cargar usuarios: ' + error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleEdit = (user) => {
        setSelectedUser(user);
        setEditFormData({
            idUsuario: user.idUsuario || '',
            username: user.username || '',
            nombre: user.nombre || '',
            email: user.email || '',
            telefono: user.telefono || '',
            idRol: user.idRol || '',
            estatus: user.estatus || true,
        });
        setNewPass('');
        setNewPass2('');
        setShow(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    const handleRoleChange = (e) => {
        setEditFormData({ ...editFormData, idRol: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (newpass !== newpass2) {
                toast.error('Las contraseñas no coinciden');
                return;
            }
            const response = await putUserData(editFormData, newpass  );
            toast.success('Usuario actualizado exitosamente');
            setShow(false);
            setUsers(users.map((user) => (user.idUsuario === response.idUsuario ? response : user)));
            setEditFormData({
                idUsuario: '',
                username: '',
                nombre: '',
                email: '',
                telefono: '',
                idRol: '',
                estatus: true,
            });
        } catch (error) {
            toast.error('Error al actualizar usuario: ' + error.message);
        }
    };

    const handleSearchChange = (query) => {
        setSearchQuery(query);
    };

    const filteredUsers = users.filter(
        (user) =>
            user.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.telefono.includes(searchQuery)
    );


    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Lista de Usuarios</h2>
            <UserFilter searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
            {isLoading ? (
                <div className="d-flex justify-content-center">
                    <Spinner />
                </div>
            ) : (
                    <div className="table-responsive">
                <table className="table table-striped table-bordered shadow-sm p-3 mb-5 bg-body rounded ">
                    <thead>
                        <tr>
                            <th className="text-center bg-danger text-white"><FaUser className="me-2" />Rif/Cedula</th>
                            <th className="text-center bg-danger text-white"><FaUser className="me-2" />Nombre</th>
                            <th className="text-center bg-danger text-white"><FaEnvelope className="me-2" />Email</th>
                            <th className="text-center bg-danger text-white"><FaPhone className="me-2" />Teléfono</th>
                            <th className="text-center bg-danger text-white"><FaCheckCircle className="me-2" />Activo</th>
                            <th className="text-center bg-danger text-white "><FaEdit className="me-2" />Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.idUsuario}>
                                <td>{user.username}</td>
                                <td>{user.nombre}</td>
                                <td>{user.email}</td>
                                <td>{user.telefono}</td>
                                <td className='text-center'>{user.estatus ? <FaCheckCircle className="text-success" /> : <FaTimesCircle className="text-danger" />}</td>
                                <td className="text-center">
                               
                                    <button className="btn btn-warning" onClick={() => handleEdit(user)}>
                                        <FaEdit /> Editar 
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            )}
            {show && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered" role="document" style={{ width: '80%', maxHeight: '60%' }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Editar Usuario</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShow(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">Rif/Cedula</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            name="username"
                                            value={editFormData.username}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="nombre" className="form-label">Nombre</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="nombre"
                                            name="nombre"
                                            value={editFormData.nombre}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            value={editFormData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="telefono" className="form-label">Teléfono</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="telefono"
                                            name="telefono"
                                            value={editFormData.telefono}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="estatus" className="form-label">Estado</label>
                                        <select
                                            className="form-select"
                                            id="estatus"
                                            name="estatus"
                                            value={editFormData.estatus}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value={true}>Activo</option>
                                            <option value={false}>Inactivo</option>
                                        </select>
                                    </div>
                                    <RoleDropdown selectedRole={editFormData.idRol} handleRoleChange={handleRoleChange} />
                                    <div className="mt-3 mb-3">
                                        <div className="row">
                                            <div className="col-6">
                                                <label htmlFor="newpass" className="form-label">Contraseña</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="newpass"
                                                    name="newpass"
                                                    value={newpass}
                                                    onChange={(e) => setNewPass(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-6">
                                                <label htmlFor="newpass2" className="form-label">Confirmar Contraseña</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="newpass2"
                                                    name="newpass2"
                                                    value={newpass2}
                                                    onChange={(e) => setNewPass2(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-danger">Guardar Cambios</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserTable;
