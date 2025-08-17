import { useState } from "react";
import listordered from '../assets/list-ordered.svg'
import listUndordered from '../assets/list-unordered.svg'
import mix from '../assets/mic.svg'
import plus from '../assets/plus.svg'
import textItalic from '../assets/text-italic.svg'
import videoCamera from '../assets/video-camera.svg'
import trash from '../assets/trash.svg'
import send from '../assets/send.svg'
import bold from '../assets/Vector.svg'
import quotes from '../assets/quotes.svg'
import textUnderline from '../assets/text-underline.svg'
import scrips from '../assets/script.svg'

interface TextEditorProps {
    onSubmit: (content: string) => void;
    handleButtonClick: ()=> void 
  }
export default function TextEditor({ onSubmit, handleButtonClick }: TextEditorProps) {
  const [value, setValue] = useState("");
  const [posts, setPosts] = useState<string[]>([]);

  const handleSend = () => {
    if (!value.trim()) return; // prevent empty posts
    setPosts([value, ...posts]); // add new post on top
    onSubmit(value);
    setValue(""); // clear editor
  };

  return (
    <div>
      {/* Editor */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4">
        {/* Toolbar */}
        <div className="flex items-center justify-between border border-gray-300 rounded-lg px-3 py-1 mb-3 bg-[#00000008]">
          {/* Left side */}
          <div className="flex items-center">
            {/* Dropdown */}
            <select className="text-sm bg-transparent outline-none mr-5 rounded-[7px] bg-white shadow-[0_1px_7px_0_rgba(0,0,0,0.09)] p-2 text-black" >
              <option>Paragraph</option>
              <option>Heading</option>
            </select>
            <div className="flex items-center gap-2 mr-5 border-r border-r-[rgba(0,0,0,0.1)] px-4">
              <button onClick={handleButtonClick} className="rounded-[7px] bg-white shadow-[0_1px_7px_0_rgba(0,0,0,0.09)] p-2 text-black"><img src={bold} alt="Bold" className="w-4 h-4" /></button>
              <button onClick={handleButtonClick}><img src={textItalic} alt="Italic" className="w-4 h-4" /></button>
              <button onClick={handleButtonClick}><img src={textUnderline} alt="Underline" className="w-4 h-4" /></button>
            </div>

            {/* Toolbar buttons */}
            <div className="flex items-center gap-2 mr-5 border-r border-r-[rgba(0,0,0,0.1)] px-4">
              <button onClick={handleButtonClick}><img src={listUndordered} alt="List" className="w-4 h-4" /></button>
              <button onClick={handleButtonClick}><img src={listordered} alt="List Ordered" className="w-4 h-4" /></button>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleButtonClick}><img src={quotes} alt="Quotes" className="w-4 h-4" /></button>
              <button onClick={handleButtonClick} ><img src={scrips} alt="Scripts" className="w-4 h-4" /></button>
            </div>
          </div>

          {/* Right side (Trash) */}
          <button onClick={() => setValue("")}><img src={trash} alt="Delete" className="w-4 h-4" /></button>
        </div>

        {/* Textarea */}
        <textarea
          placeholder="😊 How are you feeling today?"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full min-h-[80px] resize-none outline-none text-sm placeholder-gray-400"
        />

        {/* Footer */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-3">
            <button><img src={plus} alt="Plus" className="w-5 h-5" /></button>
            <button><img src={mix} alt="Emoji" className="w-5 h-5" /></button>
            <button><img src={videoCamera} alt="Attach" className="w-5 h-5" /></button>
          </div>

          <button 
            onClick={handleSend}
            className="p-2 bg-indigo-600 rounded-full hover:bg-indigo-700 transition"
          >
            <img src={send} alt="Send" className="w-4 h-4 invert" />
          </button>
        </div>
      </div>
    </div>
  );
}
