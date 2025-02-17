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
      <div className="text-sm text-slate-500 text-right">
        {tempNote.length}/{MAX_CHARS} characters
      </div>
    </div>
  );

  return (
    <div className="col-span-full">
      <ConstructionPaper color="#E8D8C3" className="min-h-[250px] md:min-h-[300px] p-6">
        <div className="max-w-2xl mx-auto">
          <h3 className={`text-4xl text-center text-slate-800 mb-6 ${comicNeue.className}`}>Keep a Note</h3>

          {note ? (
            <Alert className="Alert mb-4">
              <AlertDescription>
                <p className="font-serif text-lg leading-relaxed p-2" style={{ fontFamily: "Times New Roman, serif" }}>
                  {note}
                </p>
              </AlertDescription>
            </Alert>
          ) : (
            <div className="text-center text-slate-600 italic mb-4">No note yet...</div>
          )}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                className="mx-auto block px-6 py-2 bg-slate-700 text-white rounded-lg 
                hover:bg-slate-600 transition-colors duration-200"
              >
                {note ? "Edit Note" : "Add Note"}
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent
              className={`
              AlertDialogContent
              ${isMobile ? "w-full h-full max-w-none m-0 rounded-none" : "max-w-lg"}
            `}
            >
              <AlertDialogHeader>
                <AlertDialogTitle>Your Personal Note</AlertDialogTitle>
                <AlertDialogDescription>
                  Write a note (up to 360 characters) that will be saved for later.
                </AlertDialogDescription>
              </AlertDialogHeader>
              {dialogContent}
              <AlertDialogFooter>
                <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleSave}>Save</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </ConstructionPaper>
    </div>
  );
};

export default NoteSection;
