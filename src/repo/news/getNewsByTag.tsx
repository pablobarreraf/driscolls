import { News } from "@/typings/news";
import supabase from "../index";

export const getNewsByTag = async (tag: string): Promise<News | null> => {
  try {
    const { data, error } = await supabase.from('news').select('*').eq('tag', tag);
    if (error) {
      throw error;
    }
    if (data) {
      return data[0];
    }
    return null;
  } catch (error) {
    throw error;
  }
};