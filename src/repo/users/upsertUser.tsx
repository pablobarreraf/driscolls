import { User } from "@/typings/user";
import supabase from "../index";

export const upsertUser = async (user: User): Promise<void> => {
  try {
    const { error } = await supabase.from('users').upsert([user]);
    if (error) {
      if (error.code === "23505") {
        // eslint-disable-next-line no-throw-literal
        throw "Username already exists";
      }
      throw error;
    }
    return;
  } catch (error) {
    throw error;
  }
};