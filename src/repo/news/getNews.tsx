import { News } from "@/typings/news";
import supabase from "../index";

export const getNews = async (): Promise<News[]> => {
  try {
    const { data, error } = await supabase.from('news').select('*').order('created_at');
    if (error) {
      throw error;
    }
    if (data) {
      return data;
    }
    return [];
  } catch (error) {
    throw error;
  }
};