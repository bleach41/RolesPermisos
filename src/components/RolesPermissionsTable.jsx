// Dentro del componente RolesPermissionsTable
import React, { useState } from 'react';
import AddPermissionModal from './AddPermissionModal';

const RolesPermissionsTable = ({ roles, permissions }) => {

    const [newRole, setNewRole] = useState('');
    const [showAddPermissionModal, setShowAddPermissionModal] = useState(false);
    const [updatedPermissions, setUpdatedPermissions] = useState(permissions);
    const [updatedRoles, setUpdatedRoles] = useState(roles);
    const [entities, setEntities] = useState([...new Set(permissions.map(permission => permission.split(":")[0]))]);


    const handleAddRole = () => {
        // Validar que el nombre del nuevo rol no esté vacío
        if (newRole.trim() === '') {
            alert('Por favor, introduce un nombre válido para el nuevo rol.');
            return;
        }

        // Verificar si el nuevo rol ya existe
        if (updatedRoles.some(role => role.name.toLowerCase() === newRole.toLowerCase())) {
            alert('Ya existe un rol con ese nombre. Por favor, elige un nombre diferente.');
            return;
        }

        // Añadir lógica para agregar un nuevo rol con permisos por defecto
        const newRoleObject = {
            id: (updatedRoles.length + 1).toString(),
            name: newRole,
            permissions: permissions.filter(permission => permission.includes('READ'))
        };

        // Actualizar el estado de los roles
        setUpdatedRoles([...updatedRoles, newRoleObject]);

        // Limpiar el campo de nuevo rol después de la adición
        setNewRole('');
        console.log(updatedRoles)

    };
    const handleAddPermission = (newPermission) => {

        // Obtener la entidad y el permiso del nuevo permiso
        const [entity, permission] = newPermission.split(':');


        // Validar si la entidad ya existe
        if (!entities.includes(entity)) {
            // La entidad no existe, agregarla
            setEntities([...entities, entity]);

        }
        // Añadir el nuevo permiso al estado
        setUpdatedPermissions([...updatedPermissions, newPermission]);

        // Cerrar el modal
        setShowAddPermissionModal(false);

        console.log("permisos actualizados" + updatedPermissions)
    };

    const renderTable = () => {

        return (
            <table>
                <thead>
                    <tr>
                        <th></th>
                        {entities.map(entity => (
                            <React.Fragment key={entity}>
                                <th colSpan={getEntityPermissions(entity).length}>{entity}</th>
                            </React.Fragment>
                        ))}
                        <th colSpan="2">
                            <button onClick={() => setShowAddPermissionModal(true)}>Añadir Nuevo Permiso</button>
                        </th>
                    </tr>
                    <tr>
                        <th>Roles</th>
                        {entities.flatMap(entity => (
                            getEntityPermissions(entity).map(permission => (
                                <React.Fragment key={`${entity}_${permission}`}>
                                    <th key={`${entity}_${permission}`}>{permission}</th>
                                </React.Fragment>
                            ))
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {updatedRoles.map(role => (
                        <React.Fragment key={role.id}>
                            <tr>
                                <td>{role.name}</td>
                                {entities.flatMap(entity => (
                                    getEntityPermissions(entity).map(permission => (
                                        <React.Fragment key={`${entity}_${permission}`}>
                                            <td>
                                                {role.permissions.includes(`${entity}:${permission}`) ? 'X' : ''}
                                            </td>
                                        </React.Fragment>
                                    ))
                                ))}
                            </tr>
                            {role.name === newRole && (
                                <tr>
                                    <td></td>
                                    {entities.flatMap(entity => (
                                        getEntityPermissions(entity).map(permission => (
                                            <React.Fragment key={`${entity}_${permission}`}>
                                                <td>
                                                    {updatedPermissions.includes(`${entity}:${permission}`) ? 'X' : ''}
                                                </td>
                                            </React.Fragment>
                                        ))
                                    ))}
                                    <td colSpan="2"></td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td>
                            {/* Campo para ingresar el nuevo rol */}
                            <input
                                type="text"
                                value={newRole}
                                onChange={(e) => setNewRole(e.target.value)}
                                placeholder="Nuevo Rol"
                            />
                        </td>
                        <td colSpan={entities.length * 2}>
                            <button onClick={handleAddRole}>Añadir Nuevo Rol</button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        )
    };

    const getEntityPermissions = (entity) => {
        return updatedPermissions
            .filter(permission => permission.startsWith(`${entity}:`))
            .map(permission => permission.split(":")[1]);
    };



    return (
        <div>
            {renderTable()}

            {showAddPermissionModal && (
                <AddPermissionModal
                    showModal={showAddPermissionModal}
                    onClose={() => setShowAddPermissionModal(false)}
                    onAddPermission={handleAddPermission}
                    entities={entities}
                />
            )}
        </div>
    )
}

export default RolesPermissionsTable;
