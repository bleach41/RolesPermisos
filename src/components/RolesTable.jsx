// RolesTable.js
import React from 'react';

const RolesTable = ({
    roles,
    updatedRoles,
    entities,
    getEntityPermissions,
    handleRoleMouseOver,
    handleRoleMouseOut,
    selectedRole,
    selectAllPermissions,
    handleSelectAllPermissions,
    newRole,
    updatedPermissions,
    handleAddRole,
    setShowAddPermissionModal,
    setNewRole,
    handleEntityMouseOver,
    handleEntityMouseOut,
    selectedEntity,
    selectAllEntityPermissions,
    handleSelectAllEntityPermissions,

    selectedPermission,
    handlePermissionMouseOver,
    handlePermissionMouseOut,
    selectAllPermissionRoles,
    handleSelectAllPermissionRoles,
}) => {
    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    {entities.map(entity => (
                        <React.Fragment key={entity}>
                            <th colSpan={getEntityPermissions(entity).length}>
                                <div onMouseOver={() => handleEntityMouseOver(entity)} onMouseOut={handleEntityMouseOut}>
                                    {/* Checkbox para seleccionar/deseleccionar todos los permisos para la entidad */}
                                    {selectedEntity === entity && (
                                        <input
                                            type="checkbox"
                                            checked={selectAllEntityPermissions[entity]}
                                            onChange={handleSelectAllEntityPermissions}
                                        />
                                    )}
                                    {entity}
                                </div>
                            </th>
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
                                <th key={`${entity}_${permission}`}>
                                    <div onMouseOver={() => handlePermissionMouseOver(`${entity}:${permission}`)}
                                        onMouseOut={handlePermissionMouseOut}>
                                        {/* Checkbox para seleccionar/deseleccionar todos los roles para el permiso */}
                                        {selectedPermission === `${entity}:${permission}` && (
                                            <input
                                                type="checkbox"
                                                checked={selectAllPermissionRoles[`${entity}:${permission}`]}
                                                onChange={handleSelectAllPermissionRoles}
                                            />
                                        )}
                                        {permission}
                                    </div>
                                </th>
                            </React.Fragment>
                        ))
                    ))}
                </tr>
            </thead>
            <tbody>
                {updatedRoles.map(role => (
                    <React.Fragment key={role.id}>
                        <tr onMouseOver={() => handleRoleMouseOver(role)} onMouseOut={handleRoleMouseOut}>
                            <td>
                                {/* Checkbox para seleccionar/deseleccionar todos los permisos para el rol */}
                                {selectedRole === role && (
                                    <input
                                        type="checkbox"
                                        checked={selectAllPermissions}
                                        onChange={handleSelectAllPermissions}
                                    />
                                )}
                                {role.name}
                            </td>
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
                        {roles.some(existingRole => existingRole.name === newRole) && (
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
    );
};

export default RolesTable;
