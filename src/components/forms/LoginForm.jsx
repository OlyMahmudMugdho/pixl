import { useState } from "react"
import { useDispatch } from "react-redux";
import { setLoggedInUsername, setLoggedInUserID ,setLoggedIn, setStatus, setRefreshToken } from "./LoginSlice";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    let status = false;
    const res = await fetch("http://localhost:5000/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
          {
            "username": username,
            "password": password
          }
        ),
        credentials: 'include'
      })

    const response = await res.json();
    const refreshToken = await response.refreshToken;
    const message = await response.message;
    const data = await response.data;
    const userID = await data[0].userID;
    console.log(await userID);
    
    if (await refreshToken && await message) {
      console.log(message)
      status = true;
    }

    dispatch(setLoggedInUsername(username));
    const msg = "logged"
    /* () => { dispatch(setLoggedInUsername(username)) } */

    if (!status) {
      return
    }


    dispatch(setLoggedInUserID(userID))

    console.log(status)
    dispatch(setLoggedIn(true));
    dispatch(setStatus(msg));
    dispatch(setRefreshToken(refreshToken));

    const accessToken = fetch("http://localhost:5000/token",{
      credentials : 'include'
    })
    .then(res => res.json())

    // const accessToken = fetchAccessToken("http://localhost:5000/token");

    console.log( accessToken);
    console.log("logging accessToken from LoginForm.jsx");

    navigate('/home', { replace : true })

  }


  return (
    <div>
      <form className="flex flex-col justify-center items-center gap-1" onSubmit={handleLogin}>
        <input type="text" name="username" id="login-username" className="border-2 border-solid border-gray-300 dark:border-gray-700 dark:bg-zinc-800 h-12 px-2 " placeholder="username"
          onChange={e => setUsername(e.target.value)}
        />
        <input type="password" name="password" id="login-password" className="border-2 border-solid border-gray-300 h-12 px-2 dark:border-gray-700 dark:bg-zinc-800" placeholder="password"
          onChange={e => setPassword(e.target.value)}
        />
        <button className="bg-blue-400 dark:bg-teal-700 text-white w-full bold text-lg font-bold h-10 rounded my-2">Log in</button>
      </form>
    </div>
  )
}

export default LoginForm