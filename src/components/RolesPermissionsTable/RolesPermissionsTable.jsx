// src/components/RolesPermissionsTable/RolesPermissionsTable.jsx
// This component manages the roles and permissions table.

import React, { useState, useEffect } from 'react';
import RolesTable from '../TableRoles/RolesTable';
import AddPermissionModal from '../AddPermissionModal/AddPermissionModal';


//function to test
export const getEntityPermissions = (updatedPermissions, entity) => {
    return updatedPermissions
        .filter(permission => permission.startsWith(`${entity}:`))
        .map(permission => permission.split(":")[1]);
};

const RolesPermissionsTable = ({ roles, permissions }) => {
    const [newRole, setNewRole] = useState('');
    const [showAddPermissionModal, setShowAddPermissionModal] = useState(false);
    const [updatedPermissions, setUpdatedPermissions] = useState(JSON.parse(JSON.stringify(permissions)));
    const [updatedRoles, setUpdatedRoles] = useState(JSON.parse(JSON.stringify(roles)));
    const [entities, setEntities] = useState([...new Set(permissions.map(permission => permission.split(":")[0]))]);
    const [selectedRole, setSelectedRole] = useState(null);
    const [selectAllPermissions, setSelectAllPermissions] = useState({});


    //ROLES
    useEffect(() => {
        // Initialize select All Permissions when the component is mounted
        const initialSelectAllPermissions = roles.reduce((acc, role) => {
            acc[role.id] = role.permissions.length > 0;
            return acc;
        }, {});
        setSelectAllPermissions(initialSelectAllPermissions);
    }, [roles]);

    //MouseOvers roles
    const handleRoleMouseOver = (role) => {
        setSelectedRole(role);
    };

    const handleRoleMouseOut = () => {
        setSelectedRole(null);
    };

    // function to assign/remove all permisssion to a rol
    const handleSelectAllPermissions = () => {

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

            // Update selectAllPermissions
            setSelectAllPermissions((prevPermissions) => {
                return {
                    ...prevPermissions,
                    [selectedRole.id]: !prevPermissions[selectedRole.id],
                };
            });
        }
    };

    //add rol
    const handleAddRole = () => {
        // Validate that the name of the new role is not empty
        if (newRole.trim() === '') {
            alert('Por favor, introduce un nombre válido para el nuevo rol.');
            return;
        }

        // Check if the new role already exists
        if (updatedRoles.some(role => role.name.toLowerCase() === newRole.toLowerCase())) {
            alert('Ya existe un rol con ese nombre. Por favor, elige un nombre diferente.');
            return;
        }

        // Get read permissions for all entities, including new ones
        const readPermissions = entities.flatMap(entity => {
            const readPermission = `${entity}:READ`;
            return updatedPermissions.includes(readPermission) ? [readPermission] : [];
        });

        // Add logic to add a new role with read permissions
        const newRoleObject = {
            id: (updatedRoles.length + 1).toString(),
            name: newRole,
            permissions: readPermissions,
        };

        // Update role status
        setUpdatedRoles([...updatedRoles, newRoleObject]);

        // Clear new role field after addition
        setNewRole('');

    };


    //PERMISSIONS
    // New states for the PERMISSIONS checkbox
    const [selectedPermission, setSelectedPermission] = useState(null);
    const [selectAllPermissionRoles, setSelectAllPermissionRoles] = useState({});

    useEffect(() => {

        // Initialize selectAllPermissionRoles when the component is mounted
        const initialSelectAllPermissionRoles = permissions.reduce((acc, permission) => {
            acc[permission] = false; //unmarked
            return acc;
        }, {});
        setSelectAllPermissionRoles(initialSelectAllPermissionRoles);
    }, [permissions]);

    //obtaining permission
    const getEntityPermissions = (entity) => {
        return updatedPermissions
            .filter(permission => permission.startsWith(`${entity}:`))
            .map(permission => permission.split(":")[1]);
    };

    //MouseOvers permisssions
    const handlePermissionMouseOver = (permission) => {
        setSelectedPermission(permission);
    };

    const handlePermissionMouseOut = () => {
        setSelectedPermission(null);
    };

    // function to assign/remove a permission to all roles
    const handleSelectAllPermissionRoles = () => {
        if (selectedPermission) {
            setUpdatedRoles((prevRoles) => {
                const allRolesHavePermission = prevRoles.every((role) =>
                    role.permissions.includes(selectedPermission)
                );

                const updatedRoles = prevRoles.map((role) => {
                    const hasPermission = role.permissions.includes(selectedPermission);

                    return {
                        ...role,
                        permissions: allRolesHavePermission
                            ? role.permissions.filter((p) => p !== selectedPermission)
                            : selectAllPermissionRoles[selectedPermission] || !hasPermission
                                ? [...role.permissions, selectedPermission]
                                : role.permissions,
                    };
                });

                return updatedRoles;
            });

            setSelectAllPermissionRoles((prevPermissions) => {
                console.log("Roles actuales", updatedRoles);
                console.log("ROLES ORIGINALES:  ", roles);
                return {
                    ...prevPermissions,
                    [selectedPermission]: !prevPermissions[selectedPermission],
                };
            });
        }
    };

    //ENTITIES
    // New states for the entities checkbox
    const [selectedEntity, setSelectedEntity] = useState(null);
    const [selectAllEntityPermissions, setSelectAllEntityPermissions] = useState({});

    useEffect(() => {
        // Initialize selectAllEntityPermissions when the component is mounted
        const initialSelectAllEntityPermissions = entities.reduce((acc, entity) => {
            acc[entity] = false; //unmarked
            return acc;
        }, {});
        console.log("Initial Select All Entity Permissions:", initialSelectAllEntityPermissions);
        setSelectAllEntityPermissions(initialSelectAllEntityPermissions);

    }, [entities]);

    //MouseOvers entities
    const handleEntityMouseOver = (entity) => {

        setSelectedEntity(entity);
    };

    const handleEntityMouseOut = () => {
        setSelectedEntity(null);
    };

    //function to assign/remove all permissions associated with an entity for all roles
    const handleSelectAllEntityPermissions = () => {
        if (selectedEntity) {
            setUpdatedRoles((prevRoles) => {
                // Get the full list of permissions for the selected entity
                const entityPermissions = getEntityPermissions(selectedEntity);

                // Check if all roles already have all those permissions assigned
                const allRolesHaveAllPermissions = prevRoles.every((role) =>
                    entityPermissions.every(permission =>
                        role.permissions.includes(`${selectedEntity}:${permission}`)
                    )
                );

                // Update the roles based on the previous check
                const updatedRoles = prevRoles.map((role) => {
                    const entityPrefix = `${selectedEntity}:`;

                    const updatedPermissions = allRolesHaveAllPermissions
                        ? role.permissions.filter(permission => !permission.startsWith(entityPrefix))
                        : [
                            ...entityPermissions.map(action => `${selectedEntity}:${action}`),
                            ...role.permissions.filter(permission => !permission.startsWith(entityPrefix)),
                        ];

                    return {
                        ...role,
                        permissions: updatedPermissions,
                    };
                });

                return updatedRoles;
            });

            // Update selectAllEntityPermissions
            setSelectAllEntityPermissions((prevPermissions) => {
                return {
                    ...prevPermissions,
                    [selectedEntity]: !prevPermissions[selectedEntity],
                };
            });
        }
    };

    //add permission and entity
    const handleAddPermission = (newPermission) => {
        const [entity, permission] = newPermission.split(':')

        // Check if the permission already exists for the entity
        if (updatedPermissions.includes(newPermission)) {
            alert('Este permiso ya existe para la entidad.')
            return; // Don't add the permission again
        }

        // Validate if the entity already exists
        if (!entities.includes(entity)) {
            // The entity does not exist, add it
            setEntities([...entities, entity]);

            // Update selectAllEntityPermissions
            setSelectAllEntityPermissions((prevPermissions) => {
                return {
                    ...prevPermissions,
                    [entity]: false,
                }
            })
        }

        // Add the new permission to the state
        setUpdatedPermissions([...updatedPermissions, newPermission])

        // Add the new permission to all roles
        setUpdatedRoles((prevRoles) => {
            return prevRoles.map((role) => {
                const entityPrefix = `${entity}:`

                return {
                    ...role,
                    permissions: [
                        ...role.permissions,
                        selectAllEntityPermissions[entity] ? '' : `${entityPrefix}${permission}`,
                    ],
                };
            });
        });

        // Close the modal
        setShowAddPermissionModal(false);
    }



    // New function to handle the click on the "Save" button
    const handleSave = () => {
        // Returns the array updated with roles and permissions
        const result = { roles: updatedRoles, permissions: updatedPermissions };
        console.log('Resultado de la función handleSave:', result);//UNICO CONSOL.LOG() QUE DA COMO RESULTADO UN TEST COMPLETO
        return result;
    }



    return (
        <div>
            {/* Componente de la tabla de roles */}
            <RolesTable
                //ROLES
                roles={roles}
                newRole={newRole}
                setNewRole={setNewRole}
                updatedRoles={updatedRoles}
                setUpdatedRoles={setUpdatedRoles}
                handleRoleMouseOver={handleRoleMouseOver}
                handleRoleMouseOut={handleRoleMouseOut}
                selectedRole={selectedRole}
                handleAddRole={handleAddRole}
                handleSelectAllPermissionRoles={handleSelectAllPermissionRoles}


                //PERMISIONS
                updatedPermissions={updatedPermissions}
                selectedPermission={selectedPermission}
                handlePermissionMouseOver={handlePermissionMouseOver}
                handlePermissionMouseOut={handlePermissionMouseOut}
                setUpdatedPermissions={setUpdatedPermissions}
                handleSelectAllPermissions={handleSelectAllPermissions}
                selectAllPermissionRoles={selectAllPermissionRoles}


                //ENTITIES
                entities={entities}
                setEntities={setEntities}
                getEntityPermissions={getEntityPermissions}
                selectAllPermissions={selectAllPermissions}
                handleSelectAllEntityPermissions={handleSelectAllEntityPermissions}
                handleEntityMouseOut={handleEntityMouseOut}
                handleEntityMouseOver={handleEntityMouseOver}
                selectedEntity={selectedEntity}
                selectAllEntityPermissions={selectAllEntityPermissions}


                //MODAL
                setShowAddPermissionModal={setShowAddPermissionModal}

                //BUTTON SAVE
                onSave={handleSave}

            />

            {/* Add permissions modal component */}
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
