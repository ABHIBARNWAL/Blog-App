import Login from "./components/Login/Login.jsx"
import Register from "./components/Register/Register.jsx"
import Layout from "./components/Layout/Layout.jsx"
import { Route, Routes } from "react-router-dom"
import Posts from "./components/Posts/Posts.jsx"
import { UserContextProvider } from "./components/UserContext.jsx"
import CreatePost from "./components/CreatePost/CreatePost.jsx"
import { Author } from "./components/Author/Author.jsx"

export default function App() {
    return (
        <UserContextProvider>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Posts />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                    <Route path="/createPost" element={<CreatePost />}></Route>
                    <Route path="/:id" element={<Author/>}></Route>
                </Route>
            </Routes>
        </UserContextProvider>
    )
}