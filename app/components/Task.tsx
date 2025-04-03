"use client";

import { ITask } from "@/types/tasks";
import { FormEventHandler, useState } from "react";
import { FiCheckCircle, FiCircle, FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { completeTodo, deleteTodo, editTodo, uncompleteTodo } from "@/api";
import UpsertTaskModal from "./UpsertTaskModal";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [openModalComplete, setOpenModalComplete] = useState<boolean>(false);
  const [openModalUncomplete, setOpenModalUncomplete] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text ?? '');

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit,
    });
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setOpenModalDeleted(false);
    router.refresh();
  };

  const handleCompleteTask = async (id: string) => {
    await completeTodo(id);
    setOpenModalComplete(false);
    router.refresh();
  };

  const handleUncompleteTask = async (id: string) => {
    await uncompleteTodo(id);
    setOpenModalUncomplete(false);
    router.refresh();
  };

  return (
    <tr key={task.id}>
      <td className={task.done ? 'line-through text-green-200 font-bold w-full' : 'w-full'} data-testid="todo-name-label">{task.text}</td>
      {!task.done && <td className='flex gap-5'>
        <FiCircle
          onClick={() => setOpenModalComplete(true)}
          cursor='pointer'
          className='text-green-500'
          size={25}
          data-testid="complete-todo"
        />
        <Modal modalOpen={openModalComplete} setModalOpen={setOpenModalComplete}>
          <h3 className='text-lg'>
            Are you sure you want to complete this task?
          </h3>
          <div className='modal-action'>
            <button onClick={() => handleCompleteTask(task.id)} className='btn' data-testid='complete-todo-confirm'>
              Yes
            </button>
          </div>
        </Modal>
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          cursor='pointer'
          className='text-blue-500'
          size={25}
          data-testid="edit-todo"
        />
        <UpsertTaskModal 
          modalOpen={openModalEdit} 
          setModalOpen={setOpenModalEdit}
          handleSubmit={handleSubmitEditTodo}
          value={taskToEdit}
          setValue={setTaskToEdit}
          variant='edit'
        />
        <FiTrash2
          onClick={() => setOpenModalDeleted(true)}
          cursor='pointer'
          className='text-red-500'
          size={25}
          data-testid="delete-todo"
        />
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
          <h3 className='text-lg'>
            Are you sure you want to delete this task?
          </h3>
          <div className='modal-action'>
            <button onClick={() => handleDeleteTask(task.id)} className='btn' data-testid='delete-todo-confirm'>
              Yes
            </button>
          </div>
        </Modal>
      </td>}
      {task.done && <td className='flex gap-5'>
        <FiCheckCircle
          onClick={() => setOpenModalUncomplete(true)}
          cursor='pointer'
          className='text-green-500'
          size={25}
          data-testid="uncomplete-todo"
        />
        <Modal modalOpen={openModalUncomplete} setModalOpen={setOpenModalUncomplete}>
          <h3 className='text-lg'>
            Are you sure you want to restore this task?
          </h3>
          <div className='modal-action'>
            <button onClick={() => handleUncompleteTask(task.id)} className='btn' data-testid='uncomplete-todo-confirm'>
              Yes
            </button>
          </div>
        </Modal>
      </td>}
    </tr>
  );
};

export default Task;
