import { ITask } from "interfaces/task.interface"
import { useMutation } from "@apollo/client";
import { TaskRequests, taskMutations } from "@/requests/";


export const Note = (props: ITask) => {
  const [completeTask] = useMutation(taskMutations[TaskRequests.COMPLETE_TASK]);
  const [deleteTask] = useMutation(taskMutations[TaskRequests.DELETE_TASK]);

  const handleCompleteTask = async (taskId: string) => {
    try {
      const { data, errors } = await completeTask({
        variables: {
          id: taskId,
        },
      });

      if (errors) {
        console.error('GraphQL Errors:', errors);
        return;
      }

      const completedTask = data?.completeTask?.task;
      console.log('Completed Task:', completedTask);
    } catch (error) {
      console.error('Error completing task:', (error as Error).message);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const { data, errors } = await deleteTask({
        variables: {
          id: taskId,
        },
      });

      if (errors) {
        console.error('GraphQL Errors:', errors);
        return;
      }

      const success = data?.deleteTask?.success;
      if (success) {
        console.log('Task deleted successfully');
      } else {
        console.error('Failed to delete task.');
      }
    } catch (error) {
      console.error('Error deleting task:', (error as Error).message);
    }
  };

  return (
    <div className="bg-slate-300 px-2 rounded-lg my-2 py-6 max-w-[800px] h-3 w-4/5 flex justify-between items-center">
      <div className="flex justify-center gap-x-4">
        <p className="font-bold">{ props.id }.</p>
        <h3 className="text-center">{ props.title }</h3>
        <p>{ props.completed ? 'completed' : 'not' }</p>
      </div>
      <div className='flex items-center gap-x-2'>
        <button 
          className='text-slate-50 px-2 py-1 bg-green-400 hover:bg-green-600 rounded-md transition-colors'
          onClick={() => handleCompleteTask(props.id)}
        >
          complete
        </button>
        <button 
          className='text-slate-50 px-2 py-1 bg-red-400 hover:bg-red-600 rounded-md transition-colors'
          onClick={() => handleDeleteTask(props.id)}
        >
          delete
        </button>
      </div>
    </div>
  )
}
