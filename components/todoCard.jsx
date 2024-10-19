
const TodoCard = ({ data, deleteTodo, completeTodo }) => {
    return (
        <div className="card hover:scale-[1.01] duration-100 shadow-sm w-[30%] bg-[#ffffff22] w-[95%] md:w-[80%] flex flex-col md:flex-row justify-between items-start md:items-center px-4 py-2 ">
            <div className="p-4 text-[#d8d8d8aa] w-full">
                <p className="text-2xl">{data?.title}</p>
                <p className="text-md">{data?.description}</p>
            </div>
            {/* {!data?.completed ? ( */}
                <div className="flex flex-row justify-end w-full join">
                    <button onClick={() => deleteTodo.mutate({ id: data?._id })} className="btn btn-outline join-item min-w-28">Delete</button>
                    <button disabled={data?.completed} onClick={() => completeTodo.mutate({ id: data?._id })} className="btn btn-outline bg-[#33333355] join-item min-w-28">{data?.completed ? 'Completed' : 'Done'}</button>
                </div>
            {/* ) : ( */}
                {/* <div className="flex flex-row justify-end w-full">
                    <button disabled className="btn btn-outline min-w-48">Completed</button>
                </div> */}
            {/* )} */}
        </div>
    )
}

export default TodoCard