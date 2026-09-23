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
      <div className="group relative w-full overflow-hidden rounded-3xl border border-blue-500/20 bg-linear-to-br from-slate-900 via-blue-950 to-slate-900 p-4 shadow-lg shadow-blue-950/30 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:shadow-xl hover:shadow-blue-500/15 md:p-5">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl transition-all duration-300 group-hover:bg-blue-400/20" />
        <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="user-details flex flex-col gap-2">
            <h1 className="text-xl font-semibold uppercase text-white md:text-2xl">
              {user.name}
            </h1>
            <p className="break-all text-sm text-slate-300 md:text-base">
              {user.email}
            </p>
            <p className="text-sm font-medium uppercase tracking-wider text-orange-400">
              Role: {user.role}
            </p>
          </div>
          <div className="user-actions flex flex-wrap items-center gap-3">
            <span
              title={
                user.role === "admin" ? "Admin cannot delete admin" : undefined
              }
            >
              <button
                className="cursor-pointer rounded-lg border border-red-500/70 px-4 py-2 text-sm font-medium text-white transition-colors duration-300 ease-in-out hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
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
                className="cursor-pointer rounded-lg border border-green-500/70 px-4 py-2 text-sm font-medium text-white transition-colors duration-300 ease-in-out hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
                disabled={user.role === "admin"}
                onClick={handleMakeAdmin}
              >
                Make Admin
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUserCard;
