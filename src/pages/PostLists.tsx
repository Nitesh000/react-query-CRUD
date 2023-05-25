import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AddPost from "../components/AddPost";
import { deletePost, fetchPosts } from "../api/posts";
import { useNavigate } from "react-router-dom";

const PostLists = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    data: posts,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleDelete = (id: any) => {
    deletePostMutation.mutate(id);
  };

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
      <AddPost />
      {posts.map((post: any) => (
        <div key={post.id}>
          <h4
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/post/${post.id}`)}
          >
            {post?.title}
          </h4>
          <button onClick={() => navigate(`/post/${post.id}/edit`)}>
            Edit
          </button>
          <button onClick={() => handleDelete(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default PostLists;
