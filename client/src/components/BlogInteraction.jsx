import { useContext, useEffect } from "react";
import { BlogContext } from "../pages/BlogPage";
import LikeSvg from "../components svgs/LikeSvg";
import { Link } from "react-router-dom";
import instagram from"../data/instagram.svg"
import { useStateContext } from '../contexts/ContextProvider';
import { Toaster,toast } from "react-hot-toast";
import axios from "axios";
import CommentSvg from "../components svgs/CommentSvg";

const BlogInteraction = () => {
    let {userAuth:{username,access_token},currentMode}=useStateContext()
    let{blog,blog:{_id,title,blog_id,activity,activity:{total_likes,total_comments},author:{personal_info:{username:author_username}}},setBlog,isLikedByUser,setLikedByUser,setCommentsWrapper} = useContext(BlogContext)
    
    useEffect(()=>{
        if(access_token){
            //make request to server to get like information
            axios.post(import.meta.env.VITE_SERVER_DOMAIN+"/isliked-by-user",{_id},{
                headers:{
                    'Authorization':`Bearer ${access_token}`
                }
            })
            .then(({data:{result}})=>{
                setLikedByUser(Boolean(result))
            })
            .catch(err=>{
                console.log(err)

            })
                
        }
    },[])
    
    const handleLike = ( )=>{
        
        if(access_token){
            setLikedByUser(!isLikedByUser)
            !isLikedByUser?total_likes++:total_likes--
            console.log(isLikedByUser)
            setBlog({...blog,activity:{...activity,total_likes}})
            axios.post(import.meta.env.VITE_SERVER_DOMAIN+"/like-blog",{_id,isLikedByUser},{
                headers:{
                    'Authorization':`Bearer ${access_token}`
                }
            })
            .then(({data})=>{
                console.log(data)
            })
            .catch(err=>{
                console.log(err)
            })
        }else{
            // not logged in 
            toast.error("Please login to like this blog")
        }
    }
    
    return ( <>
    <Toaster/>
        <hr className="bg-light-gray dark:border-dark-gray  my-2 mt-4"/>
        <div className="flex gap-6">
            
        <div className="flex gap-2 items-center">
            <button onClick={handleLike} className={"w-10 justify-center h-10 rounded-full flex items-center bg-light-gray  dark:bg-main-dark " + ( isLikedByUser ? "bg-red/20":"bg-light-gray")}>
                <LikeSvg fillIn={isLikedByUser?"rgb(239 68 68)":"none"} fill={isLikedByUser?"rgb(239 68 68)":"rgb(75 85 99)"}/>
            </button>
            <span className="text-lg text-grey">{total_likes}</span>
        </div>
        <div className="flex gap-2 items-center">
            <button onClick={()=>setCommentsWrapper(previous=>!previous)} className="w-10 justify-center h-10 rounded-full flex items-center bg-light-gray dark:bg-main-dark">
                <CommentSvg fillIn={"none"} fill={currentMode=="Dark"?"rgb(75 85 99)":"#bdbdbd"}/>
            </button>
            <span className="text-lg text-grey">{total_comments}</span>
        </div>
        <div className="flex gap-6 ml-auto items-center">
            {
                username==author_username?
                <Link to={`/editor/${blog_id}`} className="underline hover:text-purple-500 dark:text-white text-black">Edit</Link>:""
            }
            <Link>
                <img className="w-6 h-6" src={instagram} alt="" />
            </Link>
        </div>
        </div>
        <hr className="bg-light-gray dark:border-dark-gray my-2 "/>
    </> );
}
 
export default BlogInteraction;
