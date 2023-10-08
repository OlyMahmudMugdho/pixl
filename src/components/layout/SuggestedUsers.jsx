import { useEffect } from "react";
import { useState } from "react";
import Loading from "./Loading";
import SuggestedSingleUser from "./SuggestedSingleUser";
import Single from "./suggested/Single";

const SuggestedUsers = (props) => {

  const accessToken = props.accessToken;
  const [loading, setLoading] = useState(true);
  const [userIDs, setUserIDs] = useState([]);
  const [usernames, setUsernames] = useState([]);
  const [names, setNames] = useState([]);

  console.log('on suggested')

  useEffect(() => {
    const request = fetch("https://instagram-cx9j.onrender.com/users", {
      headers: {
        "authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => { setUserIDs(data.data.userIDs); setUsernames(data.data.usernames); setNames(data.data.names); setLoading(false); return data; })
      .then(() => console.log(userIDs))
  }, [])

  return (
    <div className="hidden lg:flex flex-col right-0 border w-1/4 justify-center items-center fixed min-h-full">
      <h1 className="text-3xl font-medium pb-20 text-zinc-600">People you may know</h1>
      {loading ? <Loading /> :

        <div className="flex flex-col gap-1 w-full px-2">
           {(userIDs.length !== 0) ? names.map((item,id) => <Single key={id} accessToken={accessToken} name={item} userID={userIDs[id]} /> ) : <h1> no users</h1>}
        </div>
      }
    </div>
  )
}

export default SuggestedUsers