'use client'
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const Page = ({ params }) => {
    const { id } = React.use(params);  // Unwrap params here
    const [content, setContent] = useState(null);
    const [statusMessage, setStatusMessage] = useState('');

    const randomMessages = {
        confirmMessages: [
            'You really want to delete this? 🤨😳',
            'Oh no! This will be gone forever! 💔😱',
            'Are you sure you want to delete this chapter? 🤔🧐😞',
            'Time to say goodbye 😔👋',
            'This might be a bad idea! 😬😓',
        ],
        cancelMessages: [
            'Content saved! 😅🎉',
            'Phew! That was close! 😮💨',
            'Content is safe, no worries! 😌✌️',
            'Nice save! 😎🔥',
            'Lucky! Content is still here! 😏💪',
        ],
        successMessages: [
            'Content deleted! 🥲💔',
            'It\'s gone now! 😭💥',
            'Content erased! 😔😔',
            'Oh no! It\'s gone forever! 😢💔',
            'Bye-bye content! 👋😩',
        ],
        errorMessages: [
            'Error deleting content! 😞❌',
            'Oops, something went wrong! 🤦‍♂️😓',
            'Failed to delete! 😡😩',
            'Whoops! Deletion failed! 🙈😫',
        ]
    };

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await fetch('http://localhost:8000/editor-content');
                const data = await response.json();
                const classContent = data.find(item => item.className === `Class ${id}`);

                if (classContent) {
                    setContent(classContent);
                } else {
                    setStatusMessage('No content found for this class.');
                }
            } catch (error) {
                setStatusMessage('Error fetching content.');
            }
        };

        fetchContent();
    }, [id]);

    const handleDelete = async () => {
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
                const response = await fetch(`http://localhost:8000/editor-content/${content._id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    const randomSuccessMessage = randomMessages.successMessages[Math.floor(Math.random() * randomMessages.successMessages.length)];
                    setStatusMessage(randomSuccessMessage);
                    setContent(null);
                } else {
                    const randomErrorMessage = randomMessages.errorMessages[Math.floor(Math.random() * randomMessages.errorMessages.length)];
                    setStatusMessage(randomErrorMessage);
                }
            } catch (error) {
                const randomErrorMessage = randomMessages.errorMessages[Math.floor(Math.random() * randomMessages.errorMessages.length)];
                setStatusMessage(randomErrorMessage);
            }
        } else {
            const randomCancelMessage = randomMessages.cancelMessages[Math.floor(Math.random() * randomMessages.cancelMessages.length)];
            Swal.fire('Phew!', randomCancelMessage, 'info');
        }
    };

    return (
        <div className="p-10 w-full bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">{`Class ${id} Content`}</h1>

            {statusMessage && <p className="text-red-500 mb-4">{statusMessage}</p>}

            {content ? (
                <div className="p-4 border border-gray-300 rounded-lg bg-white">
                    <h2 className="text-lg font-semibold">Chapter: {content.chapterName}</h2>
                    <div dangerouslySetInnerHTML={{ __html: content.content }}></div>
                    <button
                        onClick={handleDelete}
                        className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            ) : (
                <p>No content found for this class.</p>
            )}
        </div>
    );
};

export default Page;
