import React, { ChangeEvent } from 'react';
import { Role, Permission } from './App';
import './App.css';

interface RoleFormProps {
  roles: Role[];
  setRoles: React.Dispatch<React.SetStateAction<Role[]>>;
  permissions: Permission[]
  selectedRole: Role;
  setSelectedRole: React.Dispatch<React.SetStateAction<Role>>;
  selectedPermissions: string[];
  setSelectedPermissions: React.Dispatch<React.SetStateAction<string[]>>;
}

const RoleForm: React.FC<RoleFormProps> = ({
  roles,
  setRoles,
  permissions,
  selectedRole,
  setSelectedRole,
  selectedPermissions,
  setSelectedPermissions,
}) => {
  const handleRoleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const roleId = event.target.value;
    const role = roles.find((r) => r.id === roleId);
    if (role) {
      setSelectedRole(role);
      setSelectedPermissions(role.permissions);
    }
  };

  const handlePermissionChange = (permissionId: string) => {
    setSelectedPermissions((prevPermissions) => {
      if (prevPermissions.includes(permissionId)) {
        return prevPermissions.filter((id) => id !== permissionId);
      } else {
        return [...prevPermissions, permissionId];
      }
    });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    selectedRole.permissions = selectedPermissions
    roles = roles.filter((r) => r.id !== selectedRole.id);
    roles = [...roles,selectedRole]
    roles.sort((a, b) => a.id.localeCompare(b.id))
    setRoles(roles)
  };
  return (
    <div>
    <form onSubmit={handleSubmit}>
        <div className='select'>
            <label className='label'>Select Role:</label>
            <select value={selectedRole.id} onChange={handleRoleChange}>
                {roles.map((role) => (
                    role.id !=="2" &&
                <option key={role.id} value={role.id}>
                    {role.name}
                </option>
                ))}
            </select>
       </div>
        <div className='checkbox-block'>
            <label className='label'>Permissions:</label>
            {permissions.map((p) => (
            <div key={p.id} className='checkbox'>
                <input
                type="checkbox"
                value={p.id}
                checked={selectedPermissions.includes(p.id)}
                onChange={() => handlePermissionChange(p.id)}
                />
                <label>{p.name}</label>
            </div>
            ))}
        </div>
      <button className='submit-button' type="submit">Submit</button>
    </form>
    </div>
  );
};

export default RoleForm;
