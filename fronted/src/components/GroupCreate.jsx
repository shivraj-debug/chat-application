import { useEffect, useState} from "react";
import Select from "react-select";

export default function GroupChat() {
  const [showModal, setShowModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [description, setDescription] = useState("");

  const url = import.meta.env.VITE_URL || "http://localhost:3000";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${url}/api/users`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        
        const options = data.users.map((user) => ({
          value: user._id,
          label: user.fullName,
        }));
        setAllUsers(options);
        
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchUsers();
  },[]);

  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) return;

    try {
      const res = await fetch(`${url}/api/group`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newGroupName,
          members:selectedMembers.map(member => member.value),
          description: description || "",
          avatar: "", // Add avatar logic if needed
          isPrivate: false, // Set to true if you want a private group
        }),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create group");
      }

      setShowModal(false);
      setNewGroupName("");
      setSelectedMembers("");
      setDescription("");
      // fetchGroups();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex -mt-4 -mr-5 text-3xl   ">
      <button
        onClick={() => setShowModal(true)}
        className=" text-white rounded-full p-4 hover:bg-gray-900"
      >
        +
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Create New Group</h3>
            <input
              type="text"
              placeholder="Group name"
              className="w-full border-2 text-lg bg-white shadow-sm focus:border-blue-700 focus px-3 py-2 rounded mb-3 text-black"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              className="w-full border-2 text-lg bg-white shadow-sm focus:border-blue-700 focus px-3 py-2 rounded mb-3 text-black"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Select
              isMulti
              options={allUsers}
              value={selectedMembers}
              onChange={(selected) => setSelectedMembers(selected)}
              className="react-select-container text-lg bg-blue-400"
              classNamePrefix={` react-select `}
              placeholder="Select members..."
            />

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-lg rounded bg-gray-600 hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateGroup}
                className="px-4 py-2 rounded bg-blue-500 text-lg text-white hover:bg-blue-600"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
