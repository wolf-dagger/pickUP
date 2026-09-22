import { useContext } from "react";
import AuthContext from "../context/authContext";

const AdminUserCard = ({ user, onDeleted, onRoleUpdated }) => {
  const { user: currentUser } = useContext(AuthContext);

  const handleDelete = async () => {
    if (currentUser?._id === user._id) {
      window.alert("You cannot delete your own account.");
      return;
    }

    if (!window.confirm(`Delete ${user.name}?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/auth/users/${user._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete user");
      }

      onDeleted(user._id);
    } catch (error) {
      window.alert(error.message);
    }
  };

  const handleMakeAdmin = async () => {
    if (!window.confirm(`Make ${user.name} an admin?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/auth/users/${user._id}/admin`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to make user admin");
      }

      onRoleUpdated(user._id, data.user);
      window.alert("User made admin successfully.");
    } catch (error) {
      window.alert(error.message);
    }
  };

  return (
    <>
      <div className="w-full bg-blue-950 rounded-lg flex justify-between items-center p-2">
        <div className="user-details flex flex-col gap-4">
          <h1 className="text-xl md:text-2xl uppercase">{user.name}</h1>
          <p className="text-lg">{user.email}</p>
          <p className="text-lg text-orange-500">Role: {user.role}</p>
        </div>
        <div className="user-actions flex justify-between items-center gap-5">
          <span
            title={
              user.role === "admin" ? "Admin cannot delete admin" : undefined
            }
          >
            <button
              className="px-4 py-2 ring ring-red-500 hover:bg-red-600 transition-colors duration-300 ease-in-out rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
              onClick={handleDelete}
              disabled={user.role === "admin"}
            >
              Delete
            </button>
          </span>
          <span
            title={
              user.role === "admin"
                ? "Admin cannot make admin admin"
                : undefined
            }
          >
            <button
              className="px-4 py-2 ring ring-green-500 hover:bg-green-600 transition-colors duration-300 ease-in-out rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
              disabled={user.role === "admin"}
              onClick={handleMakeAdmin}
            >
              Make Admin
            </button>
          </span>
        </div>
      </div>
    </>
  );
};

export default AdminUserCard;
