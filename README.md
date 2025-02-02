# SoilSense

A comprehensive IoT soil monitoring and irrigation management platform that enables real-time tracking of soil moisture levels through distributed sensor networks with LoRaWAN wireless communication.

## Overview

SoilSense is a full-stack agricultural monitoring solution combining embedded LoRaWAN sensors, a Django REST backend, and a modern React frontend. The system allows farmers and agricultural professionals to remotely monitor soil conditions, analyze historical data, and control irrigation systems from anywhere.

## Features

- **Real-time Monitoring**: Track soil moisture levels from multiple sensor nodes in real-time
- **Historical Analytics**: View and analyze soil data across configurable time periods (hour, day, week, month, year)
- **Multi-site Management**: Organize monitoring across multiple central stations and nodes
- **Data Visualization**: Interactive charts and dashboards for trend analysis
- **Irrigation Control**: Remote irrigation activation through sensor nodes
- **User Management**: Secure authentication with JWT tokens and user profiles
- **Wireless Communication**: Long-range LoRaWAN connectivity for distributed sensor networks
- **Responsive Interface**: Modern Material-UI web application accessible from any device

## Architecture

SoilSense is a monorepo containing three main components:

```
soilsense/
├── frontend/              # React web application
├── backend/               # Django REST API server
└── FreeRTOS_LoRaWAN/      # Embedded firmware for STM32 hardware
```

### System Flow

```
Soil Sensors (Analog) → STM32 ADC → FreeRTOS Processing → LoRaWAN Transmission
                                                                    ↓
User Dashboard ← React Frontend ← Django REST API ← Wireless Gateway
```

### Hierarchical Data Model

- **Users** → Own multiple Central Stations
- **Central Stations** → Contain multiple Nodes
- **Nodes** → Generate soil moisture readings over time

## Tech Stack

### Frontend
- React 18.2.0 with TypeScript
- Vite (build tool)
- Material-UI (MUI) components
- Chart.js for data visualization
- Mapbox GL for mapping
- React Router for navigation
- React Hook Form with Yup validation
- Axios for API communication

### Backend
- Django 5.0.4
- Django REST Framework
- Simple JWT authentication
- Django CORS headers
- SQLite3 database

### Firmware
- STM32WLE5JCIX microcontroller
- FreeRTOS real-time OS
- LoRaWAN protocol stack
- Cayenne LPP data encoding
- STM32CubeIDE development environment

## Installation

### Prerequisites

- Node.js (v16 or higher)
- Python 3.8+
- pip
- Git
- STM32CubeIDE (for firmware development)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Create a superuser (optional):
```bash
python manage.py createsuperuser
```

6. Start the development server:
```bash
python manage.py runserver
```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file based on your backend URL configuration.

4. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Firmware Setup

1. Open STM32CubeIDE
2. Import the `FreeRTOS_LoRaWAN` project
3. Configure LoRaWAN credentials (AppEUI, AppKey, DevEUI)
4. Build and flash to your STM32WLE5JCIX device

## API Endpoints

### Authentication
- `POST /api/client/login` - User login (returns JWT tokens)
- `POST /api/client/register` - User registration
- `POST /api/client/logout` - User logout
- `POST /api/client/refresh` - Refresh access token

### User Management
- `GET /api/client` - Get current user profile
- `PUT /api/client/update` - Update user profile
- `GET /api/users` - List all users (admin)
- `DELETE /api/users/<id>` - Delete user (admin)

### Central Station Management
- `GET /api/central` - List all centrals
- `POST /api/central/create` - Create new central station
- `GET /api/users/central/` - List user's central stations
- `GET /api/central/<id>` - Get central details
- `PUT /api/central/<id>` - Update central
- `DELETE /api/central/<id>` - Delete central

### Node Management
- `GET /api/node` - List all nodes
- `POST /api/node/create` - Create new node
- `GET /api/node/central/<id>/` - List nodes in a central
- `GET /api/node/<id>` - Get node details
- `PUT /api/node/<id>` - Update node
- `DELETE /api/node/<id>` - Delete node
- `GET /api/node/irrigate/<id>` - Activate irrigation

### Soil Data & Analytics
- `GET /api/soil-data` - List all soil readings
- `POST /api/soil-data` - Store new sensor readings
- `GET /api/soil-data/node/<id>/` - Get node's soil data
- `GET /api/node-stats/<id>/<period>` - Get averaged moisture data
  - Periods: `hour`, `day`, `week`, `month`, `year`, `last_ten_data`
- `GET /api/central-stats/<id>/<period>` - Get central aggregate statistics

## Usage

### For End Users

1. **Sign Up**: Create an account at `/sign-up`
2. **Create Central Station**: Add a new monitoring location at `/new-central`
3. **Add Nodes**: Register sensor nodes under your central station
4. **Monitor Data**: View real-time and historical data on the dashboard
5. **Control Irrigation**: Activate irrigation remotely from node controls

### For Developers

#### Running Tests
```bash
# Frontend
cd frontend
npm run lint

# Backend
cd backend
python manage.py test
```

#### Building for Production
```bash
# Frontend
cd frontend
npm run build

# Backend - Deploy to PythonAnywhere or your preferred hosting
```

## Project Structure

### Frontend
```
frontend/
├── src/
│   ├── assets/          # Static assets
│   ├── components/      # Reusable UI components
│   ├── contexts/        # React contexts (user auth)
│   ├── pages/           # Page components
│   ├── schemas/         # Form validation schemas
│   ├── utils/           # Utility functions
│   └── App.tsx          # Main application component
```

### Backend
```
backend/
├── client/              # User and authentication app
├── services/            # Core business logic
│   ├── models.py        # Database models
│   ├── serializers.py   # DRF serializers
│   └── views.py         # API views
└── soilsense/           # Django project settings
```

### Firmware
```
FreeRTOS_LoRaWAN/
├── Core/                # Core application logic
│   ├── Inc/             # Header files
│   └── Src/             # Source files
├── LoRaWAN/             # LoRaWAN stack
└── Middlewares/         # FreeRTOS and libraries
```

## Data Model

### Soil Moisture Mapping
Raw sensor values (0-550) are mapped to percentage (0-100%):
- 0 → 0% (dry)
- 550 → 100% (saturated)

### Time-Series Data
All soil readings include:
- Timestamp
- Node ID
- Moisture value
- Associated central station

## Deployment

### Production Deployments
- **Backend**: Hosted on PythonAnywhere at `soilsense.pythonanywhere.com`
- **Frontend**: Configured for Vercel deployment
- **Hardware**: STM32 nodes deployed in field locations

### Environment Variables
Configure the following for production:
- Backend API URL
- LoRaWAN credentials (AppEUI, AppKey, DevEUI)
- Database credentials
- JWT secret keys
- Mapbox access token

## Development

### Version History
- **v1.0** - Initial deployment (02/02/25)

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is proprietary software. All rights reserved.

## Contact

For questions, issues, or support, please contact the development team.

---

**SoilSense** - Intelligent Agriculture Through Connected Sensors
