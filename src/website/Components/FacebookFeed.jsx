import React, { useEffect, useState } from "react";

function FacebookFeed() {
    const [posts, setPosts] = useState([]);
    const PAGE_ID = "784260247959353";
    const ACCESS_TOKEN = "EAABsbCS1iHgBAPzZBZA7bZCZ...";


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(
                    `https://graph.facebook.com/v20.0/${PAGE_ID}/posts?fields=message,created_time,full_picture,permalink_url&access_token=${ACCESS_TOKEN}`
                );

                const data = await response.json();
                console.log(data);

                if (data.data) {
                    setPosts(data.data);
                } else {
                    console.error("No posts found or token expired:", data);
                }
            } catch (error) {
                console.error("Error fetching Facebook posts:", error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="facebook-feed">
            <h2>Latest Facebook Posts</h2>
            {posts.length === 0 && <p>Loading...</p>}
            {posts.map((post, index) => (
                <div key={index} className="post" style={{ marginBottom: "20px" }}>
                    {post.full_picture && (
                        <img
                            src={post.full_picture}
                            alt="Facebook post"
                            style={{ width: "100%", borderRadius: "10px" }}
                        />
                    )}
                    {post.message && <p>{post.message}</p>}
                    <a href={post.permalink_url} target="_blank" rel="noopener noreferrer">
                        View on Facebook
                    </a>
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default FacebookFeed;
