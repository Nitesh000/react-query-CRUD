import { useMutation, useQueryClient } from "@tanstack/react-query";
import PostForm from "./PostForm";
import { createPost } from "../api/posts";
import { v4 as uuidv4 } from "uuid";

const AddPost = () => {
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      console.log("Success mutating!");
    },
  });

  const handleAddPost = (post: any) => {
    createPostMutation.mutate({
      id: uuidv4(),
      ...post,
    });
  };

  return (
    <div>
      <h2>Add new post</h2>
      <PostForm
        onSubmit={handleAddPost}
        initialValue={{ title: "", body: "" }}
      />
    </div>
  );
};

export default AddPost;
