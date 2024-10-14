import React, {useId} from 'react';
import axios from 'axios';

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

    const id = useId()

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
                    id: id,
                    title: title,
                    body: description,
                    userId: id
                }
            )
            setPosts([...posts, response.data]);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.log(e)
        }
    }
    return (
        <div className="App">
            <h1>Simple CRUD APP</h1>
            <form>
                <input type="text" value={title} placeholder="Title" name="title"
                       onChange={(event) => setTitle(event.target.value)}/>
                <input type="text" value={description} placeholder="Description" name="description"
                       onChange={(event) => setDescription(event.target.value)}/>
                <button type="submit" onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Adding...' : 'Add Post'}
                </button>
            </form>

            {posts.length === 0 &&
                <>
                    <h2>Posts</h2>
                    <p>No posts available.</p>
                </>}
            <ul>
                {posts.map((post: Post) => (
                    <div key={post.id}>
                        <h4>{post.title}</h4>
                        <p>{post.body}</p>
                        <hr/>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default App;
