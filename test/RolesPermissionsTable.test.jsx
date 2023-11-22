
import { test } from 'vitest';
import { getEntityPermissions } from '../src/components/RolesPermissionsTable/RolesPermissionsTable'; // Cambia esto por la ruta real del archivo


test('returns proper permissions for a given entity', () => {
    const mockPermissions = ["STORE:READ"]
    const entity = 'STORE'
    const result = getEntityPermissions(mockPermissions, entity)


    expect(result).toEqual(['READ'])
});

