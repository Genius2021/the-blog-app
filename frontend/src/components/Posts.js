import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';



function Posts({ posts }) {
    const history = useHistory();
    const registerDetails = useSelector(state => state.userRegister);
    const { successRegister } = registerDetails;

    const signinDetails = useSelector(state => state.userSignin);
    const { successSignin, userInfo } = signinDetails;


    const dateFormat = (createdAt) => (
        new Date(createdAt).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }).split(' ').join('-')
    );

    return (
        <>
            {/* {successRegister && <div className="welcome__message">You are Welcome Boss, {userInfo.firstname}! </div>} */}
            {successSignin && <div className="welcome__message">Welcome back Boss! {userInfo?.username} </div>}
            {posts.map((post) => {
                return (<div key={post._id} className="posts">
                    <div className="posts__authorinfo">
                        <span className="posts__date">{dateFormat(post.createdAt)}</span>
                    </div>
                    <div className="posts__info">
                        {post?.categories.map((category) => (
                            <span className="posts__category">{category.name}</span>
                        ))}
                        <span className="posts__title" onClick={e => history.push(`/posts/${post._id}`)}>
                            {post.title}
                        </span>
                        <hr />
                    </div>
                    <div className="posts__description">{post.description.substring(0, 150)}<Link className="readMore" to={`/posts/${post._id}`}>...More Details</Link></div>
                </div>)
            })}


        </>
    )
}

export default Posts
