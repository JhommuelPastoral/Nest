import axiosInstance from "@/lib/axios";

type journalProps = {
  userId: string;
  title: string;
  content: string;
  mood: string;
  wordsCount: number
}


export async function addJournal({newJournal}:{newJournal: journalProps}){
  try {
    const response = await axiosInstance.post("/api/journal", newJournal);
    if(response.status !== 200) return false;
    return response.data;
  } catch (error) {
    console.log("Add journal error:", error);
  }
  return false;
  
}

export async function getJournal({userId}:{userId: string}){
  try {
    const response = await axiosInstance.get(`/api/journal/${userId}`);
    if(response.status !== 200) return false;
    return response.data;
  } catch (error) {
    console.log("Get journal error:", error);
  }
  return false;
  
}