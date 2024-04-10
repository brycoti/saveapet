import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../components/generic";

const Register = () => {
    const [newUser, setNewUser] = useState({ name: "", email: "", password: "", phonenumber: "", address: "" })
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

            <div>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <div>Registers</div>
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
                        <div>
                            <label htmlFor="phonenumber"></label>
                            <input type="text" name="phonenumber" id="phonenumber" onChange={handleChange} value={newUser.phonenumber} />
                        </div>
                        <div>
                            <label htmlFor="address"></label>
                            <input type="text" name="address" id="address" onChange={handleChange} value={newUser.address} />
                        </div>
                        <button>enviar</button>
                    </div>
                </form>
            </div>




        </div>
    </>)
}

export default Register;