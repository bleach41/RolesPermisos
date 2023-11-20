import RolesPermissionsTable from "./components/RolesPermissionsTable";



function App() {


  // //API
  // //POST /api/roles:
  // const createRoles = async (roles) => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_API_URL}/api/roles`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(roles),
  //     });

  //     const data = await response.json();
  //     console.log('Roles creados:', data);
  //   } catch (error) {
  //     console.error('Error al crear roles:', error);
  //   }
  // };

  // // Uso
  // const rolesToCreate = [
  //   { name: 'Nuevo Rol', permissions: ['READ', 'WRITE'] },
  //   // Otros roles que quieras crear
  // ];

  // createRoles(rolesToCreate);


  // //PUT /api/roles:
  // const updateRoles = async (roles) => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_API_URL}/api/roles`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(roles),
  //     });

  //     const data = await response.json();
  //     console.log('Roles actualizados:', data);
  //   } catch (error) {
  //     console.error('Error al actualizar roles:', error);
  //   }
  // };

  // // Uso
  // const rolesToUpdate = [
  //   { id: '1', name: 'Rol Actualizado', permissions: ['READ'] },
  //   // Otros roles que quieras actualizar
  // ];

  // updateRoles(rolesToUpdate);

  // //DELETE /api/roles:
  // const deleteRoles = async (roleIds) => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_API_URL}/api/roles`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(roleIds),
  //     });

  //     const data = await response.json();
  //     console.log('Roles eliminados:', data);
  //   } catch (error) {
  //     console.error('Error al eliminar roles:', error);
  //   }
  // };

  // // Uso
  // const roleIdsToDelete = ['1', '2', '3']; // IDs de los roles A eliminar

  // deleteRoles(roleIdsToDelete);




  const rolesArray = [
    { id: "1", name: "Admin", permissions: ["PROJECT:WRITE", "PROJECT:READ", "STORE:READ", "ACCOUNT:READ"] },
    { id: "2", name: "Admin2", permissions: [] },

    // Otros roles que se vayan agregando o sencillamente quitando
  ];
  const permissionsArray = [
    "PROJECT:WRITE",
    "PROJECT:READ",
    "STORE:READ",
    "ACCOUNT:READ"
    //ortos permisos que se vayan agregando o sencillamente quitando
  ];


  return (
    <>
      <RolesPermissionsTable roles={rolesArray} permissions={permissionsArray} />

    </>
  )
}

export default App
