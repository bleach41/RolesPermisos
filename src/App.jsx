import RolesPermissionsTable from "./components/RolesPermissionsTable";



function App() {



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
