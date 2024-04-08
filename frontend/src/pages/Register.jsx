import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../components/generic";

const Register = () => {
    const [newUser, setNewUser] = useState({ name: "", email: "", password: "" })
    const redirect = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser({
            ...newUser,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await createUser(newUser);

        if (success) redirect('/login')

    }

    return (<>
        <div>
            <form action="submit">
                <div>
                    <form action={handleSubmit}>
                        <div className="flex flex-col">
                            <div>
                                <label htmlFor="name"></label>
                                <input type="text" name="name" id="name" onChange={handleChange} value={newUser.name} />
                            </div>
                            <div>
                                <label htmlFor="email"></label>
                                <input type="text" name="email" id="email" onChange={handleChange} value={newUser.email} />
                            </div>
                            <div>
                                <label htmlFor="password"></label>
                                <input type="password" name="password" id="password" onChange={handleChange} value={newUser.password} />
                            </div>
                            <button></button>
                        </div>
                    </form>
                </div>


            </form>

        </div>
    </>)
}

export default Register;