// utils/fetch.js

export async function fetchAndStore(url, options = {}) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // 保存到 localStorage
    localStorage.setItem("eventList", JSON.stringify(data.eventList || data));

    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error; // 继续抛出，方便上层捕获处理
  }
}
