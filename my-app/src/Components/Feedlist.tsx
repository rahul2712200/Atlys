import { useState } from 'react'
import '../App.css'
import '../index.css'
import TextEditor from './TextEditor'
export default function Feedlist() {

    return (
        <div className="container border border-[rgba(0,0,0,0.03)] rounded-[21px] p-2">
            <TextEditor></TextEditor>
        </div>

    )
}