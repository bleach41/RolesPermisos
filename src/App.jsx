import RolesPermissionsTable from "./components/RolesPermissionsTable";



function App() {



  const rolesArray = [
    { id: "1", name: "Admin", permissions: ["PROJECT:WRITE", "PROJECT:READ", "STORE:READ", "ACCOUNT:READ"] },
    { id: "2", name: "Admin2", permissions: [] },

    // Otros roles...
  ];
  const permissionsArray = [
    "PROJECT:WRITE",
    "PROJECT:READ",
    "STORE:READ",
    "ACCOUNT:READ"
  ];


  return (
    <>
      <RolesPermissionsTable roles={rolesArray} permissions={permissionsArray} />

    </>
  )
}

export default App
