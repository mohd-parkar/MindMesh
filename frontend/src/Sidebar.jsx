import "./sidebar.css";

function Sidebar(){
    return (
        <section className="sidebar">
            <button>
                <img src="src/assets/ai-brain.png" alt="logo" className="logo"></img>
                <i className="fa-solid fa-pen-to-square"></i>
            </button>

            <ul className="history">
                <li>Thread 1</li>
                <li>Thread 2</li>
                <li>Thread 3</li>
            </ul>

            <div className="sign">
                <p> By Mohd Parkar</p>
            </div>
        </section>
    )
}

export default Sidebar;