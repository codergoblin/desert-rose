import React, { useState, useEffect } from 'react';
import './App.css';
import Menu from './Menu';
import PictureGrid from './PictureGrid';

export default function App() {
    const [selectedCategory, setSelectedCategory] = useState();
    const [data, setData] = useState({categories: [], posts: []});

    useEffect(() => {
        window.document.title = selectedCategory.title;
    }, [selectedCategory]);

    useEffect(() => {
        var props = {
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
        };
        fetch("/api/posts", props)
                .then((response) => response.json())
                .then(it => setData(it));
    }, []);

    const filteredPosts = data.posts
        .filter((it) => selectedCategory.tag === "" || it.tags.indexOf(selectedCategory.tag) > -1 )
        .sort((a,b) => Math.random() > Math.random());

    return (
        <div className='page-container container-xl col h-100'>
            <div className='row h-100'>
                    <Menu categories={data.categories} onSelectedCategory={setSelectedCategory} />
                    <PictureGrid posts={filteredPosts} selectedCategory={selectedCategory} />
            </div>
        </div>
    );
}
