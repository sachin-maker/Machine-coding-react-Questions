import React, { useState } from "react";
import useCommentTree from "./use-comment-tree";
import Comment from "./Commnets";
import sampleData from "./InitialComments"; // optional initial data
import './styles.css'

const NestedComments = () => {
  const {
    comments,
    addComment,
    editComment,
    deleteComment,
    likeComment,
    dislikeComment,
  } = useCommentTree(sampleData);

  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (content.trim()) {
      addComment(null, content);
      setContent("");
    }
  };

  return (
    <div className="nested-comments">
      <div className="add-comment">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a comment..."
          rows={3}
          className="comment-textarea"
        />
        <button onClick={handleSubmit} className="comment-button">Submit</button>
      </div>

      <div className="comment-list">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onSubmitComment={addComment}
            onEditComment={editComment}
            onDeleteComment={deleteComment}
            onLike={likeComment}
            onDislike={dislikeComment}
          />
        ))}
      </div>
    </div>
  );
};

export default NestedComments;
