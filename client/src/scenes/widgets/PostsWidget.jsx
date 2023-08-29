import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setUsers } from "state";
import PostWidget from "./PostWidget";
import {env} from "../../config";


const PostsWidget = ({ userId, socket, isProfile = false, setPostTimeDiff }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.authReducer.posts);
  const token = useSelector((state) => state.authReducer.token);
  const [pageNo, setPageNo] = useState(0)

  

  const getUsers = async () => {
    const resposnse = await fetch(env.serverEndpoint()+"/users", {
      method:"GET",
      headers: {Authorization:`Bearer ${token}`}
    })
    const users = await resposnse.json()
    dispatch(setUsers(users))
  }
  const getPosts = async () => {
    const response = await fetch(env.serverEndpoint()+"/posts?pageNo="+pageNo, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    data.reverse()
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `${env.serverEndpoint()}/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    // console.log("getuserspost", data)
    data.reverse()
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
      getUsers();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
          createdAt
        }) => (

          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments.slice().reverse()}
            createdAt={createdAt}
            getPosts={getPosts}
            socket={socket}
            setPostTimeDiff={setPostTimeDiff}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
