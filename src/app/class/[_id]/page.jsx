'use client';
import React, { useEffect, useState } from 'react';

const Page = ({ params }) => {
    const { _id } = params;

    const [editorContents, setEditorContents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedContent, setSelectedContent] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [title, setTitle] = useState('');

    const titles = [
        "📚 Dive into Knowledge and Laugh! 😂",
        "📖 Read and Smile! Life's Good! 😄",
        "🌟 Explore, Learn, and Conquer! 🚀",
        "🤓 Nerding Out with Style! 🎉",
        "💡 Bright Minds, Brighter Future! 🌞",
        "🎯 Unlock Your Inner Genius! 🧠✨",
        "😂 Learn and Laugh – A Perfect Combo! 🎉",
        "🚀 Boost Your Brain Power Here! 💪",
        "🌈 A Fun Ride Through Knowledge! 🎢",
        "🎉 Today’s Lesson: Laugh & Learn! 😂✨",
        "📚 Study Smart, Not Hard! 💡",
        "🎓 Ace the Test with a Smile! 😃",
        "💥 Power Up Your Learning! 🚀",
        "🔍 Curiosity Unleashed! 🌟",
        "🌈 Let’s Brighten Up Learning! 🌞",
        "⚡ Supercharge Your Brain! 🧠💥",
        "🎉 Your Gateway to Fun Education! 🌟",
        "😄 Smile, Learn, Repeat! 📚",
        "🌟 Where Fun Meets Knowledge! 🚀",
        "🎢 Roll Through Chapters with Joy! 😂",
        "📖 Learn Like a Pro! 🌟",
        "😎 Reading Made Fun! 🥳",
        "💡 Switch On Your Learning Mode! ⚡",
        "🚀 Learning That’s Out of This World! 🌌",
        "🌟 Crack Open the Book of Fun! 📖✨",
        "🎯 Bullseye Learning Goals Achieved! 🎯",
        "🤓 Geek Out Over Cool Chapters! 📚",
        "🎉 High-Five to Fun Learning! ✋😂",
        "🌟 Bright Ideas for Bright Minds! 🌞",
        "💥 Explode into Knowledge! 🎆",
        "😂 Who Knew Learning Could Be This Fun? 😃",
        "🎯 Target Locked: Learning Success! 🚀",
        "🌈 Chapters That Make You Smile! 📚✨",
        "😄 Happy Reading, Happy Learning! 🥳",
        "💡 Chapters of Awesomeness Await! 🚀",
        "🎉 Celebrate Learning Every Day! 🎊",
        "😎 Rock the Book Like a Superstar! 📖✨",
        "🚀 Out-of-this-World Chapter Fun! 🌌",
        "📖 Turn Pages, Turn Smiles On! 😄",
        "✨ Keep Calm and Read On! 📚",
        "🌟 Be the Star of Your Learning Journey! 🚀",
    ];

    useEffect(() => {
        const fetchEditorContent = async () => {
            try {
                const response = await fetch('https://jantehobeback.vercel.app/editor-content');
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

        // Set a random title
        setTitle(titles[Math.floor(Math.random() * titles.length)]);
    }, []);

    const removeLinkStyles = (content) => {
        return content.replace(/<a[^>]*href="([^\"]*)"[^>]*>([^<]+)<\/a>/g, (match, url, text) => {
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
        <div className="w-full p-4 md:p-10 bg-gradient-to-r from-gray-100 to-gray-300 min-h-screen">
            <h1 className="text-3xl font-extrabold text-center text-purple-700 mb-6">{title}</h1>
            {loading && <p className="text-center text-gray-700">Loading...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="mb-6 flex justify-center">
                <input
                    type="text"
                    className="p-3 w-full max-w-md border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Search by Chapter Name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {!selectedContent ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredContent.length > 0 ? (
                        filteredContent.map((contentData) => (
                            <div
                                key={contentData._id}
                                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
                            >
                                <h3 className="text-lg font-bold text-gray-800 mb-2">{contentData.chapterName}</h3>
                                <p className="text-gray-600">Chapter No: {contentData.chapterNo}</p>
                                <button
                                    className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md hover:from-purple-700 hover:to-indigo-700"
                                    onClick={() => handleReadNow(contentData)}
                                >
                                    Read Now
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600 text-center">No content found for this class.</p>
                    )}
                </div>
            ) : (
                <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        Chapter: {selectedContent.chapterName} (Chapter {selectedContent.chapterNo})
                    </h2>
                    <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: removeLinkStyles(selectedContent.content) }}
                    ></div>
                    <button
                        className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md hover:from-purple-700 hover:to-indigo-700"
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
