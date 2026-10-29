import { Redis } from '@upstash/redis';
const kv = Redis.fromEnv();

const STORAGE_KEY = "my_shortcut_list";

// 1. READ THE WHOLE LIST
export async function GET() {
  const currentList = await kv.get(STORAGE_KEY) || [];
  return Response.json({ payload: currentList });
}

// 2. ADD ITEM(S) TO THE LIST
export async function POST(request) {
  const body = await request.json();
  const incomingItems = body.payload;

  let currentList = await kv.get(STORAGE_KEY) || [];

  if (Array.isArray(incomingItems)) {
    currentList = currentList.concat(incomingItems);
  } else {
    currentList.push(incomingItems);
  }

  await kv.set(STORAGE_KEY, currentList);
  return Response.json({ status: "Success", payload: currentList });
}

// 3. DELETE A SPECIFIC ITEM FROM THE LIST
export async function DELETE(request) {
  const body = await request.json();
  const targetItem = body.itemToDelete; // The specific text string to remove

  let currentList = await kv.get(STORAGE_KEY) || [];

  // Filter out the specific item, keeping everything else
  let updatedList = currentList.filter(item => item !== targetItem);

  await kv.set(STORAGE_KEY, updatedList);
  return Response.json({ status: "Success", remaining: updatedList });
}
