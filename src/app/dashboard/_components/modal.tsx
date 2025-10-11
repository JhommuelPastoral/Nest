type RecentJournalModalProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  journal: {
    id: string;
    title: string;
    content: string;
    mood: string;
    createdAt: Date;
    wordsCount: number;
  };
};

export default function RecentJournalModal({ setIsOpen, journal }: RecentJournalModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 font-nunito" onClick={()=> setIsOpen(false)}>
      <div className="w-full max-w-lg p-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-xl font-semibold">{journal.title}</h2>
        <p className="mt-2 text-slate-600">{journal.content}</p>

        <div className="mt-4 text-sm text-slate-500">
          <p>Mood: {journal.mood}</p>
          <p>
            Date:{" "}
            {new Date(journal.createdAt).toLocaleDateString("en-CA", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          <p>{journal.wordsCount} words</p>
        </div>

        <button
          onClick={() => setIsOpen(false)}
          className="w-full py-2 mt-6 text-white rounded-md bg-slate-800 hover:bg-slate-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}
