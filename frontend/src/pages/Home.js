import Rightsection from "../components/Rightsection";
import React, { useEffect } from 'react';
import Posts from "../components/Posts";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from "../Redux/actions/postActions";

function Home() {
    const { search } = useLocation();
    const dispatch = useDispatch();

    const gottenPosts = useSelector(state => state.getPosts);
    const { posts } = gottenPosts;


    // useEffect(() =>{
    //     const fetchPosts = async () =>{
    //         const response = await axios.get("/posts" + search);
    //         console.log(response);
    //         setPosts(response.data);
    //     }
    //     fetchPosts();
    // }, [search]);

    // const fetchPosts = () =>{
    //     dispatch(getPosts(search));
    //     setPosts(storePosts);
    // }


       useEffect(() => {

            dispatch(getPosts(search));
        }, [dispatch, search]);

    return (
        <>
            <section className="left__section">
            </section>
            <section className="center__section">
                <Posts posts={posts} />
            </section>
            <section className="right__section">
                <Rightsection />
            </section>
        </>
    )
}

export default Home
