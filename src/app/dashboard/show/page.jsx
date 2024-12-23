'use client';
import React, { useEffect, useState } from 'react';

const Page = () => {
    const [editorContents, setEditorContents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch saved editor content from the API
        const fetchEditorContent = async () => {
            try {
                const response = await fetch('http://localhost:8000/editor-content'); // Replace with your actual API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch editor content');
                }
                const data = await response.json();
                setEditorContents(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEditorContent();
    }, []);

    // Function to replace <a> tags with the text of the URL
    const removeLinkStyles = (content) => {
        return content.replace(/<a[^>]*href="([^"]*)"[^>]*>([^<]+)<\/a>/g, (match, url, text) => {
            // Replace the anchor tag with a span element for hover functionality
            return `<span class="custom-link-text relative inline-block text-blue-500 cursor-pointer" data-url="${url}">${text}</span>`;
        });
    };

    return (
        <div className="w-full p-10 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Saved Editor Content</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <div className="space-y-4">
                {editorContents.map((contentData) => (
                    <div key={contentData._id} className="p-4 border border-gray-300 rounded-lg bg-white">
                        <h2 className="text-lg font-medium">Content</h2>
                        <div
                            className="prose"
                            // Apply the function to replace <a> tags with text
                            dangerouslySetInnerHTML={{ __html: removeLinkStyles(contentData.content) }}
                        ></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page;
