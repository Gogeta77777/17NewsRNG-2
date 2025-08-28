// Server for Deno Deploy - Fixed version
import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  
  try {
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
        headers: { 
          "content-type": "application/javascript",
          "Access-Control-Allow-Origin": "*"
        },
      });
    }
    
    // Return 404 for other routes
    return new Response("Not found", { status: 404 });
  } catch (error) {
    console.error("Error handling request:", error);
    return new Response("Server error", { status: 500 });
  }
}

// Start server
serve(handleRequest);
