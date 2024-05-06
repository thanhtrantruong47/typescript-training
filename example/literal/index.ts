const req = {
  url: "https://js-json-server-xbyg.vercel.app/users",
  method: "GET",
};

const handleRequest = async (url: string, method: "GET" | "POST") => {
  const res = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "Application-json",
    },
  });
  const data = await res.json();
  console.log(data);
};

handleRequest(req.url, req.method as "GET");
