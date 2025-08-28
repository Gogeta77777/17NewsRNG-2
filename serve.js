// Server for Deno Deploy
import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  
  // Serve HTML file
  if (path === "/") {
    const html = await Deno.readTextFile("./index.html");
    return new Response(html, {
      headers: { "content-type": "text/html" },
    });
  }
  
  // Serve JS file
  if (path === "/main.js") {
    const js = await Deno.readTextFile("./main.js");
    return new Response(js, {
      headers: { "content-type": "application/javascript" },
    });
  }
  
  // Return 404 for other routes
  return new Response("Not found", { status: 404 });
}

// Start server on port 8000
console.log("Server running at http://localhost:8000");
serve(handleRequest);
