// src/components/RolesTable/RolesTable.jsx
// This component displays the role table.
import React from 'react';
import './RolesTable.css'

const RolesTable = ({
    //roles
    roles,
    newRole,
    setNewRole,
    updatedRoles,
    handleRoleMouseOver,
    handleRoleMouseOut,
    handleAddRole,
    selectedRole,
    handleSelectAllPermissionRoles,
    setUpdatedRoles,


    //permissions
    selectAllPermissions,
    handleSelectAllPermissions,
    handlePermissionMouseOver,
    handlePermissionMouseOut,
    updatedPermissions,
    selectAllPermissionRoles,
    selectedPermission,
    setUpdatedPermissions,

    //entities
    entities,
    getEntityPermissions,
    handleEntityMouseOver,
    handleEntityMouseOut,
    selectedEntity,
    selectAllEntityPermissions,
    handleSelectAllEntityPermissions,
    setEntities,


    //Mmodal
    setShowAddPermissionModal,

    //button save
    onSave
}) => {


    // Function to format a text according to the specified rules
    const formatText = (text) => {
        // Capitalize the first letter and convert the rest to lowercase
        const formattedText = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
        // Replace the underscore character with a blank space
        const finalText = formattedText.replace(/_/g, ' ');
        return finalText;
    };


    // Removal of permissions
    const handlePermissionDelete = (permission) => {
        // Filter permissions to exclude the current permission
        const updatedPermissionsAfterDeletion = updatedPermissions.filter(p => p !== permission);

        // Update permissions status
        setUpdatedPermissions(updatedPermissionsAfterDeletion);

        // Filter roles to exclude permissions associated with the current permission
        const updatedRolesAfterPermissionDeletion = updatedRoles.map(role => {
            return {
                ...role,
                permissions: role.permissions.filter(p => p !== permission),
            };
        });

        // Update role status
        setUpdatedRoles(updatedRolesAfterPermissionDeletion);

        // Filter the entities to exclude the current entity if it does not have permissions associated with it
        const entitiesWithPermissions = entities.filter(entity => {
            return updatedPermissionsAfterDeletion.some(p => p.startsWith(`${entity}:`));
        });

        // Update the state of the entities
        setEntities(entitiesWithPermissions);
        console.log(updatedRolesAfterPermissionDeletion)
    };




    // Deleting entities
    const handleDeleteEntity = (entity) => {
        // Filter the entities to exclude the current entity
        const updatedEntities = entities.filter(existingEntity => existingEntity !== entity);

        // Update the state of the entities
        setEntities(updatedEntities);

        // Filter permissions to exclude those associated with the current entity
        const updatedPermissionsAfterEntityDeletion = updatedPermissions.filter(permission => !permission.startsWith(`${entity}:`));

        // Update permissions status
        setUpdatedPermissions(updatedPermissionsAfterEntityDeletion);

        // Filter roles to exclude permissions associated with the current entity
        const updatedRolesAfterEntityDeletion = updatedRoles.map(role => {
            return {
                ...role,
                permissions: role.permissions.filter(permission => !permission.startsWith(`${entity}:`)),
            };
        });

        // Update role status
        setUpdatedRoles(updatedRolesAfterEntityDeletion);
        console.log(updatedRolesAfterEntityDeletion)
    };


    //elimination of roles
    const handleDeleteRole = (roleId) => {
        // Filter the roles to exclude the role with the roleId
        const updatedRolesAfterDeletion = updatedRoles.filter(role => role.id !== roleId);

        // Update role status
        setUpdatedRoles(updatedRolesAfterDeletion);
        console.log(updatedRolesAfterDeletion);
    };



    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th><img src="/vite.svg" alt="icono-vite" />➕<img src="/react.svg" alt="icono-react" /></th>
                        {entities.map(entity => (
                            <React.Fragment key={entity}>
                                <th colSpan={getEntityPermissions(entity).length}
                                    onMouseOver={() => handleEntityMouseOver(entity)} onMouseOut={handleEntityMouseOut}>
                                    {/* Checkbox to select/deselect all permissions for the entity */}

                                    <input
                                        type="checkbox"
                                        checked={selectAllEntityPermissions[entity] || false}
                                        onChange={handleSelectAllEntityPermissions}
                                    />

                                    {formatText(entity)}
                                    {selectedEntity === entity && (
                                        <img
                                            className="icon-trash"
                                            src="/MdiTrashCanOutline_blanco.svg"
                                            alt="Eliminar"
                                            onClick={() => handleDeleteEntity(entity)}

                                        />
                                    )}

                                </th>
                            </React.Fragment>
                        ))}

                        <th colSpan="2">
                            <div className="buttons">
                                <button onClick={() => setShowAddPermissionModal(true)}>➕ Permiso</button>
                                <button className="boton-save" onClick={onSave}>Salvar</button>
                            </div>
                        </th>
                    </tr>
                    <tr>
                        <th>Roles</th>
                        {entities.flatMap(entity => (
                            getEntityPermissions(entity).map(permission => (
                                <React.Fragment key={`${entity}_${permission}`}>
                                    <th key={`${entity}_${permission}`}
                                        onMouseOver={() => handlePermissionMouseOver(`${entity}:${permission}`)}
                                        onMouseOut={handlePermissionMouseOut}>
                                        <div className="check-nombre">
                                            <input
                                                type="checkbox"
                                                checked={selectAllPermissionRoles[`${entity}:${permission}`] || false}
                                                onChange={handleSelectAllPermissionRoles}

                                            />
                                            {formatText(permission)}
                                        </div>
                                        {/*delete icon */}
                                        {selectedPermission === `${entity}:${permission}` && (
                                            <img
                                                className="icon-trash"
                                                src="/MdiTrashCanOutline_blanco.svg"
                                                alt="Eliminar Permiso"
                                                onClick={() => handlePermissionDelete(`${entity}:${permission}`)}
                                            />
                                        )}


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
                                    {/* Checkbox to select/deselect all permissions for the role */}

                                    <input
                                        type="checkbox"
                                        checked={selectAllPermissions || false}
                                        onChange={handleSelectAllPermissions}

                                    />

                                    {role.name}
                                    {/*delete icon */}
                                    {selectedRole === role && (
                                        <img
                                            className="icon-trash"
                                            src="/MdiTrashCanOutline_blanco.svg"
                                            alt="Eliminar"
                                            onClick={() => handleDeleteRole(role.id)}

                                        />
                                    )}
                                </td>
                                {entities.flatMap(entity => (
                                    getEntityPermissions(entity).map(permission => (
                                        <React.Fragment key={`${entity}_${permission}`}>
                                            <td>
                                                {role.permissions.includes(`${entity}:${permission}`) ? '✔' : ''}
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
                                                    {updatedPermissions.includes(`${entity}:${permission}`) ? '✔' : ''}
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
                            {/* Field to enter the new role */}
                            <div className="flex-input">
                                <input
                                    type="text"
                                    value={newRole}
                                    onChange={(e) => setNewRole(e.target.value)}
                                    onKeyDown={(event) => event.key === 'Enter' && handleAddRole()}
                                    placeholder="Nuevo Rol"
                                />
                                <img className="agregar-rol" src="/TeenyiconsUpSolid.svg" alt="agregar-Rol" onClick={handleAddRole} />
                            </div>
                        </td>
                        <td colSpan={entities.length * 10}>

                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default RolesTable;
