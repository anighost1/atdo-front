
const TodoCard = ({ data }) => {
    return (
        <div className="card shadow-sm w-[30%] bg-[#ffffff22] w-[95%] md:w-[80%]  ">
            <div className="p-4 text-[#d8d8d8aa]">
                <p className="text-2xl">{data?.title}</p>
                <p className="text-md">{data?.description}</p>
            </div>
        </div>
    )
}

export default TodoCard