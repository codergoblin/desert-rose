import ModalImage from "react-modal-image";


export default function Post(props) {
    const post = props.post;

    return <div className="dr-post-wrapper p-2 row">
        <div className="dr-post position-relative w-100">
            <ModalImage className="w-100 dr-post-image"
                        small={post.pictureUrl}
                        large={post.pictureUrl}
                        alt={post.title}/>
            <div className="dr-post-description">
                <h4>{post.title}</h4>
                <p>{post.description}</p>
                <small>{new Date(post.timestamp).toLocaleDateString('en-GB')}</small>
            </div>
        </div>
    </div>;
}