"use client"

import { useQuery, useMutation } from "@tanstack/react-query";
import Http from "@/lib/http";
import urls from "@/lib/urls";
import toast from 'react-hot-toast';
import TodoCard from "@/components/todoCard";
import { useState } from "react";
import AddTodoCard from "@/components/addTodoCard";

export default function Home() {
  const [pagination, setPagination] = useState()
  const http = new Http()
  const [addModalOpen, setAddModalOpen] = useState(false)

  const { data, isFetching, isError, error, refetch } = useQuery({
    queryKey: ["get-todo"],
    queryFn: async () => await http.get(urls.todo),
    initialData: []
  });

  let reset
  const handleReset = (func) => {
    reset = func
  }

  const mutation = useMutation({
    mutationFn: async data => await http.post(urls.todo, data),
    onSuccess: (data) => {
      toast.success('Added successfully')
      refetch()
      if (reset) {
        reset()
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message)
    },
  });

  const deleteTodo = useMutation({
    mutationFn: async data => await http.post(`${urls.todo}/delete`, data),
    onSuccess: (data) => {
      toast.success('Deleted successfully')
      refetch()
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message)
    },
  });

  const completeTodo = useMutation({
    mutationFn: async data => await http.post(`${urls.todo}/completed`, data),
    onSuccess: (data) => {
      toast.success('Completed successfully')
      refetch()
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message)
    },
  });

  if (isFetching) {
    return (
      <div className='flex flex-col gap-4 justify-center items-center h-[92%] p-4 fixed overflow-y-scroll w-full'>
        <span className="loading loading-ring loading-lg"></span>
      </div>
    )
  }

  if (isError) {
    return (
      <div className='flex flex-col gap-4 justify-center items-center h-[92%] p-4 fixed overflow-y-scroll w-full'>
        <span className="text-2xl text-[#d8d8d8cc]">{error?.message}</span>
      </div>
    )
  }

  return (
    <div className="pt-16">
      {addModalOpen && (
        <div
          className="fixed flex items-center justify-center w-full h-[85%] z-10 px-2 transition-opacity duration-1000 opacity-0 transform scale-95"
          style={{ opacity: addModalOpen ? '1' : '0', transform: addModalOpen ? 'scale(1)' : 'scale(0.95)' }}
        >
          <AddTodoCard
            open={setAddModalOpen}
            mutation={mutation}
            handleReset={handleReset}
          />
        </div>
      )}
      {/* <div className="fixed z-10 flex flex-row items-center justify-end w-full p-4 px-10"> */}
      <button className="fixed right-0 z-10 m-4 max-sm:bottom-0 btn btn-active" onClick={() => setAddModalOpen(prev => !prev)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v16M4 12h16" />
        </svg>
        Add
      </button>
      {/* </div> */}
      <div className='flex flex-col gap-4  items-center h-[92%] p-4 fixed overflow-y-scroll w-full'>
        {
          !isFetching && data?.data?.data?.data.map((item, index) => (
            <TodoCard key={index} data={item} deleteTodo={deleteTodo} completeTodo={completeTodo} />
          ))
        }
      </div>
    </div>
  );
}
