'use client';
import React, { useEffect, useState } from 'react';

const Page = ({ params }) => {
    const { _id } = React.use(params);

    const [editorContents, setEditorContents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedContent, setSelectedContent] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchEditorContent = async () => {
            try {
                const response = await fetch('http://localhost:8000/editor-content');
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

    const removeLinkStyles = (content) => {
        return content.replace(/<a[^>]*href="([^"]*)"[^>]*>([^<]+)<\/a>/g, (match, url, text) => {
            return `<span class="custom-link-text relative inline-block text-blue-500 cursor-pointer" data-url="${url}">${text}</span>`;
        });
    };

    const filteredContent = editorContents.filter(content => 
        content.className === _id && content.chapterName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleReadNow = (content) => {
        setSelectedContent(content);
    };

    return (
        <div className="w-full p-10 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Saved Editor Content</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="mb-6">
                <input
                    type="text"
                    className="p-2 w-full max-w-sm border rounded-md"
                    placeholder="Search by Chapter Name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {!selectedContent ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredContent.length > 0 ? (
                        filteredContent.map((contentData) => (
                            <div key={contentData._id} className="border border-gray-300 rounded-lg p-4 bg-white">
                                <h3 className="text-lg font-semibold">{contentData.chapterName}</h3>
                                <p>Chapter No: {contentData.chapterNo}</p>
                                <button
                                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                    onClick={() => handleReadNow(contentData)}
                                >
                                    Read Now
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No content found for this class.</p>
                    )}
                </div>
            ) : (
                <div className="p-4 border border-gray-300 rounded-lg bg-white mt-4">
                    <h2 className="text-xl font-medium mb-4">Chapter: {selectedContent.chapterName} (Chapter {selectedContent.chapterNo})</h2>
                    <div
                        className="prose"
                        dangerouslySetInnerHTML={{ __html: removeLinkStyles(selectedContent.content) }}
                    ></div>
                    <button
                        className="mt-4 px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                        onClick={() => setSelectedContent(null)}
                    >
                        Back to List
                    </button>
                </div>
            )}
        </div>
    );
};

export default Page;
