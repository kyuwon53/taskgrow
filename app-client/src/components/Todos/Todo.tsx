import { useState } from 'react';
import { BsPencil } from 'react-icons/bs';
import TodoDetail from './TodoDetail';
import DeleteTodo from './DeleteTodo';
import { updateTodo } from '../../services/todo';
import { useTodosStore } from '../../store/todos';
import { useTimerStore } from '../../store/timer';
import resetTimer from '../../utils/resetTimer';

interface TodoProps {
  id: number;
  title: string;
  status: string;
  planCount: number;
  performCount: number;
  onClick: () => void;
}

const Todo = ({
  id,
  title,
  status,
  planCount,
  performCount,
  onClick,
}: TodoProps) => {
  const timer = useTimerStore();
  const todos = useTodosStore();
  const { isTodoChange, setIsTodoChange } = useTodosStore();

  const [isDetailShow, setIsDetailShow] = useState(false);
  const [isDeleteShow, setIsDeleteShow] = useState(false);

  const getIsDetailShow = () => {
    setIsDetailShow(false);
  };

  const getIsDeleteShow = () => {
    setIsDeleteShow(false);
  };

  const handleTodoDelete = () => {
    setIsDeleteShow(true);
  };

  const handleTodoDetail = () => {
    setIsDetailShow(true);
  };

  const handleTodoComplete = async () => {
    const todoData = {
      todoId: id,
      todo: title,
      status: 'DONE',
      planCount: planCount,
    };
    await updateTodo(todoData);
    setIsTodoChange(!isTodoChange);
    resetTimer(timer, todos, 'reset');
  };

  return (
    <>
      <div
        className={`flex justify-between items-center border-b border-slate-200 py-3 border-l-4 ${
          status === 'DONE' ? 'border-l-transparent' : 'border-l-indigo-300'
        } ${
          status === 'DONE'
            ? 'color-main-colorbg-gradient-to-r from-transparent to-transparent hover:from-slate-100'
            : 'bg-gradient-to-r from-indigo-100 to-transparent hover:from-indigo-200'
        } transition ease-linear duration-150 cursor-pointer`}
        style={{ display: 'flex', width: '100%' }}
        onClick={onClick}
      >
        <div
          className="inline-flex items-center space-x-2"
          style={{ width: '60%' }}
        >
          <button
            onClick={handleTodoComplete}
            disabled={status === 'DONE'}
            style={{ width: '10%' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke={status === 'DONE' ? 'var(--main-color)' : 'currentColor'}
              className="w-6 h-6 text-slate-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </button>
          <div
            className={`text-slate-500 ${
              status === 'DONE' ? 'line-through' : ''
            }`}
            style={{
              width: '100%',
              overflow: 'hidden',
            }}
          >
            {title}
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <div className={`text-slate-500 px-5`}>
            {performCount} / {planCount}
          </div>
          <button onClick={handleTodoDelete}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 text-slate-500 hover:text-slate-700 hover:cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
          <button
            className={`text-slate-500 px-2`}
            onClick={handleTodoDetail}
            disabled={status === 'DONE'}
          >
            <BsPencil />
          </button>
        </div>
      </div>
      {isDetailShow && (
        <TodoDetail
          todoId={id}
          todoTitle={title}
          todoStatus={status}
          todoPlanCount={planCount}
          todoPerformCount={performCount}
          getIsShow={getIsDetailShow}
        />
      )}
      {isDeleteShow && (
        <DeleteTodo todoId={id} todoTitle={title} getIsShow={getIsDeleteShow} />
      )}
    </>
  );
};
export default Todo;
