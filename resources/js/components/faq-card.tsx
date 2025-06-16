"use client";
import SvgComponent from "@/components/svg-component";
import { useState } from "react";

export default function FaqCard({ question, answer} : { question: string; answer: string }) {

const [isOpen, setIsOpen] = useState(false);

return (
    <div className="mb-6">
        <button
            className="flex justify-between items-center w-full text-left font-medium text-white bg-[#ea384d] p-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
        >
            <span>{question}</span>
            <SvgComponent
                className={`w-5 h-5 text-white transform transition-transform ${
                    isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    d="M19 9l-7 7-7-7"
                />
            </SvgComponent>
        </button>
        {isOpen && (
            <div className="mt-2 p-5 bg-white rounded-lg">
                <p className="text-gray-700">{answer}</p>
            </div>
        )}
    </div>
);
}
