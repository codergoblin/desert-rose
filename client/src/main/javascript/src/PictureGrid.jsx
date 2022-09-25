import React, { useState, useEffect } from 'react';
import Post from './Post';

function getColumns() {
    if (window.innerWidth < 768) {
        return 1;
    }
    if (window.innerWidth < 1200) {
        return 2;
    }
    if (window.innerWidth >= 2400) {
        return 4;
    }
    return 3;
}

export default function PictureGrid(props) {
    const [columns, setColumns] = useState(getColumns());
    const [posts, setPosts] = useState(props.posts);

    useEffect(() => {
        setPosts(props.posts);
    }, [props.posts]);

    useEffect(() => {
        window.addEventListener('resize', (event) => {setColumns(getColumns())});
    }, []);

    const getGrid = () => {
        var result = [];
        var grid = [];

        for (var i = 0; i < columns; i++) {
            grid.push([]);
        }
        for (var i = 0; i < posts.length; i++) {
            grid[i % columns].push(posts[i]);
        }
        for (var i = 0; i < grid.length; i++) {
            const postCol = grid[i];
            var renderedPosts = [];
            for (const post of postCol) {
                renderedPosts.push(<Post key={post.id} post={post}/>);
            }
            result.push(<div key={"col-" + i} className="col">{renderedPosts}</div>);
        }
        return result;
    };

    return <>
        <div className='dr-picture-grid h-100 col-xs-12 col-md-9 col'>
            <div className='row'>
                {getGrid()}
            </div>
        </div>
    </>;

}