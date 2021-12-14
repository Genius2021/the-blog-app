import { FaRegEdit } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import Rightsection from "../components/Rightsection";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, editPost, getAPost } from "../Redux/actions/postActions";

function Post(props) {
    const id = props.match.params.id
    const publicFolder = "https://stars-blog.herokuapp.com/images/"
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const username = userInfo?.username;
    const getPost = useSelector(state => state.getAPost);
    const { postDetails } = getPost;

    // const editAPost = useSelector(state => state.editPost);
    // const { successUpdate } = editAPost;

    const aNewPost = useSelector(state => state.newPost);
    const { newPostSuccess, newPost } = aNewPost;

    const dispatch = useDispatch();
    const [title, setTitle] = useState(postDetails.title);
    const [description, setDescription] = useState(postDetails.description);
    const [postUpdate, setPostUpdate] = useState(false);

    const deleteHandler = (e) => {
        e.preventDefault();
        dispatch(deletePost(id, username));
        window.location.replace("/");
    }

    const editHandler = (e) => {
        e.preventDefault();
        dispatch(editPost(title, id, description, username));
        setTitle('')
        setDescription('')
        setPostUpdate(false);
    }

    useEffect(() => {

        dispatch(getAPost(id));
    }, [dispatch, id]);

    return (
        <>
            <section className="left__section">
                This is the left section
            </section>
            <section className="center__section">
                <div className="post__wrapper">
                    {postUpdate ? <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="write__title" autoFocus /> : (
                        <h1 className="post__title">
                            {/* {successUpdate ? editedPost.title : postDetails.title} */}
                            {postDetails.title}
                        </h1>)

                    }

                    { }
                    <div className="image__container">
                        <img
                            src={newPost ? (publicFolder + newPost.picture) : (publicFolder + postDetails.picture)}
                            alt=""
                            className="post__image"
                        />
                    </div>
                    <div className="post__info">
                        <p className="publish__time">Published: {new Date(postDetails.createdAt).toDateString()}</p>
                        <div className="info__author">Author: <b className="author__name"><Link to={`/?username=${postDetails.username}`}>{postDetails.username}</Link></b></div>
                        <div className="info__icons">
                            {
                                postDetails.username === username && (
                                    <span>
                                        {!postUpdate && <FaRegEdit className="info__icon edit" onClick={e => setPostUpdate(!postUpdate)} />}
                                        <Link to="/delete"><BsTrash className="info__icon delete" onClick={deleteHandler} /></Link>
                                    </span>
                                )
                            }
                        </div>
                    </div>
                    {

                        postUpdate ? <textarea value={description} className="write__area" rows="7" cols="48" onChange={e => setDescription(e.target.value)} /> : (
                            <div className="post__text">
                                {/* <p>{successUpdate ? editedPost.description : postDetails.description}</p> */}
                                {postDetails.description}
                            </div>
                        )
                    }

                    {postUpdate && <button type="submit" onClick={editHandler} className="write__submit">Publish</button>}

                </div>
            </section>
            <section className="right__section">
                <Rightsection />
            </section>
        </>
    )
}

export default Post
