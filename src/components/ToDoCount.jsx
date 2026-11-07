import React from "react";

function ToDoCount({ todos }) {
  return (
    <div className="to-do-count">
      There is
      {!todos.length
        ? " 등록과제가 없습니다."
        : todos.length === 1
        ? " 현재 등록된 과제:1. "
        : todos.length > 1
        ? ` 현재 등록된 과제:${todos.length}.`
        : null}
    </div>
  );
}

export default ToDoCount;
