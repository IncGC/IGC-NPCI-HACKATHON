function getTypeClr(type) {
  if (type === "Tokenized" || type === "Authorised") return "text-green-400"
  if (type === "Detokenized" || type === "Failure") return "text-red-400"
  if (type === "Sale") return "text-orange-400"
  if (type === "Purchase" || type === "Success") return "text-emerald-400"
  if (type === "Trade" || type === "Pending") return "text-yellow-300"
}

export default getTypeClr