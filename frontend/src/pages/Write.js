import React, { useEffect, useState } from 'react';
import Rightsection from '../components/Rightsection';
import { RiAddFill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { createNewPost, postImageUpload } from '../Redux/actions/postActions';
// import axios from "axios";


function Write() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const username = userInfo?.username;
    const [selected, setSelected] = useState("Tech");

    const cat = ["Tech", "Sports", "Lifestyle"]

    const [category, setCategory] = useState(cat);

    // useEffect(() => {
    //     const getCategories = async () => {
    //         try {
    //             const response = await axios.get("/category");
    //             setCategory(response.data);
    //         } catch {
    //             console.log("There was an error getting the categories data")
    //         }
    //     }
    //     getCategories();
    // })

    const selectHandler = (e) => {
        e.preventDefault();
        setCategory([...new Set([e.target.value, ...category])]);
        setSelected(e.target.value)
    }

    const publishHandler = (e) => {
        e.preventDefault();
        console.log(file)
        const filename = Date.now() + file.name
        if (file) {
            const data = new FormData();
            data.append("name", filename);
            data.append("file", file);
            dispatch(postImageUpload(data));
        }
        dispatch(createNewPost(title, description, filename, username, selected));
    };



    return (
        <>
            <section className="left__section">
                This is the left section
            </section>
            <section className="center__section write">
                {

                    file && <img src={URL.createObjectURL(file)} className="write__image" alt="write__image" />

                }
                <form className="write__form">
                    <div className="form__group">
                        <label className="file__add" htmlFor="form__file">
                            <RiAddFill className="add__icon" />
                        </label>
                        <input type="file" id="form__file" onChange={e => setFile(e.target.files[0])} style={{ display: "none" }} />
                        <input type="type" onChange={e => setTitle(e.target.value)} placeholder="Title" className="write__title" autoFocus />
                        <div>
                            <select className="select__category" value={category[0]} onChange={selectHandler}>
                                {
                                    category.map(x => (
                                        <option key={x} value={x}>{x}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className="form__group">
                        <textarea placeholder="Your Writeup Here" className="write__area" rows="7" cols="48" onChange={e => setDescription(e.target.value)} />
                    </div>
                    <button type="submit" onClick={publishHandler} className="write__submit">Publish</button>
                </form>
            </section>
            <section className="right__section">
                <Rightsection />
            </section>
        </>
    )
}

export default Write
