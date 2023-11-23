// RolesTable.js
import React, { useState } from 'react';
import './RolesTable.css'

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

    setUpdatedRoles,

    setEntities,
    setUpdatedPermissions,

    onSave
}) => {


    // //enter del input de roles
    // const handleKeyDown = (event) => {
    //     if (event.key === 'Enter') {
    //         // Lógica para manejar la tecla Enter
    //         handleAddRole();
    //     }
    // };


    // Función para formatear un texto según las reglas especificadas
    const formatText = (text) => {
        // Capitalizar la primera letra y convertir el resto en minúsculas
        const formattedText = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
        // Sustituir el carácter de subrayado por un espacio en blanco
        const finalText = formattedText.replace(/_/g, ' ');
        return finalText;
    };


    // Eliminación de permisos
    const handlePermissionDelete = (permission) => {
        // Filtrar los permisos para excluir el permiso actual
        const updatedPermissionsAfterDeletion = updatedPermissions.filter(p => p !== permission);

        // Actualizar el estado de los permisos
        setUpdatedPermissions(updatedPermissionsAfterDeletion);

        // Filtrar los roles para excluir los permisos asociados al permiso actual
        const updatedRolesAfterPermissionDeletion = updatedRoles.map(role => {
            return {
                ...role,
                permissions: role.permissions.filter(p => p !== permission),
            };
        });

        // Actualizar el estado de los roles
        setUpdatedRoles(updatedRolesAfterPermissionDeletion);

        // Filtrar las entidades para excluir la entidad actual si no tiene permisos asociados
        const entitiesWithPermissions = entities.filter(entity => {
            return updatedPermissionsAfterDeletion.some(p => p.startsWith(`${entity}:`));
        });

        // Actualizar el estado de las entidades
        setEntities(entitiesWithPermissions);
        console.log(updatedRolesAfterPermissionDeletion)
    };




    // Eliminación de entidades
    const handleDeleteEntity = (entity) => {
        // Filtrar las entidades para excluir la entidad actual
        const updatedEntities = entities.filter(existingEntity => existingEntity !== entity);

        // Actualizar el estado de las entidades
        setEntities(updatedEntities);

        // Filtrar los permisos para excluir los asociados a la entidad actual
        const updatedPermissionsAfterEntityDeletion = updatedPermissions.filter(permission => !permission.startsWith(`${entity}:`));

        // Actualizar el estado de los permisos
        setUpdatedPermissions(updatedPermissionsAfterEntityDeletion);

        // Filtrar los roles para excluir los permisos asociados a la entidad actual
        const updatedRolesAfterEntityDeletion = updatedRoles.map(role => {
            return {
                ...role,
                permissions: role.permissions.filter(permission => !permission.startsWith(`${entity}:`)),
            };
        });

        // Actualizar el estado de los roles
        setUpdatedRoles(updatedRolesAfterEntityDeletion);
        console.log(updatedRolesAfterEntityDeletion)
    };


    //eliminacion de roles
    const handleDeleteRole = (roleId) => {
        // Filtrar los roles para excluir el rol con el roleId
        const updatedRolesAfterDeletion = updatedRoles.filter(role => role.id !== roleId);

        // Actualizar el estado de roles
        setUpdatedRoles(updatedRolesAfterDeletion);
        console.log(updatedRolesAfterDeletion);
    };

    // const handleRoleIconMouseOver = (role) => {
    //     handleRoleMouseOver(role);
    // };

    // const handleRoleIconMouseOut = () => {
    //     handleRoleMouseOut();
    // };





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
                                    {/* Checkbox para seleccionar/deseleccionar todos los permisos para la entidad */}

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
                                        // onMouseOver={() => handleRoleIconMouseOver(role)}
                                        // onMouseOut={handleRoleIconMouseOut}
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
                                        {/* Añadir el ícono de eliminación */}
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
                                    {/* Checkbox para seleccionar/deseleccionar todos los permisos para el rol */}

                                    <input
                                        type="checkbox"
                                        checked={selectAllPermissions || false}
                                        onChange={handleSelectAllPermissions}

                                    />

                                    {role.name}
                                    {/* Añadir el ícono de eliminación */}
                                    {selectedRole === role && (
                                        <img
                                            className="icon-trash"
                                            src="/MdiTrashCanOutline_blanco.svg"
                                            alt="Eliminar"
                                            onClick={() => handleDeleteRole(role.id)}
                                        // onMouseOver={() => handleRoleIconMouseOver(role)}
                                        // onMouseOut={handleRoleIconMouseOut}
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
                            {/* Campo para ingresar el nuevo rol */}
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
