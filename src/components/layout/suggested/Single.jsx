import { useEffect, useState } from "react";
import avatar from '../../../assets/avatar.png';
import Loading from "../Loading";
import SmallLoader from "../SmallLoader";

const Single = (props) => {
    const name = props.name;
    const accessToken = props.accessToken;
    const userID = props.userID;
    const [followed, setFollowed] = useState(false);
    const blue = "bg-blue-400  rounded text-white font-bold px-2 w-28 text-center ";
    const red = "bg-red-400 rounded text-white font-bold px-2 w-28  text-center ";

    const [profilePic, setProfilePic] = useState(null);
    const [loading, setLoading] = useState(true);


    const fetchImg = () => {
        fetch(`http://localhost:5000/users/${userID}`, {
            headers: {
                'authorization': `Bearer ${accessToken}`,
                "Content-Type": "applications/json"
            },
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => (data.message) ? setProfilePic(data.message.profilePicture) : setProfilePic(null))
            .then(() => setLoading(false))
    }
    useEffect(() => {

        for (let index = 0; index < 5; index++) {
            fetchImg();
        }
    }, [profilePic])


    const follow = (event) => {
        event.preventDefault();
        const data = fetch(`http://localhost:5000/follow/${userID}`, {
            headers: {
                "authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => (data.success) ? setFollowed(true) : setFollowed(false))
            .then(() => console.log(followed))
    }

    const unfollow = (event) => {
        event.preventDefault();
        const data = fetch(`http://localhost:5000/unfollow/${userID}`, {
            headers: {
                "authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => (data.success) ? setFollowed(false) : setFollowed(true))
            .then(() => console.log(followed))
    }

    return (
        <div className="flex w-full mb-4 border border-gray-200 py-6 px-4">
            <div className="text-left w-3/4 text-lg text-gray-700 mr-5 text-left flex justify-start items-center">
                {fetchImg()}
                {(loading===false && profilePic !== null) ? <img src={profilePic} alt="" className="w-5 md:w-10  rounded-full mx-2" /> : (loading && profilePic===null) ? <SmallLoader />  : <img src={avatar} className="w-5 md:w-10  rounded-full mx-2" />}
                <a href="/home" className="mr-2"> {name}</a>
            </div>
            <button className={(followed) ? red : blue} onClick={(followed) ? unfollow : follow}>
                {(followed) ? <>Unfollow</> : <>Follow</>}
            </button>
        </div>
    )
}

export default Single