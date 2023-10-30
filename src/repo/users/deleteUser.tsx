import { User } from "@/typings/user";
import supabase from "../index";

export const deleteUser = async (user: User | null): Promise<void> => {
  try {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', user?.id);
    if (error) {
      throw error;
    }
    return;
  } catch (error) {
    throw error;
  }
};