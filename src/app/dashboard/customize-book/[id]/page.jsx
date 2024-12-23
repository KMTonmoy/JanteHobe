'use client';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Page = ({ params }) => {
    const { id } =  params;

    const [editorContents, setEditorContents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedContent, setSelectedContent] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const randomMessages = {
        confirmMessages: [
            'Are you sure you want to delete this? 🤔',
            'This will be gone forever! 💔',
            'Deleting this will be a bad idea! 😬',
            'Do you really want to delete this chapter? 😳',
            'Once deleted, it\'s gone! 😱'
        ],
        cancelMessages: [
            'Content saved! 😅',
            'Phew, that was close! 😅',
            'Content is safe, no worries! 😌',
            'Lucky, content is still here! 🙌',
            'Content remains intact! ✌️'
        ],
        successMessages: [
            'Content deleted! 🥲',
            'Chapter erased! 😞',
            'Content gone forever! 😢',
            'Goodbye, chapter! 😔',
            'The chapter is now deleted! 💥'
        ],
        errorMessages: [
            'Error deleting content! 😞',
            'Oops, something went wrong! 🙁',
            'Failed to delete! 😫',
            'Something went wrong while deleting! 😔'
        ]
    };

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
    }, []);

    const removeLinkStyles = (content) => {
        return content.replace(/<a[^>]*href="([^"]*)"[^>]*>([^<]+)<\/a>/g, (match, url, text) => {
            return `<span class="custom-link-text relative inline-block text-blue-500 cursor-pointer" data-url="${url}">${text}</span>`;
        });
    };

    const filteredContent = editorContents.filter(content => 
        content.className === id && content.chapterName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = async (content) => {
        const randomConfirmMessage = randomMessages.confirmMessages[Math.floor(Math.random() * randomMessages.confirmMessages.length)];
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: randomConfirmMessage,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it! 🥲',
            cancelButtonText: 'No, keep it! 😔',
            customClass: {
                confirmButton: 'bg-red-500 text-white',
                cancelButton: 'bg-gray-500 text-white'
            }
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`https://jantehobeback.vercel.app/editor-content/${content._id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    const randomSuccessMessage = randomMessages.successMessages[Math.floor(Math.random() * randomMessages.successMessages.length)];
                    setError(randomSuccessMessage);
                    setEditorContents(editorContents.filter(item => item._id !== content._id));
                } else {
                    const randomErrorMessage = randomMessages.errorMessages[Math.floor(Math.random() * randomMessages.errorMessages.length)];
                    setError(randomErrorMessage);
                }
            } catch (error) {
                const randomErrorMessage = randomMessages.errorMessages[Math.floor(Math.random() * randomMessages.errorMessages.length)];
                setError(randomErrorMessage);
            }
        } else {
            const randomCancelMessage = randomMessages.cancelMessages[Math.floor(Math.random() * randomMessages.cancelMessages.length)];
            Swal.fire('Phew!', randomCancelMessage, 'info');
        }
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
                            <div key={contentData.id} className="border border-gray-300 rounded-lg p-4 bg-white">
                                <h3 className="text-lg font-semibold">{contentData.chapterName}</h3>
                                <p>Chapter No: {contentData.chapterNo}</p>
                                <button
                                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                    onClick={() => handleDelete(contentData)}
                                >
                                    Delete
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
