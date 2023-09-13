export const getUserAssets = async (account) => {
  const result = await fetch("/api/getUserAssets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ account }),
  })
  const data = await result.json()
  return data
}
