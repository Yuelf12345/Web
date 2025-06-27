export const loadScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    const ak = "vpD700QXnDi0mfniKQqkmIiPVabmvGrB";
    script.type = "text/javascript";
    script.src = `//api.map.baidu.com/api?v=3.0&ak=${ak}`;
    script.onload = () => {
      resolve();
    };
    script.onerror = (error: string | Event) => {
      console.log("error", error);
      reject(new Error("Failed to load Baidu Map API script" + error));
    };
    document.head.appendChild(script);
  });
};
