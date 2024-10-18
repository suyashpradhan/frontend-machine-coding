import React from 'react';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import {PracticingEffects} from "./PracticingEffects";

type Post = {
    id: string,
    title: string,
    body: string,
    userId: string
}

function App() {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [posts, setPosts] = React.useState<Post[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
                    id: uuidv4(),
                    title: title,
                    body: description,
                }
            )
            setPosts([...posts, response.data]);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            setError("Failed to fetch posts.");
            console.error(e);
        }
    }

    const deletePostHandler = async (id?: string) => {
        setLoading(true);
        try {
            const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
            setPosts(posts.filter(post => post.id !== id));
            setLoading(false);
        } catch (error) {
            setError("Failed to delete post.");
        }
    }

    return (
        <div className="App">
            <h1>Simple CRUD APP</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={title} placeholder="Title" name="title"
                       onChange={(event) => setTitle(event.target.value)}/>
                <input type="text" value={description} placeholder="Description" name="description"
                       onChange={(event) => setDescription(event.target.value)}/>
                <button type="submit" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Post'}
                </button>
            </form>

            {posts.length === 0 &&
                <div>
                    <h2>Posts</h2>
                    <p>No posts available.</p>
                </div>
            }
            <div>
                {posts.map((post: Post) => (
                    <div key={post.id}>
                        <h4>{post.title}</h4>
                        <p>{post.body}</p>
                        <button onClick={() => deletePostHandler(post?.id)}>Delete Post</button>
                        <hr/>
                    </div>
                ))}
            </div>

            {error && <p style={{color: 'red'}}>{error}</p>}

            <PracticingEffects/>
import {Select} from "./Select";

function App() {

    const [counter, setCounter] = React.useState(12);

    return (
        <div className="App">
            <h1>hello world!</h1>
            <button onClick={() => {
                setCounter((prev) => prev + 1)
                console.log(counter)
            }}>Click {counter}
            </button>

            <Select/>
        </div>
    );
}

export default App;
