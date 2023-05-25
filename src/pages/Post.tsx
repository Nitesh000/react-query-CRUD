import { useQuery } from "@tanstack/react-query";
import { fetchPost } from "../api/posts";
import { useNavigate, useParams } from "react-router-dom";

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    data: post,
    error,
  } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchPost(id as string),
  });

  if (isLoading)
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  if (isError)
    return (
      <div>
        <h3>{`Error: ${JSON.stringify(error)}`}</h3>
      </div>
    );

  return (
    <div>
      <button onClick={() => navigate("/")}>back to list posts</button>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};
export default Post;
