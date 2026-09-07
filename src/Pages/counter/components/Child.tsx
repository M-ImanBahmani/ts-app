import { useCounterStore } from "../../../Stores/Counter.store"


const Child = () => {
    const {counter} = useCounterStore()

    return (
        <div className="bg-gray-800 p-4 rounded-2xl mt-4">
            <h2 className="text-2xl">Child Component</h2>
            <p className="text-xl mt-2 bg-slate-600 px-2 py-1.5 text-center rounded-lg w-10 h-10">{counter}</p>
        </div>
    )
}

export default Child