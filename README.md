# React Roles and Permissions Management

## Descripción

Este proyecto implementa un componente en ReactJS que facilita la gestión de roles y permisos. El componente utiliza dos arreglos de entrada: uno para los roles y otro para los permisos asociados a esos roles. Proporciona una interfaz visual para asignar o quitar permisos a roles específicos, así como para agregar nuevos roles y permisos.

![image](https://github.com/bleach41/RolesPermisos/assets/78830055/10f820e8-baa1-4dba-aaa0-5afa320ef406)

## Ejemplo de Código

<!-- // src/components/RolesPermissionsTable/RolesPermissionsTable.jsx
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
    //VAR AND STATE
    //ROLL
    const [newRole, setNewRole] = useState('');
    const [selectedRole, setSelectedRole] = useState(null);
    const [updatedRoles, setUpdatedRoles] = useState(JSON.parse(JSON.stringify(roles)));
    const [selectAllPermissions, setSelectAllPermissions] = useState({});
    //PERMISSIONS
    const [updatedPermissions, setUpdatedPermissions] = useState(JSON.parse(JSON.stringify(permissions)));
    //ENTITIES
    const [entities, setEntities] = useState([...new Set(permissions.map(permission => permission.split(":")[0]))]);
    //MODAL
    const [showAddPermissionModal, setShowAddPermissionModal] = useState(false);


    //HANDLERS AND FUNCTIONS
    //ROLES
    useEffect(() => {........ -->

* el codigo esta organizado entorno a las tres variables fundamentales: roles, permisos y entidades 


# prueba unitaria

<!-- import { test } from 'vitest';
import { getEntityPermissions } from '../src/components/RolesPermissionsTable/RolesPermissionsTable'; // Cambia esto por la ruta real del archivo


test('returns proper permissions for a given entity', () => {
    const mockPermissions = ["STORE:READ"]
    const entity = 'STORE'
    const result = getEntityPermissions(mockPermissions, entity)


    expect(result).toEqual(['READ'])
}); -->

![image](https://github.com/bleach41/RolesPermisos/assets/78830055/de82d15f-4003-4b23-880c-6cded93c8a60)


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
