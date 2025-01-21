import { useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { createTask, deleteTask, updateTask, getTask } from '../api/tasks.api' //funcion createTask
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { toast } from 'react-hot-toast'


//yup y zod dos bibliotecas

export function TasksFormPage() { //exportamos la funcion
    const { register,
        handleSubmit, formState: {
            errors
        }, setValue } = useForm();

    const navigate = useNavigate()
    const params = useParams()
    console.log(params)

    const onSubmit = handleSubmit(async (data) => {
        if (params.id) {
            await updateTask(params.id, data)
            toast.success("Tarea Actualizada", {

                style: { background: "#101010", color: "#fff" }

            })
        } else {
            await createTask(data) //envia una peticion al backend
            toast.success("Tarea Creada", {
                position: "bottom-right",
                style: { background: "#101010", color: "#fff" }

            })
        }

        navigate("/tasks");
    });

    useEffect(() => {
        async function loadTasks() {
            if (params.id) {
                const res = await getTask(params.id);
                setValue('title', res.data.title)
                setValue('description', res.data.description)
                console.log(res)
            }
        }
        loadTasks();
    }, [])
    return (
        <div className='max-w-xl mx-auto'>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Title"
                    {...register('title', { required: true })}
                    className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' />
                {errors.title && <span>this field is required</span>}
                <textarea rows="3" placeholder="Description"
                    {...register('description', { required: true })}
                    className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'></textarea>
                {errors.description && <span>this field is required</span>}

                <button className='bg-indigo-500 p-3 rounded-lg block w-full mt3'>Save</button>
            </form>

            {params.id && (
                <div className='flex justify-end'>
                    <button onClick={async () => {
                    const accepted = window.confirm("Are you sure")
                    if (accepted) {
                        await deleteTask(params.id);

                        navigate("/tasks");
                        toast.success("Tarea Eliminada", {
                            style: { background: "#101010", color: "#fff" }

                        })
                    }
                }}
                    className='bg-red-500 p-3 rounded-lg w-48 mt-3'>Delete</button>
                </div>
            )}


        </div>
    )
}