import Actions from "../content/Actions";
import Slider from "./Slider";


const Post = (props) => {

    const item = props.item;
    const avatar = props.avatar;
    const token = props.token;
    const i = props.i;

    function extractYear(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        return year;
    }

    function extractMonth(dateString) {
        const date = new Date(dateString);
        const month = date.getMonth() + 1;
        return month;
    }

    function extractDay(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        return day;
    }

    return (
        <div  className="w-full h-auto flex flex-col items-center border border-gray-200 py-5  mb-5">
            <div className="flex gap-2 flex-row justify-start items-center w-full">
                <div>
                    {(item.profilePic) ? <img src={item.profilePic} /> : <img src={avatar} className="w-5 md:w-8 h-1/4 rounded-full mx-2" />}
                </div>
                <p className="text-left text-sm text-zinc-700 w-full flex items-center py-3 px-2">{item.author}   |   {extractDay(item.date)}-{extractMonth(item.date)}-{extractYear(item.date)}  </p>
            </div>
            <h1 className="text-left w-full flex items-center py-3 px-2">{item.content}</h1>

            <Slider images={item.imageUrl} />

            {/* <img src={item.imageUrl} alt="" className="w-full h-96 object-cover " style={{ height: "500px" }} /> */}

            <Actions userID={item.userID} postId={item.postId} token={token} likeNum={(item.likes) ? item.likes : 0} key={i} />

        </div>
    )
}

export default Post