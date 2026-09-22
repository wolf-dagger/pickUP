import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/authContext";
import AdminUserCard from "../components/AdminUserCard";

const AllUsers = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }

    const getAllUsers = async () => {
      try {
        const res = await fetch("/api/auth/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await res.json();
        console.log(data);
        setUsers(data.users || []);
      } catch (err) {
        console.log(err);
      }
    };

    getAllUsers();
  }, [user]);

  return (
    <>
      <div className="w-full mt-30 md:mt-35">
        <h1 className="uppercase text-center text-2xl md:text-5xl font-bold text-cyan-500 mb-10">
          All Users
        </h1>
        <div className="w-full flex justify-center items-center mb-5">
          <div className="ring-1 ring-blue-500 rounded-xl w-[98%] md:w-[70%] p-2 flex flex-col gap-4">
            {users.map((user) => (
              <AdminUserCard
                key={user._id}
                user={user}
                onDeleted={(deletedUserId) =>
                  setUsers((currentUsers) =>
                    currentUsers.filter(
                      (currentUser) => currentUser._id !== deletedUserId,
                    ),
                  )
                }
                onRoleUpdated={(updatedUserId, updatedUser) =>
                  setUsers((currentUsers) =>
                    currentUsers.map((currentUser) =>
                      currentUser._id === updatedUserId
                        ? { ...currentUser, ...updatedUser }
                        : currentUser,
                    ),
                  )
                }
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllUsers;
