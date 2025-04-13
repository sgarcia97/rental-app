import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseServer } from "@/utils/supabase/serverClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user_id } = req.body;

  // Get user's current index
  const { data: user, error: userError } = await supabaseServer
    .from("users")
    .select("hardhat_index")
    .eq("id", user_id)
    .single();

  if (userError) return res.status(500).json({ error: userError.message });

  if (user.hardhat_index !== null) {
    return res.status(200).json({ hardhat_index: user.hardhat_index });
  }

  // Query available index
  const { data: availableIndex, error: indexError } = await supabaseServer.rpc(
    "get_available_hardhat_index"
  );

  if (indexError || availableIndex === null) {
    return res.status(500).json({ error: "No available Hardhat index." });
  }

  // Assign to user
  const { error: updateError } = await supabaseServer
    .from("users")
    .update({ hardhat_index: availableIndex })
    .eq("id", user_id);

  if (updateError) return res.status(500).json({ error: updateError.message });

  return res.status(200).json({ hardhat_index: availableIndex });
}
