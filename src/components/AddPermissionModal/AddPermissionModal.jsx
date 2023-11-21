//AddPermissionModal
import React, { useState } from 'react';
import './AddPermissionModal.css'

const AddPermissionModal = ({ showModal, onClose, onAddPermission, entities }) => {
    const [newPermission, setNewPermission] = useState('');

    //enter del input de permisos
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            // Lógica para manejar la tecla Enter
            handleAddPermission();
        }
    };

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
        <div
            className={`modal-overlay ${showModal ? 'show' : ''}`}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                    <div className="modal-header">
                        <label>Introduce el nuevo permiso:</label>
                        <input
                            type="text"
                            placeholder="ENTITY : PERMISSION"
                            value={newPermission}
                            onKeyDown={handleKeyDown}
                            onChange={(e) => setNewPermission(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                    <div className="modal-buttons">
                        <button className="modal-button" onClick={onClose}>
                            Cancelar
                        </button>
                        <button className="modal-button" onClick={handleAddPermission}>
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );


};

export default AddPermissionModal;
