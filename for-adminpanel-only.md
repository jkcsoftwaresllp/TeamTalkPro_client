TeamTalk Pro+ Admin Panel - Backend Integration Guide
 Overview
 The Admin Panel consists of 4 main sections:
 1. User Management (List, Ban, Remove)
 2. Channel Stats (View message volume)
 3. Spam Messages (List & Delete)
 4. Spam Files (List & Delete)
 The frontend is fully built and API-ready with mock data toggles.
 This guide outlines the exact backend endpoints required.
 API Base Setup
 Frontend is using Axios with:
  baseURL: https://your-backend-url.com/api/admin
  withCredentials: true
 Make sure CORS is enabled for frontend origin.
 1. User Management
 Frontend calls:
  GET    /users           --> getAllUsers()
  PATCH  /users/:id/ban   --> banUser(id)
  DELETE /users/:id       --> removeUser(id)
 Backend must:- Return list of users with id, username, role, status- Allow banning and deleting users by ID
 2. Channel Stats
 Frontend call:
  GET /channels/volume   --> getChannelStats()
 Backend must:- Return array of objects like:
  { name: 'General', messages: 120, activeUsers: 10 }

3. Spam Messages
 Frontend calls:
  GET    /messages/spam   --> getSpamMessages()
  DELETE /messages/:id    --> deleteMessage(id)
 Backend must:- Return spam messages with id, sender, content, timestamp
 4. Spam Files
 Frontend calls:
  GET    /files/spam      --> getSpamFiles()
  DELETE /files/:id       --> deleteFile(id)
 Backend must:- Return file info (id, name, uploader, time, url)
 Authentication & CORS- All endpoints must be protected using JWT (HttpOnly cookies)- CORS should allow frontend origin and credentials- Respond with 401 if user is not authenticated
 Frontend Developer Notes- Every component uses: const useMockData = true- Switching to false + uncommenting API imports activates live mode- No additional frontend refactoring needed to go liv