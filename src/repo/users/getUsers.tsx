import { User } from "@/typings/user";
import supabase from "../index";

export const getUsers = async (): Promise<User[]> => {
  try {
    const { data, error } = await supabase.from('users').select('*').order('created_at');
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