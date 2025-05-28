import React, { useState } from "react";

const Comment = ({
  comment,
  onSubmitComment,
  onEditComment,
  onDeleteComment,
  onLike,
  onDislike,
}) => {
  const [replyMode, setReplyMode] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [showReplies, setShowReplies] = useState(false);

  const handleReplySubmit = () => {
    if (replyContent.trim()) {
      onSubmitComment(comment.id, replyContent);
      setReplyContent("");
      setReplyMode(false);
      setShowReplies(true);
    }
  };

  return (
    <div className="comment">
      {!editMode ? (
        <>
          <p className="comment-content">{comment.content}</p>
          <p className="comment-info">Votes: {comment.votes}</p>
          <p className="comment-info">
            {new Date(comment.timestamp).toLocaleString()}
          </p>
        </>
      ) : (
        <>
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="comment-textarea"
            rows={3}
          />
          <button onClick={() => {
            onEditComment(comment.id, editContent);
            setEditMode(false);
          }} className="comment-button">
            Save
          </button>
        </>
      )}

      <div className="comment-actions">
        <button onClick={() => setReplyMode((prev) => !prev)} className="comment-button">
          Reply
        </button>
        {comment.replies?.length > 0 && (
  <button onClick={() => setShowReplies((prev) => !prev)} className="comment-button">
    {showReplies ? "Hide Replies" : "Show Replies"}
  </button>
)}
        <button onClick={() => setEditMode((prev) => !prev)} className="comment-button">
          Edit
        </button>
        <button onClick={() => onDeleteComment(comment.id)} className="comment-button">
          Delete
        </button>
        <button onClick={() => onLike(comment.id)} className="comment-button">👍</button>
        <button onClick={() => onDislike(comment.id)} className="comment-button">👎</button>
      </div>

      {replyMode && (
        <div className="add-comment">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="comment-textarea"
            rows={3}
          />
          <button onClick={handleReplySubmit} className="comment-button">
            Submit Reply
          </button>
        </div>
      )}

      {showReplies && comment.replies?.length > 0 && (
        <div className="comment-replies">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              onSubmitComment={onSubmitComment}
              onEditComment={onEditComment}
              onDeleteComment={onDeleteComment}
              onLike={onLike}
              onDislike={onDislike}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
