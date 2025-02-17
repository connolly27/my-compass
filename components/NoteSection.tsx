import React, { useState, useEffect } from "react";
import ConstructionPaper from "./ConstructionPaper";
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
import { comicNeue } from "../app/fonts";

const NOTE_STORAGE_KEY = "personal-note";
const MAX_CHARS = 360;

const NoteSection = () => {
  const [note, setNote] = useState("");
  const [tempNote, setTempNote] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const savedNote = localStorage.getItem(NOTE_STORAGE_KEY);
    if (savedNote) {
      setNote(savedNote);
      setTempNote(savedNote);
    }
    setIsHydrated(true);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSave = () => {
    if (tempNote.length <= MAX_CHARS) {
      setNote(tempNote);
      localStorage.setItem(NOTE_STORAGE_KEY, tempNote);
    }
  };

  const handleCancel = () => {
    setTempNote(note);
  };

  if (!isHydrated) {
    return null;
  }

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
      />
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

          {note ? (
            <Alert className="Alert mb-6 max-w-[75%] mx-auto md:max-w-none">
              <AlertDescription>
                <p className="font-['Crimson_Text'] text-lg leading-relaxed p-2">{note}</p>
              </AlertDescription>
            </Alert>
          ) : (
            <div className="text-center text-slate-600 italic mb-6 font-['Crimson_Text']">No note yet...</div>
          )}

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
