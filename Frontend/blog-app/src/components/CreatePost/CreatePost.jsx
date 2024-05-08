import { useState } from "react";
import "./CreatePost.css"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from "react-router-dom";
export default function CreatePost() {
  const [topic, setTopic] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState('')
  const [redirect, setRedirect] = useState(false);
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  },

    formats = [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image'
    ]
  async function createNewPost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('topic', topic);
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', file[0]);
    const res = await fetch("/api/blog/create-post", {
      method: "POST",
      body: data
    })
    if (res.ok) {
      setRedirect(true);
    }
  }
  const handleChange = (content, delta, source, editor) => {
    setContent(content);
  };
  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <form className="newBlog" onSubmit={createNewPost}>
      <input type="text" placeholder="Topic" value={topic} onChange={ev => setTopic(ev.target.value)} />
      <input type="text" placeholder="Title" value={title} onChange={ev => setTitle(ev.target.value)} />
      <input type="text" placeholder="Summary" value={summary} onChange={ev => setSummary(ev.target.value)} />
      <input type="file" onChange={ev => setFile(ev.target.files)} />
      <div className="newBlogTextArea">
        <ReactQuill value={content} modules={modules} formats={formats} onChange={handleChange} />
      </div>
      <button className="newBlogButton">Create New post</button>
    </form>
  )
}