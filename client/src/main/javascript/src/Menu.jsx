import React, { useState, useEffect } from 'react';

function getSelectedCategory(categories) {
    const tag = window.location.hash.replace('#', '');
    for (const category of categories) {
        if (category.tag === tag) {
            return category;
        }
    }
    return {
        tag: "",
        title: "",
        description: ""
    };
}

export default function Menu(props) {
    var categories = props.categories;
    const [selectedCategory, setSelectedCategory] = useState(getSelectedCategory(categories));
    var onSelectedCategory = props.onSelectedCategory;

    useEffect(() => {
        setSelectedCategory(getSelectedCategory(categories));
    }, [props.categories]);


    useEffect(() => {
        onSelectedCategory(selectedCategory);
    }, [selectedCategory]);

    window.addEventListener('hashchange', (event) => {
        setSelectedCategory(getSelectedCategory(categories));
    });

    const getCategories = () => {
        var result = [];
        for (const category of categories) {
            if (category.tag === "") {
                continue;
            }
            var activeTag = selectedCategory.tag === category.tag ? " active" : "";
            result.push(
                <li class={"nav-link" + activeTag} key={category.tag}>
                    <h4><a href={'#' + category.tag}>{category.title}</a></h4>
                </li>
            );
        }
        return result;
    };

    return <>
        <div className='dr-menu p-2 h-100 d-none d-md-flex col-md-3 d-flex flex-column'>
            <div className='flex-grow-1 '>
                <h3>
                    <a href='#'>
                    {selectedCategory.title}
                    </a>
                </h3>
                <p>
                    {selectedCategory.description}
                </p>
            </div>
            <ul class="nav flex-column flex-shrink-1 mt-auto py-5">
                {getCategories()}
            </ul>
        </div>
    </>;
}