import { useEffect, useState } from "react"
import Loading from "../layout/Loading";
import fetchAccessToken from "../../utils/fetchToken";
import { initialState } from "../forms/LoginSlice";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import avatar from '../../assets/avatar.png';
import like from '../../utils/likePost';
import Post from "./Post";

const Contents = () => {

    const [loaded, setLoaded] = useState(false);
    const [initialStage, setInitialStage] = useState(true);
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState([]);
    const [token, setToken] = useState(" ");
    const [liked, setLiked] = useState([]);
    const [likesLoaded, setLikesLoaded] = useState(false);
    const [fetching, setFetching] = useState(false);

    const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));

    const fetchToken = async () => {
        const data = await fetch("https://instagram-cx9j.onrender.com/token", {
            headers: {
                'Content-Type' : 'application/json'
            },
            credentials: "include"
        })

        const res = await data.json();
        const accessToken = await res.accessToken;

        if (await accessToken) {
            setToken(await accessToken);
        }

    }





    const fetchStatus = async () => {

        const req = await fetch(`https://instagram-cx9j.onrender.com/posts/${page}`, {
            headers: {
                "authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            credentials: 'include'
        })
        const res = await req.json();
        console.log(await res)
        if(await res.end) {
            console.log("end")
            setLoaded(true);
            return 
        }
        if (await res.data) {
            console.log(await res.data)
            setStatus([...status, ...res.data])
            setLoaded(true)
        }

    }

    const fetchAdditional = async () => {
        try {
            if (
                window.innerHeight + document.documentElement.scrollTop + 1 >=
                document.documentElement.scrollHeight
            ) {
                setLoaded(true);
                setPage((prev) => prev + 1);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => { 
        console.log('fetching...')
        fetchToken(); 
    }, [token])

    useEffect(() => {
        fetchStatus();
    }, [token,page])

    useEffect(() => {
        window.addEventListener("scroll", fetchAdditional);
        return () => window.removeEventListener("scroll", fetchAdditional);
    }, []);
  

     console.log(token)

    return (
        <div className="flex flex-col justify-center items-center w-full py-5 md:py-8">
            {(!loaded ? <Loading /> :
                <div>
                    { (status.length !== 0 ) ? status.map((item, i) => (item) ?
                        <Post key={i} item={item} avatar={avatar} token={token} i={i} />
                        : null
                    ) : <h1 className="text-2xl md:text-3xl py-20">Add friends to see posts</h1> }
                </div>
            )}


        </div>
    )
}


export default Contents