import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';

function Comments() {
  const { taskId } = useParams();
  const [comments, setComments] = useState([]);
  const [task, setTask] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) { navigate('/'); return; }
    fetchTask();
    fetchComments();
  }, []);

  const fetchTask = async () => {
    try {
      const res = await API.get('/tasks');
      const found = res.data.tasks.find(t => t._id === taskId);
      setTask(found);
    } catch (err) {
      setError('Failed to load task');
    }
  };

  const fetchComments = async () => {
    try {
      const res = await API.get(`/comments/${taskId}`);
      setComments(res.data.comments);
    } catch (err) {
      setError('Failed to load comments');
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      await API.post(`/comments/${taskId}`, { text: newComment });
      setNewComment('');
      fetchComments();
    } catch (err) {
      setError('Failed to add comment');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '700px', margin: '0 auto' }}>
      <button
        onClick={() => navigate('/tasks')}
        style={{ marginBottom: '20px', padding: '8px 16px' }}
      >
        ← Back to Task Board
      </button>

      {/* Task Info */}
      {task && (
        <div style={{
          padding: '16px', background: '#f5f5f5',
          borderRadius: '8px', marginBottom: '24px'
        }}>
          <h2 style={{ margin: 0 }}>{task.title}</h2>
          <p style={{ color: '#555' }}>{task.description}</p>
          <p style={{ fontSize: '0.85rem' }}>
            👤 Assigned to: <strong>{task.assignedTo?.name}</strong> &nbsp;|&nbsp;
            🎯 Priority: <strong>{task.priority}</strong> &nbsp;|&nbsp;
            📌 Status: <strong>{task.status}</strong>
          </p>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Add Comment */}
      <div style={{ marginBottom: '24px' }}>
        <h3>💬 Add a Comment</h3>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment here..."
          rows={3}
          style={{
            width: '100%', padding: '10px', borderRadius: '6px',
            border: '1px solid #ddd', fontSize: '0.95rem',
            boxSizing: 'border-box'
          }}
        />
        <button
          onClick={handleAddComment}
          style={{
            marginTop: '8px', padding: '8px 20px',
            background: '#1976d2', color: 'white',
            border: 'none', borderRadius: '4px', cursor: 'pointer'
          }}
        >
          Post Comment
        </button>
      </div>

      {/* Comments List */}
      <h3>🗨️ Comments ({comments.length})</h3>
      {comments.length === 0 && (
        <p style={{ color: '#aaa' }}>No comments yet. Be the first to comment!</p>
      )}
      {comments.map((comment) => (
        <div key={comment._id} style={{
          padding: '12px 16px', background: 'white',
          borderRadius: '8px', marginBottom: '10px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #1976d2'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <strong>{comment.user?.name}</strong>
            <span style={{ fontSize: '0.8rem', color: '#888' }}>
              {new Date(comment.createdAt).toLocaleString()}
            </span>
          </div>
          <p style={{ margin: '6px 0 0', color: '#333' }}>{comment.text}</p>
        </div>
      ))}
    </div>
  );
}

export default Comments;