import { useState } from "react";

const PostForm = ({ onSubmit, initialValue }: any) => {
  const [post, setPost] = useState({
    title: initialValue.title || "",
    body: initialValue.body || "",
  });

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const renderField = (label: string) => (
    <div>
      <label htmlFor={label.toLowerCase()}>{label}</label>
      <input
        onChange={handleChangeInput}
        type="text"
        name={label.toLowerCase()}
        id={label.toLowerCase()}
        value={post[label.toLowerCase() as keyof typeof post]}
      />
    </div>
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(post);
    setPost({
      title: "",
      body: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {renderField("Title")}
      {renderField("Body")}
      <button type="submit">Submit</button>
    </form>
  );
};

export default PostForm;
