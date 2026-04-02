import './Tasks.css'

export default function Filter({filter, setFilter}) {
    return(
        <div className='filter'>
            <button className='all' onClick={() => setFilter("all")}>All</button>
            <button className='all' onClick={() => setFilter("active")}>Active</button>
            <button className='all' onClick={() => setFilter("completed")}>Completed</button>
        </div>
        
    )
}
