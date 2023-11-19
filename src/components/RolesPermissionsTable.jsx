// RolesPermissionsTable.js
import React, { useState, useEffect } from 'react';
import RolesTable from './RolesTable';
import AddPermissionModal from './AddPermissionModal';

const RolesPermissionsTable = ({ roles, permissions }) => {
    const [newRole, setNewRole] = useState('');
    const [showAddPermissionModal, setShowAddPermissionModal] = useState(false);
    const [updatedPermissions, setUpdatedPermissions] = useState(JSON.parse(JSON.stringify(permissions)));
    const [updatedRoles, setUpdatedRoles] = useState(JSON.parse(JSON.stringify(roles)));
    const [entities, setEntities] = useState([...new Set(permissions.map(permission => permission.split(":")[0]))]);
    const [selectedRole, setSelectedRole] = useState(null);
    const [selectAllPermissions, setSelectAllPermissions] = useState({});

    // Nuevos estados para el checkbox de entidades
    const [selectedEntity, setSelectedEntity] = useState(null);
    const [selectAllEntityPermissions, setSelectAllEntityPermissions] = useState({});

    useEffect(() => {
        // Inicializar selectAllEntityPermissions cuando el componente se monta
        const initialSelectAllEntityPermissions = entities.reduce((acc, entity) => {
            acc[entity] = false; // o true según tu lógica
            return acc;
        }, {});
        console.log("Initial Select All Entity Permissions:", initialSelectAllEntityPermissions);
        setSelectAllEntityPermissions(initialSelectAllEntityPermissions);

    }, [entities]);


    // Nueva función para manejar el mouseover sobre una entidad
    const handleEntityMouseOver = (entity) => {

        setSelectedEntity(entity);
    };

    // Nueva función para manejar el mouseout sobre una entidad
    const handleEntityMouseOut = () => {
        setSelectedEntity(null);
    };

    // Nueva función para asignar/quitar todos los permisos asociados a una entidad para todos los roles
    const handleSelectAllEntityPermissions = () => {
        if (selectedEntity) {
            setUpdatedRoles((prevRoles) => {
                return prevRoles.map((role) => {
                    const entityPrefix = `${selectedEntity}:`;

                    const updatedPermissions = selectAllEntityPermissions[selectedEntity]
                        ? role.permissions.filter(permission => !permission.startsWith(entityPrefix))
                        : [
                            ...role.permissions.filter(permission => !permission.startsWith(entityPrefix)),
                            ...getEntityPermissions(selectedEntity).map(action => `${selectedEntity}:${action}`),
                        ];

                    return {
                        ...role,
                        permissions: updatedPermissions,
                    };
                });
            });

            // Actualizar selectAllEntityPermissions
            setSelectAllEntityPermissions((prevPermissions) => {
                return {
                    ...prevPermissions,
                    [selectedEntity]: !prevPermissions[selectedEntity],
                };
            });
        }
    };



    //roles
    useEffect(() => {
        // Inicializar selectAllPermissions cuando el componente se monta
        const initialSelectAllPermissions = roles.reduce((acc, role) => {
            acc[role.id] = role.permissions.length > 0;
            return acc;
        }, {});
        setSelectAllPermissions(initialSelectAllPermissions);
    }, [roles]);
    //roles
    const handleRoleMouseOver = (role) => {
        setSelectedRole(role);
    };
    //roles
    const handleRoleMouseOut = () => {
        setSelectedRole(null);
    };
    //roles
    const handleSelectAllPermissions = () => {
        console.log("click")
        console.log(`roles actuales${JSON.stringify(updatedRoles)}`)
        console.log(`ROLES ORIGINALES:   ${JSON.stringify(roles)}`);
        if (selectedRole) {
            setUpdatedRoles((prevRoles) => {
                return prevRoles.map((role) => {
                    if (role.id === selectedRole.id) {
                        return {
                            ...role,
                            permissions: selectAllPermissions[selectedRole.id]
                                ? []
                                : [...updatedPermissions],
                        };
                    }
                    return role;
                });
            });

            // Actualizar selectAllPermissions
            setSelectAllPermissions((prevPermissions) => {
                return {
                    ...prevPermissions,
                    [selectedRole.id]: !prevPermissions[selectedRole.id],
                };
            });
        }
    };

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
        console.log(`roles actuales${JSON.stringify(updatedRoles)}`)
        console.log(`ROLES ORIGINALES:   ${JSON.stringify(roles)}`);
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

        console.log(`permisos actuales${updatedPermissions}`)
        console.log(`PERMISOS ORIGINALES:   ${permissions}`)
    };

    const getEntityPermissions = (entity) => {
        return updatedPermissions
            .filter(permission => permission.startsWith(`${entity}:`))
            .map(permission => permission.split(":")[1]);
    };

    return (
        <div>
            {/* Componente de la tabla de roles */}
            <RolesTable
                roles={roles}
                updatedRoles={updatedRoles}
                entities={entities}
                getEntityPermissions={getEntityPermissions}
                handleRoleMouseOver={handleRoleMouseOver}
                handleRoleMouseOut={handleRoleMouseOut}
                selectedRole={selectedRole}
                selectAllPermissions={selectAllPermissions}
                handleSelectAllPermissions={handleSelectAllPermissions}
                newRole={newRole}
                updatedPermissions={updatedPermissions}
                handleAddRole={handleAddRole}
                setShowAddPermissionModal={setShowAddPermissionModal}
                setNewRole={setNewRole}

                handleSelectAllEntityPermissions={handleSelectAllEntityPermissions}
                handleEntityMouseOut={handleEntityMouseOut}
                handleEntityMouseOver={handleEntityMouseOver}
                selectedEntity={selectedEntity}
                selectAllEntityPermissions={selectAllEntityPermissions}

            />

            {/* Componente del modal de agregar permisos */}
            <AddPermissionModal
                showModal={showAddPermissionModal}
                onClose={() => setShowAddPermissionModal(false)}
                onAddPermission={handleAddPermission}
                entities={entities}
            />
        </div>
    );
};

export default RolesPermissionsTable;
