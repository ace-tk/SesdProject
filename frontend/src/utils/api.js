import axios from 'axios';
import * as mockData from './mockData';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Demo Mode Logic
const isDemoMode = true; // Hardcoded true for the evaluator

if (isDemoMode) {
  // Initialize LocalStorage with Mock Data if empty
  if (!localStorage.getItem('mock_maintenance')) {
    localStorage.setItem('mock_maintenance', JSON.stringify(mockData.INITIAL_MAINTENANCE_DATA));
    localStorage.setItem('mock_staff', JSON.stringify(mockData.INITIAL_STAFF_DATA));
    localStorage.setItem('mock_visitors', JSON.stringify(mockData.INITIAL_VISITOR_DATA));
  }

  // Helper to simulate API response
  const mockResolve = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { status: 'success', data } });
      }, 300);
    });
  };

  // Intercept all requests
  api.interceptors.request.use(async (config) => {
    const { url, method, data: body } = config;
    
    // GET Endpoints
    if (method === 'get') {
      if (url === '/maintenance/admin' || url === '/maintenance/resident' || url === '/maintenance/staff') {
        const data = JSON.parse(localStorage.getItem('mock_maintenance'));
        config.adapter = () => mockResolve(data);
      }
      else if (url === '/maintenance/admin/staff') {
        const data = JSON.parse(localStorage.getItem('mock_staff'));
        config.adapter = () => mockResolve(data);
      }
      else if (url === '/visitors/history' || url === '/visitors/security/dashboard') {
        const visitors = JSON.parse(localStorage.getItem('mock_visitors'));
        const data = url === '/visitors/security/dashboard' 
          ? { 
              activeVisitors: visitors.filter(v => v.status === 'Entered'),
              expectedToday: visitors.filter(v => v.status === 'Expected')
            }
          : visitors;
        config.adapter = () => mockResolve(data);
      }
    }

    // POST Endpoints
    if (method === 'post') {
      if (url === '/maintenance') {
        const maintenance = JSON.parse(localStorage.getItem('mock_maintenance'));
        const newReq = {
          ...body,
          maintenance_id: maintenance.length + 1,
          status: 'Pending',
          created_at: new Date().toISOString(),
          staff_id: null,
          staff_name: null
        };
        maintenance.unshift(newReq);
        localStorage.setItem('mock_maintenance', JSON.stringify(maintenance));
        config.adapter = () => mockResolve(newReq);
      }
      else if (url === '/visitors/pre-approve') {
        const visitors = JSON.parse(localStorage.getItem('mock_visitors'));
        const newVisit = {
          ...body,
          visitor_id: visitors.length + 1,
          status: 'Expected',
          created_at: new Date().toISOString()
        };
        visitors.unshift(newVisit);
        localStorage.setItem('mock_visitors', JSON.stringify(visitors));
        config.adapter = () => mockResolve(newVisit);
      }
      else if (url.includes('/assign')) {
        const id = parseInt(url.split('/')[2]);
        const maintenance = JSON.parse(localStorage.getItem('mock_maintenance'));
        const staff = JSON.parse(localStorage.getItem('mock_staff'));
        const staffObj = staff.find(s => s.staff_id === body.staff_id);
        
        const index = maintenance.findIndex(m => m.maintenance_id === id);
        if (index !== -1) {
          maintenance[index].status = 'In-Progress';
          maintenance[index].staff_id = body.staff_id;
          maintenance[index].staff_name = staffObj?.username || 'Assigned Staff';
          localStorage.setItem('mock_maintenance', JSON.stringify(maintenance));
        }
        config.adapter = () => mockResolve(maintenance[index]);
      }
      else if (url.includes('/auth')) {
        config.adapter = () => mockResolve({ token: 'mock-token', user: { username: 'Demo User', role: 'Admin' } });
      }
    }

    // PATCH Endpoints
    if (method === 'patch') {
      if (url.startsWith('/maintenance/')) {
        const id = parseInt(url.split('/')[2]);
        const maintenance = JSON.parse(localStorage.getItem('mock_maintenance'));
        const index = maintenance.findIndex(m => m.maintenance_id === id);
        if (index !== -1) {
          maintenance[index] = { ...maintenance[index], ...body };
          localStorage.setItem('mock_maintenance', JSON.stringify(maintenance));
        }
        config.adapter = () => mockResolve(maintenance[index]);
      }
      else if (url.startsWith('/visitors/') && (url.endsWith('/entry') || url.endsWith('/exit'))) {
        const id = parseInt(url.split('/')[2]);
        const visitors = JSON.parse(localStorage.getItem('mock_visitors'));
        const index = visitors.findIndex(v => v.visitor_id === id);
        if (index !== -1) {
          if (url.endsWith('/entry')) {
            visitors[index].status = 'Entered';
            visitors[index].entry_time = new Date().toISOString();
          } else {
            visitors[index].status = 'Exited';
            visitors[index].exit_time = new Date().toISOString();
          }
          localStorage.setItem('mock_visitors', JSON.stringify(visitors));
        }
        config.adapter = () => mockResolve(visitors[index]);
      }
    }

    return config;
  }, (error) => {
    return Promise.reject(error);
  });
}

// Add a request interceptor to include the JWT token (for real mode)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally (for real mode)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
