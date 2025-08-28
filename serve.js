// Server for Deno Deploy
import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

async function handleRequest(request) {
  const url = new URL(request.url);
  
  // Serve HTML file
  if (url.pathname === "/") {
    const html = await Deno.readTextFile("./index.html");
    return new Response(html, {
      headers: { "content-type": "text/html" },
    });
  }
  
  // Serve JS file
  if (url.pathname === "/main.js") {
    const js = await Deno.readTextFile("./main.js");
    return new Response(js, {
      headers: { "content-type": "application/javascript" },
    });
  }
  
  // Handle API requests for the game (if needed in the future)
  if (url.pathname === "/api/game" && request.method === "POST") {
    // This could be expanded for multiplayer or persistence
    return new Response(JSON.stringify({ message: "API endpoint ready" }), {
      headers: { "content-type": "application/json" },
    });
  }
  
  // Return 404 for other routes
  return new Response("Not found", { status: 404 });
}

serve(handleRequest);
