import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [user, setUser] = useState({ email: "", password: "" })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

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