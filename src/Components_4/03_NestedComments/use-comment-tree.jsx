import { useState, useRef } from "react";

export default function useCommentTree(initialData = []) {
  const [comments, setComments] = useState(initialData);
  const nextId = useRef(1000); // start from high value to avoid collision

  const addComment = (parentId, content) => {
    const newComment = {
      id: String(nextId.current++),
      content,
      timestamp: new Date().toISOString(),
      votes: 0,
      replies: [],
    };

    if (!parentId) {
      setComments((prev) => [...prev, newComment]);
    } else {
      const updated = updateCommentTree(comments, parentId, (comment) => {
        comment.replies.push(newComment);
      });
      setComments(updated);
    }
  };

  const editComment = (id, newContent) => {
    setComments(updateCommentTree(comments, id, (c) => (c.content = newContent)));
  };

  const deleteComment = (id) => {
    setComments(deleteCommentById(comments, id));
  };

  const likeComment = (id) => {
    setComments(updateCommentTree(comments, id, (c) => c.votes++));
  };

  const dislikeComment = (id) => {
    setComments(updateCommentTree(comments, id, (c) => c.votes--));
  };

  return {
    comments,
    addComment,
    editComment,
    deleteComment,
    likeComment,
    dislikeComment,
  };
}

function updateCommentTree(tree, id, updater) {
  return tree.map((comment) => {
    if (comment.id === id) {
      const updated = { ...comment };
      updater(updated);
      return updated;
    }

    if (comment.replies?.length) {
      return {
        ...comment,
        replies: updateCommentTree(comment.replies, id, updater),
      };
    }

    return comment;
  });
}

function deleteCommentById(tree, id) {
  return tree
    .filter((c) => c.id !== id)
    .map((c) => ({
      ...c,
      replies: deleteCommentById(c.replies || [], id),
    }));
}
