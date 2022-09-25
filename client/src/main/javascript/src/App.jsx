import React, { useState, useEffect } from 'react';
import './App.css';
import Menu from './Menu';
import PictureGrid from './PictureGrid';

export default function App() {
    const [selectedCategory, setSelectedCategory] = useState();
    const [data, setData] = useState({categories: [], posts: []});

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
        fetch("http://192.168.1.20:8080/api/posts", props)
                .then((response) => response.json())
                .then(it => setData(it));
    }, []);

    return (
        <div className='page-container container-xl col h-100'>
            <div className='row h-100'>
                    <Menu categories={data.categories} onSelectedCategory={setSelectedCategory} />
                    <PictureGrid posts={data.posts.sort((a,b) => Math.random())} selectedCategory={selectedCategory} />
            </div>
        </div>
    );
}
