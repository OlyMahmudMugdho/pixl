import { useEffect, useState } from "react";
import avatar from '../../../assets/avatar.png';
import Loading from "../Loading";
import SmallLoader from "../SmallLoader";

const Single = (props) => {
    const name = props.name;
    const accessToken = props.accessToken;
    const userID = props.userID;
    const [followed, setFollowed] = useState(false);
    const blue = "bg-blue-400  rounded text-white font-bold px-2 py-2 w-36 text-center ";
    const red = "bg-red-400 rounded text-white font-bold px-2 py-2 w-36  text-center ";

    const [profilePic, setProfilePic] = useState(null);
    const [loading, setLoading] = useState(true);

    console.log('on single')


    const fetchImg = () => {
        fetch(`https://instagram-cx9j.onrender.com/users/${userID}`, {
            headers: {
                'authorization': `Bearer ${accessToken}`,
                "Content-Type": "applications/json"
            },
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => (data.message) ? setProfilePic(data.message.foundUser.profilePicture) : setProfilePic(null))
            .then(() => setLoading(false))
    }
    useEffect(() => {

        for (let index = 0; index < 5; index++) {
            fetchImg();
        }
    }, [profilePic])


    const follow = (event) => {
        event.preventDefault();
        const data = fetch(`https://instagram-cx9j.onrender.com/follow/${userID}`, {
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
        const data = fetch(`https://instagram-cx9j.onrender.com/unfollow/${userID}`, {
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
        <div className="flex flex-row items-center justify-center flex-wrap w-full mb-4 border border-gray-200 py-6 px-4 gap-4">
            <div className="text-left w-3/4 text-lg text-gray-700 mr-5 flex justify-start items-center">
                {fetchImg()}
                {(loading === false && profilePic !== null) ? <img src={profilePic} alt="img" className="w-5 lg:w-10  rounded-full mx-2" /> : (loading && profilePic === null) ? <SmallLoader /> : <img src={avatar} className="w-5 lg:w-10  rounded-full mx-2" />}
                <a href="/home" className="mr-2"> {name}</a>
            </div>
            <div className="mr-5 w-3/4 text-left flex justify-start items-center">
                <button className={(followed) ? red : blue} onClick={(followed) ? unfollow : follow}>
                    {(followed) ? <>Unfollow</> : <>Follow</>}
                </button>
            </div>
        </div>
    )
}

export default Single