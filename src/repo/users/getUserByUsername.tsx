import { User } from "@/typings/user";
import supabase from "../index";

export const getUserByUsername = async (username: string): Promise<User | null> => {
  try {
    const { data, error } = await supabase.from('users').select('*').eq('username', username);
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