import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axiosInstance from '../../api/axiosInstance';
import './MessagesInbox.css';

const MessagesInbox = () => {
    const { token } = useAuth();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [selectedMessage, setSelectedMessage] = useState(null);

    useEffect(() => {
        fetchMessages();
    }, [filter]);

    const fetchMessages = async () => {
        try {
            const params = filter === 'unread' ? '?unread=true' : '';
            const response = await axiosInstance.get(`/admin/messages${params}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessages(response.data.data.messages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id) => {
        try {
            await axiosInstance.put(`/admin/messages/${id}/read`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchMessages();
        } catch (error) {
            console.error('Error marking message as read:', error);
        }
    };

    const deleteMessage = async (id) => {
        if (!window.confirm('Delete this message?')) return;

        try {
            await axiosInstance.delete(`/admin/messages/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSelectedMessage(null);
            fetchMessages();
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return <div className="loading-container"><div className="loading-spinner"></div></div>;
    }

    return (
        <div className="messages-inbox">
            <header className="page-header">
                <h1>Messages</h1>
                <div className="filter-tabs">
                    <button
                        className={`filter-tab ${filter === 'all' ? 'filter-tab--active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        All
                    </button>
                    <button
                        className={`filter-tab ${filter === 'unread' ? 'filter-tab--active' : ''}`}
                        onClick={() => setFilter('unread')}
                    >
                        Unread
                    </button>
                </div>
            </header>

            <div className="messages-layout">
                <div className="messages-list">
                    {messages.length === 0 ? (
                        <div className="empty-state">
                            <p>No messages yet.</p>
                        </div>
                    ) : (
                        messages.map((message) => (
                            <div
                                key={message.id}
                                className={`message-item ${!message.isRead ? 'message-item--unread' : ''} ${selectedMessage?.id === message.id ? 'message-item--selected' : ''}`}
                                onClick={() => {
                                    setSelectedMessage(message);
                                    if (!message.isRead) markAsRead(message.id);
                                }}
                            >
                                <div className="message-item__header">
                                    <span className="message-item__name">{message.name}</span>
                                    <span className="message-item__date">{formatDate(message.createdAt)}</span>
                                </div>
                                <p className="message-item__email">{message.email}</p>
                                <p className="message-item__preview">{message.message.slice(0, 60)}...</p>
                            </div>
                        ))
                    )}
                </div>

                {selectedMessage && (
                    <div className="message-detail">
                        <div className="message-detail__header">
                            <div>
                                <h2>{selectedMessage.name}</h2>
                                <a href={`mailto:${selectedMessage.email}`} className="message-detail__email">
                                    {selectedMessage.email}
                                </a>
                            </div>
                            <button
                                className="btn-icon-sm btn-danger"
                                onClick={() => deleteMessage(selectedMessage.id)}
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="3,6 5,6 21,6" />
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                </svg>
                            </button>
                        </div>
                        <p className="message-detail__date">{formatDate(selectedMessage.createdAt)}</p>
                        <div className="message-detail__content">
                            <p>{selectedMessage.message}</p>
                        </div>
                        <a
                            href={`mailto:${selectedMessage.email}?subject=Re: Portfolio Contact`}
                            className="btn btn-primary"
                        >
                            Reply
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessagesInbox;
