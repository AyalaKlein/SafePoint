import React, { useState, Component, useEffect } from 'react';

const ProfilePage = () => {
    const [article, setArticle] = React.useState({});

    useEffect(() => {
        fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/news/get`)
            .then(response => {
                return response.json();
            })
            .then(result => {
                setArticle(result);
            })
            .catch(err => {
                setArticle({});
            });
    }, []);
    return (
        <div>
            <h4>
                Today's shelter article is..
            </h4>
            <br />
            <a href={article.url} target='_blank'>
                <span>
                    {article.title}
                </span>
            </a>
        </div>
    );
};
 
export default ProfilePage;