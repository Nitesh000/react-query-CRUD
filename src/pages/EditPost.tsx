import { useNavigate, useParams } from "react-router-dom";
import PostForm from "../components/PostForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPost, updatePost } from "../api/posts";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    data: post,
    error,
  } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchPost(id as string),
  });

  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/");
    },
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

  const handleSubmit = (updatedPost: any) => {
    updatePostMutation.mutate({ id, ...updatedPost });
  };

  return (
    <div>
      <PostForm initialValue={post} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditPost;
