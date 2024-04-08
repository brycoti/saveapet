import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Contexte from "../components/contexte";
import { login } from "../components/generic";

const Login = () => {
    const { setLoguejat } = useContext(Contexte)
    const [user, setUser] = useState({ email: "", password: "" })
    const redirect = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await login(user);

        if (!data.error) {
            setLoguejat(data)
            if (!data.already_logged) {
                redirect('/profile')


            } else {
                redirect('/')
            }

        }


    }

    return (<>
        <div>
            <form action={handleSubmit}>
                <div className="flex flex-col">
                    <div>Log In</div>
                    <div>
                        <label htmlFor="email"></label>
                        <input type="text" name="email" id="email" onChange={handleChange} value={user.email} />
                    </div>
                    <div>
                        <label htmlFor="password"></label>
                        <input type="password" name="password" id="password" onChange={handleChange} value={user.password} />
                    </div>
                    <button>Log In</button>
                </div>
            </form>
        </div>

    </>)
}

export default Login;