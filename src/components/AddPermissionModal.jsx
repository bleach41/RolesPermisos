import React, { useState } from 'react';


const AddPermissionModal = ({ showModal, onClose, onAddPermission, entities }) => {
    const [newPermission, setNewPermission] = useState('');

    const handleAddPermission = () => {
        // Validar el nuevo permiso antes de agregarlo
        if (isValidPermission(newPermission, entities)) {
            onAddPermission(newPermission);
            onClose();
        } else {
            alert('Permiso inválido. Por favor, introduce un permiso válido.');
        }
    };

    const isValidPermission = (permission, entities) => {
        // Verificar si la cadena tiene el formato correcto (ENTITY:PERMISSION)
        const formatRegex = /^[A-Z_]+:[A-Z_]+$/;
        if (!formatRegex.test(permission)) {
            return false;
        }

        // Obtener la entidad del permiso (última parte antes de ":")
        const entity = permission.split(':')[0];

        // Verificar si la entidad ya existe en la lista de entidades
        if (entities.includes(entity)) {
            return true;  // La entidad existe, permitir la adición del permiso
        }

        // La entidad no existe, permitir la adición de la entidad y el permiso
        return true;
    };

    return (
        // Renderizar el modal con un input y un botón "Ok"
        // Puedes ajustar el diseño y los estilos según tus necesidades
        <div style={{ display: showModal ? 'block' : 'none' }}>
            <div>
                <label>Introduce el nuevo permiso:</label>
                <input
                    type="text"
                    value={newPermission}
                    onChange={(e) => setNewPermission(e.target.value)}
                />
            </div>
            <div>
                <button onClick={handleAddPermission}>OK</button>
                <button onClick={onClose}>Cancelar</button>
            </div>
        </div>
    );
};

export default AddPermissionModal;
