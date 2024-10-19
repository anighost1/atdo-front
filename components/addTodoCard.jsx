import { useForm } from 'react-hook-form';

export default function AddTodoCard({ open, mutation, handleReset }) {

    const { register, reset, handleSubmit, formState: { errors } } = useForm();

    const submitHandler = (data) => {
        mutation.mutate(data)
        handleReset(reset)
        open(false)
    }

    return (
        <div className="w-full p-4 m-2 card glass lg:w-[80%] min-h-[70%]">
            <form onSubmit={handleSubmit(submitHandler)}>
                <div className="flex justify-end w-full">
                    <button type='button' className="btn btn-circle btn-ghost" onClick={() => open(false)}>
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
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="card-body">
                    <h2 className="card-title">Add a todo</h2>
                    <div className="divider"></div>
                    <div className="flex flex-col items-center gap-4 md:flex-row">
                        <input
                            type="text"
                            placeholder="Title"
                            className={`w-full input bg-[#ffffff77] grow ${errors.title ? 'input-error' : ''}`}
                            {...register('title', { required: 'Title is required' })}
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            className={`w-full input bg-[#ffffff77]`}
                            {...register('description')}
                        />
                    </div>
                    <div className="divider"></div>
                    <div className="flex flex-col items-center justify-end gap-2 card-actions md:flex-row">
                        {errors.title && (
                            <span className="mt-1 text-sm text-red-600">{errors.title.message}</span>
                        )}
                        <button
                            type='submit'
                            className="w-full btn btn-primary md:min-w-28 md:w-[20%]"
                            disabled={mutation.isPending}
                        >
                            {mutation.isPending ? <span className="loading loading-ring loading-lg"></span> : 'Add'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
