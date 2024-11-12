import {ChangeEvent, useState} from "react";

interface Users {
    id: string;
    firstName: string;
    lastName: string;
}

const data = [{
    id: "1",
    firstName: "John",
    lastName: "Doe"
}, {
    id: '2',
    firstName: "Steve",
    lastName: "Smith"
}, {
    id: '3',
    firstName: "Martin",
    lastName: "Joseph"
}]

export const UsersDatabase = () => {
    const [selected, setSelected] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [filter, setFilter] = useState('');
    const [users, setUsers] = useState<Users[]>(data || [])

    const filteredUsers = users.filter((user) => user.firstName.toLowerCase().includes(filter.toLowerCase()) || user.lastName.toLowerCase().includes(filter.toLowerCase()));

    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const newSelected = e.target.value
        setSelected(newSelected)

        const foundUser = users.find((user) => user.id === newSelected)
        if (foundUser) {
            setFirstName(foundUser.firstName)
            setLastName(foundUser.lastName)
        }
    }

    const createUserHandler = () => {
        const newUser = {
            id: Date.now().toString(),
            firstName,
            lastName
        }
        setUsers((prev) => prev.concat(newUser))
        clearSelectionHandler()
    }

    const updateUserHandler = () => {
        const newUsers = [...users];
        const foundUser = newUsers.find(
            ({id}) => selected === id,
        );

        if (foundUser) {
            foundUser.firstName = firstName
            foundUser.lastName = lastName
            setUsers(newUsers)
        }
    }

    const deleteUserHandler = () => {
        const deleteUser = users.filter((user) => user.id !== selected)
        setUsers(deleteUser)
        clearSelectionHandler()
    }

    const clearSelectionHandler = () => {
        setSelected('')
        setFirstName('')
        setLastName('')
    }

    return (
        <>
            <div className='max-xl m-4'>
                <h1 className='text-2xl font-bold mb-4'>Users Database App</h1>
                <form>
                    {/* Search Input */}
                    <input type="text" placeholder="Search" className="p-1 border border-gray-500 rounded my-1"
                           value={filter}
                           onChange={(e) => setFilter(e.target.value)}/>

                    {/* Render list of users */}
                    <div className="flex flex-col border my-4  border-gray-500">
                        <select value={selected} onChange={handleSelect}>
                            {filteredUsers.map((user) => (
                                <option key={user.id} value={user.id} className="m-2 cursor-pointer">
                                    {user.firstName} {user.lastName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Form inputs */}
                    <div className="flex gap-4">
                        <input type="text" placeholder="First Name" value={firstName}
                               onChange={(e) => setFirstName(e.target.value)}
                               className="p-1 border border-gray-500 rounded my-1"/>
                        <input type="text" placeholder="Last Name" value={lastName}
                               onChange={(e) => setLastName(e.target.value)}
                               className="p-1 border border-gray-500 rounded my-1"
                        />
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-4 mt-4">
                        <button type="button" className="border border-gray-700 bg-gray-300 px-4 py-1 rounded"
                                onClick={createUserHandler}>Create
                        </button>
                        <button type="button" className="border border-yellow-700 bg-yellow-300 px-4 rounded"
                                onClick={updateUserHandler}>Update
                        </button>
                        <button type="button" className="border border-red-700 bg-red-500 text-white px-4 rounded"
                                onClick={deleteUserHandler}>Delete
                        </button>
                        <button type="button" className="border border-white bg-black text-white px-4 rounded"
                                onClick={clearSelectionHandler}>Cancel Selection
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}