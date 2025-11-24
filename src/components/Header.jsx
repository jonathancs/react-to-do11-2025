import {useState} from "react"

function Header({ setTasks, handleAddTask }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex flex-col items-center">
      <span className="text-6xl font-bold text-white pb-6">
        ✅ Fucking do it
      </span>
      <div className="flex flex-row space-x-2">
        <input
          type="text"
          placeholder="teste por enquanto"
          className="input text-3xl p-2 rounded-lg bg-gray-800 text-gray-400"
          maxLength={50}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="add-button text-6xl bg-gray-800 rounded-lg hover:bg-gray-700 w-20 h-20"
          onClick={() => {
            handleAddTask(inputValue, null);
            setInputValue("")
          }}
        >
          <span className="relative top-[-6px] text-gray-500">+</span>
        </button>
      </div>
    </div>
  );
}

export default Header;

// ----gpt couldn't answer----
// how to centralize below with top ?

// how to center + ?