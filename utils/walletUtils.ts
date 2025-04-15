import { HDNodeWallet, Mnemonic } from "ethers";
import { SupabaseClient } from "@supabase/supabase-js";

// Derive wallet from mnemonic based on index
const getWalletFromIndex = (index: number): HDNodeWallet => {
  const mnemonic = process.env.NEXT_PUBLIC_HARDHAT_MNEMONIC;
  if (!mnemonic) throw new Error("Mnemonic not set");

  const m = Mnemonic.fromPhrase(mnemonic);

  // Derive full path from a root node
  const root = HDNodeWallet.fromSeed(m.computeSeed());
  return root.derivePath(`m/44'/60'/0'/0/${index}`);
};

// Assign a wallet to a user with an available index
const assignHardhatWallet = async (
  userId: string,
  name: string,
  supabase: SupabaseClient
) => {
  console.log("[assignHardhatWallet] Start");
  // Fetch existing users and used indexes
  const { data: existing, error: fetchError } = await supabase
    .from("users")
    .select("hardhat_index")
    .order("hardhat_index", { ascending: true });

  if (fetchError) {
    console.error("Fetch error", fetchError.message);
    return;
  }

  const usedIndexes =
    existing?.map((u) => u.hardhat_index).filter(Number.isInteger) || [];

  // Find the next available index
  const availableIndex = [...Array(10).keys()].find(
    (i) => !usedIndexes.includes(i)
  );

  console.log("Available index:", availableIndex);

  if (availableIndex === undefined) {
    console.error("No available Hardhat indexes");
    return;
  }

  const mnemonic = process.env.NEXT_PUBLIC_HARDHAT_MNEMONIC;
  console.log("Mnemonic present:", Boolean(mnemonic));

  if (!mnemonic) {
    console.error("Mnemonic not set");
    return;
  }

  // Derive the wallet and store it in the database
  try {
    const wallet = getWalletFromIndex(availableIndex);
    console.log("Derived wallet address:", wallet.address);
    console.log("Updating user ID:", userId);

    let attempt = 0;
    let match = [];

    while (attempt < 3 && match.length === 0) {
      const { data } = await supabase
        .from("users")
        .select("id")
        .eq("id", userId);

      match = data ?? [];
      if (match.length === 0) {
        console.log(`[Retry] User not found yet, attempt ${attempt + 1}`);
        await new Promise((res) => setTimeout(res, 500));
        attempt++;
      }
    }

    if (match.length > 0) {
      const { error } = await supabase
        .from("users")
        .update({
          wallet_address: wallet.address,
          hardhat_index: availableIndex,
        })
        .eq("id", userId);

      if (error) {
        console.error("Update error:", error.message);
      } else {
        console.log("User wallet info updated successfully");
      }
    } else {
      console.error("User row never became available after retries");
    }
  } catch (error: any) {
    console.error("Mnemonic error or wallet derivation failed:", error.message);
  }
};

export { assignHardhatWallet };
