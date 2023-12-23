import React, { useState } from 'react';
import './App.css';
import PermissionForm from './Form';

export type RoleId = string;
export type PermissionId = string;
export type Permission = {
  "id": PermissionId;
  "name": string;
 };

 export type Role = {
  "id": RoleId;
  "name": string;
  "permissions": string[];
 };

const Data = require('./data.json');
const Roles: Role[] = Data["Roles"]
const Permissions: Permission[] = Data["Permissions"]

 function Heading({title} : {title: string;}){
  return <h1 className='App-header'>{title}</h1>
}

function ListOfRolesWithPermission({
  roles,
  activeRole
}:{
  roles: Role[],
  activeRole: Role,
}) {
  
  if (activeRole.permissions.includes("1")){ 
    return (
    <div className='Role-list'>
      <h3>Roles with Permissions </h3>
          {roles.map((role, index) => (
            
            <div className='role-permission-name' key={index}>
              <div className='role-name'>{role.name}:</div>
              <p className='permission-name'>{role.permissions.map((p_id,i)=>(
                Permissions.find((p) => p.id === p_id)?.name.concat(" ")
              ))}</p>
            </div>
          ))}
    </div>
  )}
  else{return <div ></div>}
}

function CurrentRoleState(
  {
    roles, 
    activeRole, 
    setActiveRole
  }:{
    roles: Role[], 
    activeRole: Role, 
    setActiveRole: React.Dispatch<React.SetStateAction<Role>>
  }) {
  return (
    <div  className='RoleState-header'>
      <div className='ActiveRole'><p className='ActiveRoleText'>Active User: </p><h3>{activeRole.name}</h3></div>
      <div>
        {roles.map((r,i) =>
          activeRole.name !== r.name && <button onClick={() => setActiveRole(r)}>
            Login as {r.name}
          </button>
        )}
      </div>
    </div>
  )
}

function EditRolePermission(
  { roles, 
    setRoles, 
    activeRole
  }:{
    roles: Role[], 
    activeRole: Role,
    setRoles: React.Dispatch<React.SetStateAction<Role[]>>
  }) {
  const [selectedRole, setSelectedRole] = useState<Role>(roles[0]);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(roles[0].permissions);
  if (activeRole.permissions.includes("2")){ 
    return (
      <div className='Edit-form'>
        <h3>Edit Permissions: </h3> 
        <PermissionForm 
        roles={roles} 
        setRoles={setRoles}
        permissions={Permissions}
        selectedRole={selectedRole} 
        setSelectedRole={setSelectedRole}
        selectedPermissions={selectedPermissions}
        setSelectedPermissions={setSelectedPermissions}
        ></PermissionForm>
      </div>
      
    )}
  else{return <div ></div>}
}


function App() {
  // var data = Func()
  // const Roles: Role[] = data["Roles"]
  const [roles, setRoles] = React.useState<Role[]>(Roles);
  const [activeRole, setActiveRole] = React.useState<Role>({
    "id": "2",
    "name": "Administrator",
    "permissions": ["1", "2", "3"],
    });

  return (
    <div className='App'>
      <Heading title='Role DashBoard'></Heading>
      <CurrentRoleState roles={roles} activeRole={activeRole} setActiveRole={setActiveRole}></CurrentRoleState>
      <EditRolePermission roles={roles} setRoles={setRoles} activeRole={activeRole}></EditRolePermission>
      <ListOfRolesWithPermission roles={roles} activeRole={activeRole}></ListOfRolesWithPermission>
    </div>
  );
}

export default App;
