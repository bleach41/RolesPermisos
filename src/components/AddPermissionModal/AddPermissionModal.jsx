// src/components/AddPermissionModal/AddPermissionModal.jsx
// This component shows the modal to add permissions.
import React, { useState } from 'react';
import './AddPermissionModal.css'

const AddPermissionModal = ({ showModal, onClose, onAddPermission, entities }) => {
    const [newPermission, setNewPermission] = useState('');

    //enter permissions input
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            // Lógica para manejar la tecla Enter
            handleAddPermission();
        }
    };

    const handleAddPermission = () => {
        // Validate the new permission before adding it
        if (isValidPermission(newPermission, entities)) {
            onAddPermission(newPermission);
            onClose();
        } else {
            alert('Permiso inválido. Por favor, introduce un permiso válido.');
        }
    };

    const isValidPermission = (permission, entities) => {
        // Check if the string is in the correct format (ENTITY:PERMISSION)
        const formatRegex = /^[A-Z_]+:[A-Z_]+$/;
        if (!formatRegex.test(permission)) {
            return false;
        }

        // Get the permission entity (last part before ":")
        const entity = permission.split(':')[0];

        // Check if the entity already exists in the entity list
        if (entities.includes(entity)) {
            return true;  // Entity exists, allow adding permission
        }

        // Entity does not exist, allow adding entity and permission
        return true;
    };

    return (
        // Render the modal with an input, an "Ok" and a "cancel" button
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
