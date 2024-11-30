// noinspection t

import {ChangeEvent, useRef, useState} from "react";

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
    const [filter, setFilter] = useState('');
    const [users, setUsers] = useState<Users[]>(data || [])

    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);

    const filteredUsers = users.filter((user) => user.firstName.toLowerCase().includes(filter.toLowerCase()) || user.lastName.toLowerCase().includes(filter.toLowerCase()));


    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log("The submitted firstName is: " + firstNameRef.current?.value);
    };

    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const newSelected = e.target.value
        setSelected(newSelected)

        const foundUser = users.find((user) => user.id === newSelected)
        if (foundUser) {
            if (firstNameRef.current) firstNameRef.current.value = foundUser.firstName;
            if (lastNameRef.current) lastNameRef.current.value = foundUser.lastName;
        }
    }

    const createUserHandler = () => {
        const newFirstName = firstNameRef.current?.value || '';
        const newLastName = lastNameRef.current?.value || '';

        const newUser = {
            id: Date.now().toString(),
            firstName: newFirstName,
            lastName: newLastName,
        }
        setUsers((prev) => prev.concat(newUser))
        clearSelectionHandler()
    }

    const updateUserHandler = () => {
        const newFirstName = firstNameRef.current?.value || '';
        const newLastName = lastNameRef.current?.value || '';

        const newUsers = [...users];
        const foundUser = newUsers.find(
            ({id}) => selected === id,
        );

        if (foundUser) {
            foundUser.firstName = newFirstName;
            foundUser.lastName = newLastName;
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
        if (firstNameRef.current) firstNameRef.current.value = '';
        if (lastNameRef.current) lastNameRef.current.value = '';
    }

    return (
        <>
            <div className='max-xl m-4'>
                <h1 className='text-2xl font-bold mb-4'>Users Database App</h1>
                <div>
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
                    <form className="flex gap-4" onSubmit={handleSubmit}>
                        <input type="text" placeholder="First Name" ref={firstNameRef}
                               className="p-1 border border-gray-500 rounded my-1"/>
                        <input type="text" placeholder="Last Name" ref={lastNameRef}
                               className="p-1 border border-gray-500 rounded my-1"
                        />
                    </form>

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
                </div>
            </div>
        </>
    )
}
