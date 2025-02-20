import React, { useState, useEffect } from "react";
import ConstructionPaper from "./ConstructionPaper";
// Import UI components from shadcn/ui library
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Constants for localStorage key and maximum character limit
const NOTE_STORAGE_KEY = "personal-note";
const MAX_CHARS = 360;

const NoteSection = () => {
  // State management
  const [note, setNote] = useState(""); // The saved note
  const [tempNote, setTempNote] = useState(""); // Temporary note while editing
  const [isHydrated, setIsHydrated] = useState(false); // Tracks if localStorage is loaded
  const [isMobile, setIsMobile] = useState(false); // Tracks viewport size

  useEffect(() => {
    // Load saved note from localStorage on component mount
    const savedNote = localStorage.getItem(NOTE_STORAGE_KEY);
    if (savedNote) {
      setNote(savedNote);
      setTempNote(savedNote);
    }
    setIsHydrated(true);

    // Handle responsive layout
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check and event listener setup
    handleResize();
    window.addEventListener("resize", handleResize);
    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array means this runs once on mount

  // Save the temporary note to permanent storage
  const handleSave = () => {
    if (tempNote.length <= MAX_CHARS) {
      setNote(tempNote);
      localStorage.setItem(NOTE_STORAGE_KEY, tempNote);
    }
  };

  // Reset temporary note to last saved version
  const handleCancel = () => {
    setTempNote(note);
  };

  // Guard clause: don't render until localStorage is checked
  if (!isHydrated) {
    return null;
  }

  // Textarea and character count for the dialog
  const dialogContent = (
    <div className="space-y-4">
      <textarea
        value={tempNote}
        onChange={(e) => setTempNote(e.target.value)}
        placeholder="Write a note to yourself..."
        className={`w-full h-32 p-3 border rounded-lg focus:outline-none focus:ring-2 
          focus:ring-blue-400 resize-none font-serif text-lg leading-relaxed
          ${isMobile ? "min-h-[200px]" : ""}`}
        style={{ fontFamily: "Times New Roman, serif" }}
        autoFocus
        onFocus={(e) => {
          // Move cursor to end of text when focused
          const textarea = e.target;
          setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
          }, 0);
        }}
      />
      {/* Character count indicator - turns red when over limit */}
      <div
        className={`text-sm text-right ${tempNote.length > MAX_CHARS ? "text-red-500 font-medium" : "text-slate-500"}`}
      >
        {tempNote.length}/{MAX_CHARS} characters
      </div>
    </div>
  );

  return (
    <div className="col-span-full">
      <ConstructionPaper color="#E8D8C3" className="min-h-[250px] md:min-h-[300px] pb-12">
        <div className="max-w-[90%] md:max-w-2xl mx-auto pt-8">
          <h3 className="text-4xl text-center text-slate-800 mt-12 mb-8">Keep a Note</h3>

          {/* Display either the saved note or a placeholder message */}
          {note ? (
            <Alert className="Alert mb-6 max-w-[75%] mx-auto md:max-w-none">
              <AlertDescription>
                <p className="font-['Crimson_Text'] text-lg leading-relaxed p-2">{note}</p>
              </AlertDescription>
            </Alert>
          ) : (
            <div className="text-center text-slate-600 italic mb-6 font-['Crimson_Text']">No note yet...</div>
          )}

          {/* Edit dialog using shadcn/ui AlertDialog component */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                className="mx-auto block px-6 py-2 bg-slate-700 text-white rounded-lg 
                hover:bg-slate-600 transition-colors duration-200 mb-6"
              >
                {note ? "Edit Note" : "Add Note"}
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent
              className={`
              AlertDialogContent
              ${isMobile ? "w-[90%] max-w-none m-4 rounded-lg" : "max-w-lg"}
            `}
            >
              <AlertDialogHeader>
                <AlertDialogTitle>Your Personal Note</AlertDialogTitle>
                <AlertDialogDescription>
                  Write a note (up to 360 characters) that will be saved for later.
                </AlertDialogDescription>
              </AlertDialogHeader>
              {dialogContent}
              <AlertDialogFooter className="space-y-2">
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                  <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
                  {/* Disable save button if note is too long */}
                  <AlertDialogAction
                    onClick={handleSave}
                    disabled={tempNote.length > MAX_CHARS}
                    className={tempNote.length > MAX_CHARS ? "opacity-50 cursor-not-allowed" : ""}
                  >
                    Save
                  </AlertDialogAction>
                </div>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </ConstructionPaper>
    </div>
  );
};

export default NoteSection;
