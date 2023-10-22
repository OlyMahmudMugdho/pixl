import { useEffect, useState } from "react";
import Menu from "./Menu";
import Info from "../components/profile/self/Info";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Loading from "../components/layout/Loading";
import { faL } from "@fortawesome/free-solid-svg-icons";


const Profile = () => {

    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);
    const [tokenGot, setTokenGot] = useState(false);


    let accessToken;

    const loginState = JSON.parse(localStorage.getItem('userID'));
    const userID = loginState.userID

    const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
    console.log(refreshToken)

    console.log(userID)

    const fetchAccessToken = async () => {
        const req = await fetch("https://instagram-cx9j.onrender.com/token", {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })

        const res = await req.json();

        const data = await res;
        if (await data) {
            setToken(await data.accessToken)
            console.log(await data.accessToken)
            setTokenGot(true)
        }
    }

    const fetchUserInfo = async () => {
        const tokenReq = await fetch("https://instagram-cx9j.onrender.com/token", {
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        const tokenRes = await tokenReq.json();
        setToken(() => tokenRes.accessToken)
        const req = await fetch(`https://instagram-cx9j.onrender.com/users/${loginState.userID}`, {
            headers: {
                'authorization': `Bearer ${() => token}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })

        const res = await req.json();

        const data = await res;

        console.log(await data)


        if (await data.message) {
            console.log(await data)
            setUserInfo(await data.message.foundUser);
            (userInfo) ? setLoading(() => false) : null
        }
    }



    useEffect(() => {
        fetch("https://instagram-cx9j.onrender.com/token", {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                // Set the token and then proceed with the next fetch
                setToken(data.accessToken);

                // You can log the token here, and it will be the updated value
                console.log(data.accessToken);

                // Fetch user info after setting the token
                return fetch(`https://instagram-cx9j.onrender.com/users/${loginState.userID}`, {
                    headers: {
                        'authorization': `Bearer ${data.accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });
            })
            .then(res => res.json())
            .then(data => {
                // Set user info and log it
                console.log(data)
                setUserInfo(data.message.foundUser);
                console.log(data.message.foundUser);

                // Now, you can update loading state
                if (data.message.foundUser) {
                    setLoading(false);
                }


            })
            .catch(error => {
                // Handle any errors here
                console.error(error);
                setLoading(true);
            });
    }, [loginState.userID,refreshToken]); // You don't need 'token' as a dependency








    return (

        /*   className="md:w-2/5 md:ml-1 mx-6 flex flex-col justify-center items-center text-justify  " */
        <div className="relative">
            <div className="absolute left-0">
                <Menu />
            </div>
            <div className=" lg:ml-32">
                {(loading) ? <Loading className="lg:left-1/2 ml" /> : <Info userInfo={userInfo} token={token} />}

            </div>
        </div>

    )
}

export default Profile