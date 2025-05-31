export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  
  // Format: YYYY年MM月DD日
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  return `${year}年${month}月${day}日`;
}