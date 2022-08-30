import axios from "axios";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";

import { Layout } from "../../components";
import { getError } from "../../utils";

function UsersScreen() {
  const queryClient = useQueryClient();
  const {
    loading,
    error,
    data: users,
  } = useQuery("all-users", async () => {
    const { data } = await axios.get("/api/admin/users");
    return data;
  });

  const { mutate, isLoading } = useMutation(
    async (id) => {
      await axios.delete(`/api/admin/users/delete?id=${id}`);
    },
    {
      onError: (err) => toast.error(getError(err)),
      onSuccess: () => {
        queryClient.invalidateQueries("all-users");
        toast.success("User deleted");
      },
    }
  );

  return (
    <Layout title="Users">
      <h1 className="mb-4 text-xl">Users</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert-error">{getError(error)}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b">
              <tr>
                <th className="px-5 text-left">ID</th>
                <th className="p-5 text-left">CREATED AT</th>
                <th className="p-5 text-left">NAME</th>
                <th className="p-5 text-left">EMAIL</th>
                <th className="p-5 text-left">ADMIN</th>
                <th className="p-5 text-left">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user._id}>
                  <td className="p-5">{user._id.substring(20, 24)}</td>
                  <td className="p-5">{user.createdAt.substring(0, 10)}</td>
                  <td className="p-5">{user.name}</td>
                  <td className="p-5">{user.email}</td>
                  <td className="p-5">{user.isAdmin ? "Yes" : "No"}</td>
                  <td className="p-5">
                    <button
                      className="danger-button"
                      loading={isLoading}
                      onClick={() => mutate(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
}

UsersScreen.auth = { adminOnly: true };
export default UsersScreen;
