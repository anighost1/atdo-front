"use client"

import { useQuery } from "@tanstack/react-query";
import Http from "@/lib/http";
import urls from "@/lib/urls";
import TodoCard from "@/components/todoCard";
import { useState } from "react";

export default function Home() {
  const [pagination, setPagination] = useState()
  const http = new Http()

  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["get-todo"],
    queryFn: async () => await http.get(urls.todo),
    initialData: []
  });

  // console.log(data?.data?.data?.data)

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
      <div className='flex flex-col gap-4  items-center h-[92%] p-4 fixed overflow-y-scroll w-full'>
        {
          !isFetching && data?.data?.data?.data.map((item, index) => (
            <TodoCard key={index} data={item} />
          ))
        }
      </div>
    </div>
  );
}
