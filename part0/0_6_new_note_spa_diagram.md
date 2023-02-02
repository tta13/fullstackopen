  ```mermaid
  sequenceDiagram
    participant browser
    participant server    
    
    Note right of browser: When the button on the form is clicked, the browser will execute the Javascript code fetched previously <br/>to add a new note manipulating the HTML code and make a POST request sending the new data to the server in JSON format
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: HTTP Status 201 (created)
    deactivate server
    
    Note left of server: The server responds with status code 201 created. This time the server does not ask for a redirect, <br/>the browser stays on the same page, and no further HTTP requests are required
```
