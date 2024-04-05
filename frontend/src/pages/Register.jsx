import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [newUser, setNewUser] = useState({ name: "", email: "", password: "" })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser({
            ...newUser,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

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