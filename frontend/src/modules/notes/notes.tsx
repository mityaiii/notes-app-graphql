import { Header } from '@/components/index';
import { Note } from "./components/note";
import { useQuery } from '@apollo/client';
import { ITask } from '@/interfaces/index';
import { noteQueries } from '@/requests/index';

export const Notes = () => {
  const { loading, error, data } = useQuery<ITask[]>(noteQueries.GET_TASKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <main>
      <Header>Задачи</Header>
      <section className='flex flex-col items-center'>
        <div className="w-4/5 max-w-[800px] border-t-2 border-slate-800"/>
        { data?.map(note => <Note {...note}/>) }
      </section>
    </main>
  )
}
